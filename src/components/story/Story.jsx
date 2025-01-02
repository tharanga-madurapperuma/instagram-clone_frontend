import React from "react";
import "./story.css";
import Data from "../../fetchData";
import axios from "axios";
import WatchStory from "../watchStory/WatchStory";
import ReactModal from "react-modal";

const Story = ({ story }) => {
    const [watched, setWatched] = React.useState(story.watched);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const timeOut = 8000;

    // after user clicked the story
    const storyCliked = async () => {
        const response = await axios.put(
            Data.stories.markedWatched + story.storyId
        );

        if (response.data) {
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
                    <img
                        src={`${Data.fileStore.downloadStory}${story.imageUrl}`}
                    />
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
