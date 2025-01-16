import React, { useEffect, useState } from "react";
import "./comment.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Loader from "../loader/Loader";
import { getUserById } from "../../Api/UserApi";
import { addLikedUsers, removeLikedUsers } from "../../Api/CommentApi";

const Comment = ({ comment }) => {
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
                console.log(user?.user_id + " Liked User: " + likedUser);
                if (likedUser === user?.user_id) {
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
        setIsLoading(true);
        await addLikedUsers(user?.user_id, comment.commentId);
        setIsLoading(false);
    };

    // This triggers when the unlike button is clicked
    const unLikeHandleClicked = async () => {
        setIsLoading(true);
        await removeLikedUsers(user?.user_id, comment.commentId);
        setIsLoading(false);
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

                <div className="comment-like w-[5%]">
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
