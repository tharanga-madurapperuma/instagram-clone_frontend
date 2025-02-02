import React, { useEffect, useState } from "react";
import "./comment.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Loader from "../loader/Loader";
import { getUserById } from "../../Api/UserApi";
import {
    addCommentLikedUsers,
    removeCommentLikedUsers,
} from "../../Api/CommentApi";

const Comment = ({ comment, loggedUser }) => {
    const [user, setUser] = useState();
    const [liked, setLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchUser = async () => {
            const res = await getUserById(comment.userId);
            setUser(res);
        };

        const checkLikeStatus = () => {
            comment.likedUsers.forEach((likedUser) => {
                if (likedUser === loggedUser?.user_id) {
                    setLiked(true);
                }
            });
        };

        fetchUser();
        checkLikeStatus();
        setIsLoading(false);
    }, []);

    // This triggers when the like button is clicked
    const likeHandleClicked = async () => {
        setLiked(true);
        await addCommentLikedUsers(loggedUser?.user_id, comment.commentId);
    };

    // This triggers when the unlike button is clicked
    const unLikeHandleClicked = async () => {
        setLiked(false);
        await removeCommentLikedUsers(loggedUser?.user_id, comment.commentId);
    };

    return (
        <>
            {isLoading && <Loader />}
            <div className="flex justify-between items-center my-2">
                <div className="flex items-center w-[95%]">
                    <div className="comment-image w-[10%]">
                        <img
                            src={
                                user?.userImage
                                    ? user?.userImage
                                    : "/assets/users/general.jpg"
                            }
                            alt="user"
                        />
                    </div>
                    <div className="comment-user-details w-[85%] ml-3">
                        <h4>{user?.firstName + " " + user?.lastName}</h4>
                        <p>{comment.content}</p>
                    </div>
                </div>

                <div className="comment-like w-[5%] cursor-pointer">
                    {liked ? (
                        <FaHeart
                            onClick={() => {
                                setLiked(false);
                                unLikeHandleClicked();
                            }}
                            className="text-red-600"
                        />
                    ) : (
                        <FaRegHeart
                            onClick={() => {
                                likeHandleClicked();
                                setLiked(true);
                            }}
                        />
                    )}
                </div>
            </div>
            <div className="w-full h-[1px] bg-slate-300"></div>
        </>
    );
};

export default Comment;
