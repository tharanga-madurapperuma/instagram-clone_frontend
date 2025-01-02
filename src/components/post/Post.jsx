import React, { useEffect, useState } from "react";
import "./post.css";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import Data from "../../fetchData";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import ProfileTemplatePost from "../profile/ProfileTemplatePost";
import ReactModal from "react-modal";
import WatchPost from "../watchPost/WatchPost";

const Post = ({ post, loggedUser }) => {
    const [comment, setComment] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [user, setUser] = useState();
    const [file, setFile] = useState();
    const imageUrl = `${Data.fileStore.downloadPost}${post?.imageUrl}`;
    const fileName = post?.imageUrl;
    const [isLiked, setIsLiked] = useState(false);
    const loggedUserId = loggedUser?.user_id;
    const [likeCount, setLikeCount] = useState(post?.likeCount);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                Data.users?.getUserById + post?.userId
            );

            setUser(response.data);
        };

        const getImageAsFile = async (imageUrl, fileName) => {
            try {
                const response = await fetch(imageUrl); // Fetch the image
                const blob = await response.blob(); // Convert response to Blob
                const file = new File([blob], fileName, {
                    type: blob.type,
                }); // Convert Blob to File
                return file; // Return the File object
            } catch (error) {
                console.error("Error fetching the image as a file:", error);
                return null;
            }
        };

        const checkLikedState = () => {
            if (loggedUser?.likedPosts?.includes(post?.postId)) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        };

        fetchData();
        getImageAsFile(imageUrl, fileName).then((file) => {
            setFile(file); // Set the file after fetching
        });
        checkLikedState();
    }, []);

    // Imoji handle method
    const handleEmojiClick = (emojiObject) => {
        setComment((prevComment) => prevComment + emojiObject.emoji);
    };

    const updateLikeCount = async () => {
        const response = await axios.get(Data.posts.getLikeCount + post.postId);
        setLikeCount(response.data);
    };

    // share post to story
    const shareClicked = () => {
        const confirm = window.confirm(
            "Do you want to share this post as story?"
        );

        if (confirm) {
            const getStoryFileName = async () => {
                const formData = new FormData();
                formData.append("image", file); // Append the file with the key 'image'

                try {
                    const response = await axios.post(
                        Data.fileStore.uploadStory,
                        formData, // Send the FormData instance
                        {
                            headers: {
                                "Content-Type": "multipart/form-data", // Required for file uploads
                            },
                        }
                    );
                    console.log(response.data);
                    return response.data; // Return the file name
                } catch (error) {
                    console.error(
                        "Error uploading the image as a story:",
                        error
                    );
                    return null;
                }
            };

            const handleStoryUpload = async () => {
                if (!file) {
                    alert("No file selected");
                    return;
                }

                try {
                    const newFileName = await getStoryFileName();

                    const story = {
                        description: post.description,
                        imageUrl: newFileName, // Use the uploaded file reference
                        userId: loggedUserId,
                        likeCount: 0,
                        watched: false,
                    };

                    const response = await axios.post(
                        Data.stories.addStory,
                        story
                    );

                    if (response.status === 201) {
                        alert("Post shared as story successfully!");
                    }
                    window.location.reload();
                } catch (error) {
                    console.error("Error creating story:", error);
                    alert("Failed to share story. Please try again.");
                }
            };

            handleStoryUpload(); // Call after setting file
        }
    };

    let clickTimeout;
    const handleDoubleClick = async (event) => {
        if (clickTimeout) clearTimeout(clickTimeout);

        // if double click on post it likes the post
        if (event.detail === 2) {
            if (isLiked) {
                setIsLiked(false);
                await axios.delete(
                    Data.users.removeLikes +
                        loggedUser?.user_id +
                        "/" +
                        post.postId
                );
                await axios.post(Data.posts.decrementLikeCount + post.postId);
                updateLikeCount();
            } else {
                setIsLiked(true);
                try {
                    await axios.post(
                        Data.users.addLikes + loggedUserId + "/" + post.postId
                    );
                    await axios.post(
                        Data.posts.incrementLikeCount + post.postId
                    );
                    updateLikeCount();
                } catch (error) {
                    alert(error);
                }
            }
        }
        // if one time click on post it shows te image
        else {
            clickTimeout = setTimeout(() => {
                setIsModalOpen(true);
            }, 500);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className=" feedSection_post">
            <div className="post_top flex justify-between items-center">
                <div className="top-left_content flex">
                    <ProfileTemplatePost user={user} post={post} />
                </div>

                <div className="top-right-dots">
                    <img src="./assets/icons/More.png" alt="More" />
                </div>
            </div>

            <div className="post_image my-5">
                <div className="image-outline flex justify-center">
                    <img
                        src={`${Data.fileStore.downloadPost}${post.imageUrl}`}
                        alt="PostPicture"
                        onClick={handleDoubleClick}
                    />
                    <ReactModal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        contentLabel="Watch Story"
                        className="modal-content"
                        overlayClassName="modal-overlay"
                        shouldCloseOnOverlayClick={true}
                    >
                        {/* WatchStory Component */}
                        <WatchPost post={post} />
                    </ReactModal>
                </div>
            </div>
            <div className="post_bottom">
                <div className="bottom-icons flex justify-between">
                    <div className="bottom-icons-left flex items-center">
                        {isLiked ? (
                            <FaHeart className="mr-3 heart-handle-fill" />
                        ) : (
                            <FaRegHeart className="mr-3 heart-handle" />
                        )}
                        <FaRegComment className="mr-3 comment-handle" />
                        <RiSendPlaneLine
                            className="mr-3 cursor-pointer share-handle"
                            onClick={() => {
                                shareClicked();
                            }}
                        />
                        <p className="share-text">Share this post as story</p>
                    </div>
                    <div className="bottom-icons-right">
                        <img src="./assets/icons/Save.png" alt="Save" />
                    </div>
                </div>
                <div className="bottom-like-count">
                    <p className="font-bold text-sm my-2">{likeCount} Likes</p>
                </div>
                <div className="bottom-user-name">
                    <div className="mt-2 text-gray-700 font-normal">
                        {post.description}
                    </div>
                </div>
                <div className="bottom-add_comment">
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                            <input
                                className="comment_border py-3 outline-none w-full border-none"
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment..."
                            />
                            <div className="flex items-center">
                                <p className="text-blue-700 font-bold text-sm mr-2">
                                    {comment.length > 0 ? "Post" : ""}
                                </p>
                                <button
                                    onClick={() => setShowPicker(!showPicker)}
                                >
                                    <img
                                        className="transition duration-300 ease-in-out"
                                        src={
                                            !showPicker
                                                ? "./assets/icons/Emoji.png"
                                                : "./assets/icons/Arrow.png"
                                        }
                                        alt="Imoji"
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end emo">
                            {showPicker && (
                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                            )}
                        </div>
                    </div>
                    <div className="comment-bottom-line w-full bg-gray-400"></div>
                </div>
            </div>
        </div>
    );
};

export default Post;
