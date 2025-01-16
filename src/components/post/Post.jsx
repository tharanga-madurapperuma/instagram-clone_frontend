import React, { useEffect, useState } from "react";
import "./post.css";
import EmojiPicker from "emoji-picker-react";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import ProfileTemplatePost from "../profile/ProfileTemplatePost";
import ReactModal from "react-modal";
import WatchPost from "../watchPost/WatchPost";
import { CiMenuKebab } from "react-icons/ci";
import EditPost from "./EditPost";
import Loader from "../loader/Loader";
import { GrSave } from "react-icons/gr";
import Comment from "../comment/Comment";
import { addLikes, getUserById, removeLikes } from "../../Api/UserApi";
import { addComment, getCommentByPostId } from "../../Api/CommentApi";
import { addStory } from "../../Api/StoryApi";
import {
    decrementLikeCount,
    deletePost,
    incrementLikeCount,
} from "../../Api/PostApi";

const Post = ({ post, loggedUser }) => {
    const [comment, setComment] = useState();
    const [showPicker, setShowPicker] = useState(false);
    const [user, setUser] = useState();
    const [isLiked, setIsLiked] = useState(false);
    const loggedUserId = loggedUser?.user_id;
    const [likeCount, setLikeCount] = useState(post?.likeCount);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isPostEditModalOpen, setIsPostEditModalOpen] = React.useState(false);
    const [menuClicked, setMenuClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchComments, setFetchComments] = useState([]);
    const [showComment, setShowComment] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const response = await getUserById(post?.userId);
            setUser(response);
        };

        const checkLikedState = () => {
            if (loggedUser?.likedPosts?.includes(post?.postId)) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        };

        const getComments = async () => {
            const response = await getCommentByPostId(post?.postId);
            setFetchComments(response);
        };

        fetchData();
        checkLikedState();
        getComments();
        setIsLoading(false);
    }, []);

    // Imoji handle method
    const handleEmojiClick = (emojiObject) => {
        setComment((prevComment) => prevComment + emojiObject.emoji);
    };

    // share post to story
    const shareClicked = () => {
        const confirm = window.confirm(
            "Do you want to share this post as story?"
        );

        if (confirm) {
            const handleStoryUpload = async () => {
                setIsLoading(true);
                try {
                    const story = {
                        description: post.description,
                        imageUrl: post.imageUrl, // Use the uploaded file reference
                        userId: loggedUserId,
                        likeCount: 0,
                        watched: false,
                    };

                    const response = addStory(story);
                    window.location.reload();
                } catch (error) {
                    console.error("Error creating story:", error);
                    alert("Failed to share story. Please try again.");
                } finally {
                    setIsLoading(false);
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
                setIsLoading(true);
                setLikeCount((prevCount) => prevCount - 1);

                // Remove like from user
                await removeLikes(loggedUser?.user_id, post.postId);

                // Decrement like count
                await decrementLikeCount(post.postId);
                setIsLoading(false);
            } else {
                setIsLoading(true);
                setIsLiked(true);
                setLikeCount((prevCount) => prevCount + 1);
                try {
                    await addLikes(loggedUserId, post.postId);
                    await incrementLikeCount(post.postId);
                } catch (error) {
                    alert(error);
                } finally {
                    setIsLoading(false);
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

    const closePostEditModal = () => {
        setIsPostEditModalOpen(false);
    };

    const dotClicked = () => {
        menuClicked ? setMenuClicked(false) : setMenuClicked(true);
    };

    const closeEditPostModal = () => {
        setIsPostEditModalOpen(false);
    };

    const handlePostComment = async () => {
        setIsLoading(true);
        try {
            await addComment({
                userId: loggedUser.user_id,
                postId: post.postId,
                content: comment,
                likeCount: 0,
                likedUsers: [],
            });
        } catch (error) {
            console.error("Error posting comment:", error);
            alert("Failed to post comment. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className=" feedSection_post">
            {isLoading && <Loader />}
            <div className="post_top flex justify-between items-center">
                <div className="top-left_content flex">
                    <ProfileTemplatePost user={user} post={post} />
                </div>

                <div className="top-right-dots">
                    <CiMenuKebab
                        className="top-right-dots_icon"
                        onClick={dotClicked}
                    />
                    <div
                        className={
                            menuClicked
                                ? "top-right-dots_menu-active"
                                : "top-right-dots_menu-inactive"
                        }
                    >
                        <ul>
                            <li>
                                <a
                                    onClick={() => {
                                        setIsPostEditModalOpen(true);
                                        setMenuClicked(false);
                                    }}
                                >
                                    Edit
                                </a>
                                <ReactModal
                                    isOpen={isPostEditModalOpen}
                                    onRequestClose={closePostEditModal}
                                    contentLabel="Watch Story"
                                    className="modal-content"
                                    overlayClassName="modal-overlay"
                                    shouldCloseOnOverlayClick={true}
                                >
                                    {/* WatchStory Component */}
                                    <EditPost
                                        post={post}
                                        loggedUser={loggedUser}
                                        closeEditPostModal={closeEditPostModal}
                                    />
                                </ReactModal>
                            </li>
                            <hr></hr>
                            <li>
                                <a
                                    onClick={async () => {
                                        await deletePost(post.postId);
                                        setMenuClicked(false);
                                        window.location.reload();
                                    }}
                                >
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="post_image my-5">
                <div className="image-outline flex justify-center">
                    <img
                        src={post.imageUrl}
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
                            <FaHeart
                                onClick={async () => {
                                    setLikeCount((prevCount) => prevCount - 1);
                                    setIsLiked(false);
                                    setIsLoading(true);
                                    await decrementLikeCount(post.postId);
                                    setIsLoading(false);
                                }}
                                className="mr-3 heart-handle-fill"
                            />
                        ) : (
                            <FaRegHeart
                                onClick={async () => {
                                    setLikeCount((prevCount) => prevCount + 1);
                                    setIsLiked(true);
                                    setIsLoading(true);
                                    await incrementLikeCount(post.postId);
                                    setIsLoading(false);
                                }}
                                className="mr-3 heart-handle"
                            />
                        )}
                        <FaRegComment
                            className="mr-3 comment-handle cursor-pointer"
                            onClick={() => {
                                showComment
                                    ? setShowComment(false)
                                    : setShowComment(true);
                            }}
                        />
                        <RiSendPlaneLine
                            className="mr-3 cursor-pointer share-handle"
                            onClick={() => {
                                shareClicked();
                            }}
                        />
                        <p className="share-text">Share this post as story</p>
                    </div>
                    <div className="bottom-icons-right">
                        <GrSave className="save-handle" />
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
                                <p
                                    className="text-blue-700 font-bold text-sm mr-2 cursor-pointer"
                                    onClick={handlePostComment}
                                >
                                    {comment?.length > 0 ? "Post" : ""}
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
                    <div className="post-comment-section">
                        {showComment
                            ? fetchComments?.map((comment, index) => (
                                  <Comment comment={comment} />
                              ))
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
