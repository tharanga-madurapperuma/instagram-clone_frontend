import React from "react";
import "./watchStory.css";
import Data from "../../fetchData";

const WatchStory = ({ story, timeOut }) => {
    return (
        <div className="watch-story-container flex flex-col h-[65vh]">
            <p>{story.description}</p>

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
