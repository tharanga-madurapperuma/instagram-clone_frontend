import React from "react";
import Images from "../../assets/images";
import "./story.css";

const Story = ({ story }) => {
    const storyCliked = () => {
        console.log(story);
    };
    return (
        <div className="story m-2 mt-10">
            <div
                className={
                    story.watched
                        ? "story_outline_visited flex justify-center items-center"
                        : "story_outline flex justify-center items-center"
                }
            >
                <div
                    className="story_image bg-white"
                    onClick={() => {
                        storyCliked();
                    }}
                >
                    <img src={Images.tree} alt="story" />
                </div>
            </div>
        </div>
    );
};

export default Story;
