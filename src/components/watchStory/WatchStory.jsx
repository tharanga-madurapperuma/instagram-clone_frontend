import React, { useEffect, useState } from "react";
import "./watchStory.css";
import Data from "../../fetchData";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import ProfileTemplate from "../profile/ProfileTemplate";
import { CiMenuKebab } from "react-icons/ci";

const WatchStory = ({ story, timeOut }) => {
    const [progress, setProgress] = useState(0);
    const [user, setUser] = useState();
    const [deleteClicked, setDeleteClicked] = useState(false);

    useEffect(() => {
        const duration = timeOut; // Duration of the story (in ms)
        const intervalTime = 10; // Time between each increment (in ms)
        const increment = 100 / (duration / intervalTime); // Increment value per interval

        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 100) {
                    return prevProgress + increment;
                } else {
                    clearInterval(interval);
                    return 100;
                }
            });
        }, intervalTime);
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // fetch user for the story
    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(
                Data.users.getUserById + story.userId
            );
            setUser(response.data);
        };

        getUser();
    }, []);

    useEffect(() => {
        document.querySelector(".barCompleted").style.width = `${progress}%`;
    }, [progress]);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                Data.stories.deleteStory + story.storyId
            );
            if (response.status === 200) {
                alert("Story deleted successfully!");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error deleting story:", error);
            alert("Failed to delete story. Please try again.");
        }
    };

    return (
        <div className="watch-story-container flex flex-col h-[65vh]">
            <div className="flex items-center justify-between story-delete-menu">
                <ProfileTemplate user={user} />
                <CiMenuKebab
                    className="ml-5 cursor-pointer"
                    onClick={() => {
                        deleteClicked
                            ? setDeleteClicked(false)
                            : setDeleteClicked(true);
                    }}
                />
                <ul
                    className={
                        deleteClicked
                            ? "story-delete-menu-list-active"
                            : "story-delete-menu-list-inactive"
                    }
                >
                    <li onClick={handleDelete}>Delete</li>
                </ul>
            </div>

            <p className="mt-5">{story.description}</p>

            {/* Story visible time progress bar */}
            <div className="flex w-full">
                <ProgressBar
                    completed={progress}
                    className="wrapper"
                    barContainerClassName="container"
                    completedClassName="barCompleted"
                    isLabelVisible={false} // Removes the text label
                />
            </div>

            <div className="story-image-container">
                <img
                    className="story-image"
                    src={`${Data.fileStore.downloadStory}${story.imageUrl}`}
                    alt="PostPicture"
                />
            </div>
        </div>
    );
};

export default WatchStory;
