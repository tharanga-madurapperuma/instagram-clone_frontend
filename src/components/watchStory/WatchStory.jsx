import React, { useEffect, useState } from "react";
import "./watchStory.css";
import Data from "../../fetchData";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import ProfileTemplate from "../profile/ProfileTemplate";

const WatchStory = ({ story, timeOut }) => {
    const [progress, setProgress] = useState(0);
    const [user, setUser] = useState();

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

    return (
        <div className="watch-story-container flex flex-col h-[65vh]">
            <ProfileTemplate user={user} />
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
