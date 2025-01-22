import React, { useEffect, useState } from "react";
import "./story.css";
import WatchStory from "../watchStory/WatchStory";
import ReactModal from "react-modal";
import { markedWatched } from "../../Api/StoryApi";
import Loader from "../loader/Loader";

const Story = ({ story }) => {
    const [watched, setWatched] = useState(story.watched);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const timeOut = 8000;

    // after user clicked the story
    const storyCliked = async () => {
        const response = await markedWatched(story.storyId);

        if (response) {
            setWatched(true);
            setIsModalOpen(true);
        }

        setTimeout(() => {
            setIsModalOpen(false);
        }, timeOut);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
                    <WatchStory story={story} timeOut={timeOut} />
                </ReactModal>
            </div>
        </div>
    );
};

export default Story;
