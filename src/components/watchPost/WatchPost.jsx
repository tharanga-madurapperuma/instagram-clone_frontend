import React from "react";
import Data from "../../fetchData";
import "./watchPost.css";

const WatchPost = ({ post }) => {
    return (
        <div className="watch-post-container flex flex-col h-[70vh]">
            <div className="post-image-container">
                <img
                    className="post-image"
                    src={`${Data.fileStore.downloadPost}${post.imageUrl}`}
                    alt="PostPicture"
                />
            </div>
        </div>
    );
};

export default WatchPost;
