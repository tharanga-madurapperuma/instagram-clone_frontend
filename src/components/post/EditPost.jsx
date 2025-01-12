import React, { useEffect, useState } from "react";
import Data from "../../fetchData";
import ProfileTemplate from "../profile/ProfileTemplate";
import "./EditPost.css";
import axios from "axios";

const EditPost = ({ post, loggedUser, closeEditPostModal }) => {
    const [description, setDescription] = useState(post.description);

    console.log(description);

    const handleClicked = async () => {
        try {
            const response = await axios.put(
                Data.posts.editPost + post.postId,
                {
                    description: description,
                    userId: loggedUser.user_id,
                    likeCount: post.likeCount,
                    imageUrl: post.imageUrl, // Use fileUrl here
                }
            );

            if (response.status === 200) {
                alert("Post Edited successfully!");
                setDescription("");
                closeEditPostModal();
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post. Please try again.");
        }
    };

    return (
        <div>
            <div className="flex bg-slate-100 p-5 rounded-lg">
                <div className="newPostImageContainer ">
                    <img className="newPostImage" src={post.imageUrl} alt="" />
                </div>

                <div className="flex flex-col w-[400px] h-full mt-5">
                    <div className="flex items-start w-full">
                        <ProfileTemplate user={loggedUser} />
                    </div>
                    <textarea
                        value={description}
                        rows={5}
                        className="w-full bg-slate-100 mt-5 p-5 post-textarea"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    ></textarea>
                    <button
                        className="post-button align"
                        onClick={() => {
                            handleClicked();
                        }}
                    >
                        Post
                    </button>
                    <p className="text-gray-500 text-xs mt-5">
                        &copy; instagram clone, developed by Tharanga
                        Madurapperuma, Rusiru Erandaka and Harshana Rathnayaka.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EditPost;