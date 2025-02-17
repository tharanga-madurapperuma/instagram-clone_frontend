import React, { useEffect, useState } from "react";
import "./story.css";
import WatchStory from "../watchStory/WatchStory";
import ReactModal from "react-modal";
import { addWatchedUser } from "../../Api/StoryApi";

const Story = ({ story, shared, loggedUser }) => {
    const [watchedUsers, setWatchedUsers] = useState(story.watchedUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [watched, setWatched] = useState(false);
    const timeOut = 5000;

    // after user clicked the story
    const storyCliked = async () => {
        setWatchedUsers([...watchedUsers, loggedUser]);
        setWatched(true);
        setIsModalOpen(true);
        await addWatchedUser(story.storyId, loggedUser.user_id);

        setTimeout(() => {
            setIsModalOpen(false);
        }, timeOut);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        // const getWatchedAllUsers = async () => {
        //     const response = await getWatchedusers(story.storyId);
        //     setWatchedUsers(response);
        // };

        // getWatchedAllUsers();
        if (watchedUsers.find((user) => user === loggedUser?.user_id)) {
            setWatched(true);
        } else {
            setWatched(false);
        }
    }, [loggedUser]);

    return (
        <div className="story m-2 mt-10">
            <div
                className={
                    watched
                        ? "story_outline_visited flex justify-center items-center"
                        : "story_outline flex justify-center items-center"
                }
            >
                <div
                    className="cursor-pointer story_image bg-white"
                    onClick={() => {
                        storyCliked();
                    }}
                >
                    <img src={story.imageUrl} />
                </div>
                {/* React Modal */}
                <ReactModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Watch Story"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                    shouldCloseOnOverlayClick={true}
                >
                    {/* WatchStory Component */}
                    <WatchStory
                        story={story}
                        timeOut={timeOut}
                        shared={shared}
                    />
                </ReactModal>
            </div>
        </div>
    );
};

export default Story;
