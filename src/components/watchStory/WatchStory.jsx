import React from "react";
import "./watchStory.css";

const WatchStory = ({ story }) => {
    return (
        <div className="watch-story-container">
            <p>{story.description}</p>

            {/* Render story content here (e.g., video, image, etc.) */}
            {/* {story.mediaType === "video" ? (
                <video src={story.mediaUrl} controls autoPlay />
            ) : (
                <img src={story.mediaUrl} alt={story.title} />
            )} */}
        </div>
    );
};

export default WatchStory;
