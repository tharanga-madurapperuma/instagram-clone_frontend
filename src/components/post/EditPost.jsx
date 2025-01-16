import React, { useState } from "react";
import ProfileTemplate from "../profile/ProfileTemplate";
import "./EditPost.css";
import { editPost } from "../../Api/PostApi";
import Loader from "../loader/Loader";

const EditPost = ({ post, loggedUser, closeEditPostModal }) => {
    const [description, setDescription] = useState(post.description);
    const [isLoading, setIsLoading] = useState(false);

    console.log(description);

    const handleClicked = async () => {
        setIsLoading(true);
        try {
            await editPost(post.postId, {
                description: description,
                userId: loggedUser.user_id,
                likeCount: post.likeCount,
                imageUrl: post.imageUrl, // Use fileUrl here
            });
            setDescription("");
            closeEditPostModal();
            window.location.reload();
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="edit-post-container">
            {isLoading && <Loader />}
            <div className="flex newPostImageContainer-wrapper bg-slate-100 p-5 rounded-lg">
                <div className="newPostImageContainer ">
                    <img className="newPostImage" src={post.imageUrl} alt="" />
                </div>

                <div className="flex flex-col w-[400px] h-full mt-5 edit-post-right-side">
                    <div className="createPost-profile flex items-start w-full">
                        <ProfileTemplate user={loggedUser} />
                    </div>
                    <textarea
                        value={description}
                        rows={5}
                        className="post-textarea w-full bg-slate-100 mt-5 p-5 post-textarea"
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
                    <p className="text-gray-500 text-xs mt-5 edit-post-copyright">
                        &copy; instagram clone, developed by Tharanga
                        Madurapperuma, Rusiru Erandaka and Harshana Rathnayaka.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EditPost;
