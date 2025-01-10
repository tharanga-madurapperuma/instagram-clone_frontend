import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaRegComment as FarComment } from "react-icons/fa";
import "./UserPostCard.css";

const UserPostcard = () => {
    return (
        <div className="p-1">
            <div className="post w-80 h-80 m-1 relative">
                <img
                    className="cursor-pointer"
                    src="https://images.pexels.com/photos/29529568/pexels-photo-29529568/free-photo-of-traditional-chinese-dumplings-with-soy-sauce.jpeg"
                    alt="post 1"
                />
                <div className="userPost-overlay">
                    <div className="overlay-text flex justify-between">
                        <div>
                            <AiFillHeart></AiFillHeart> <span>10</span>
                        </div>
                        <div>
                            <FarComment></FarComment> <span>10</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPostcard;
