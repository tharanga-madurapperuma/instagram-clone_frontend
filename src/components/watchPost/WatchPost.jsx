import React, { useEffect, useState } from "react";
import "./watchPost.css";
import Loader from "../loader/Loader";

const WatchPost = ({ post }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
    }, []);
    return (
        <div className="watch-post-container flex flex-col h-[70vh]">
            {isLoading && <Loader />}
            <div className="post-image-container">
                <img
                    className="post-image"
                    src={post.imageUrl}
                    alt="PostPicture"
                    onLoad={() => {
                        setIsLoading(false);
                    }}
                />
            </div>
        </div>
    );
};

export default WatchPost;
