import React, { useEffect, useState } from "react";
import "./follower.css";
import "../post/post.css";
import { useNavigate } from "react-router-dom";
import { getFollowings } from "../../Api/UserApi";
import { followUser, unfollowUser } from "../../Api/FollowAPi";
import Loader from "../loader/Loader";
import { toast, ToastContainer, Zoom } from "react-toastify";

const Follower = ({ user, loggedUser }) => {
    const navigate = useNavigate();
    const [followings, setFollowings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followState, setFollowState] = useState("Follow");

    // notifications
    const unfollowedNotify = () => {
        toast.warn(`Unfollowed ${user?.firstName}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Zoom,
        });
    };

    const followedNotify = () => {
        toast.success(`Followed ${user?.firstName}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Zoom,
        });
    };

    useEffect(() => {
        const getFollowingUsers = async () => {
            if (!loggedUser?.user_id) return;
            try {
                const response = await getFollowings(loggedUser?.user_id);
                setFollowings(response);
            } catch (error) {
                console.error("Error fetching following users:", error);
            }
        };

        getFollowingUsers();
    }, [loggedUser]);

    useEffect(() => {
        const chechFollowState = () => {
            if (followings.find((following) => following === user?.user_id)) {
                setIsFollowing(true);
                setFollowState("Unfollow");
            } else {
                setIsFollowing(false);
                setFollowState("Follow");
            }
        };
        chechFollowState();
    }, [followings]);

    const unfollow = async () => {
        try {
            setIsLoading(true);
            setIsFollowing(false);
            setFollowState("Follow");

            await unfollowUser(loggedUser?.user_id, user?.user_id);
            unfollowedNotify();
            await new Promise((resolve) => setTimeout(resolve, 2000));
            toast.dismiss();
        } catch {
            console.error("Error unfollowing user");
        } finally {
            setIsLoading(false);
        }
    };

    const follow = async () => {
        try {
            setIsLoading(true);
            setIsFollowing(true);
            setFollowState("Unfollow");

            await followUser(loggedUser?.user_id, user?.user_id);

            followedNotify();
            await new Promise((resolve) => setTimeout(resolve, 2000));
            toast.dismiss();
        } catch {
            console.error("Error unfollowing user");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="follower mt-3 cursor-pointer ">
            <ToastContainer />
            {isLoading && <Loader />}
            <div className=" flex justify-between">
                <div
                    className="top-left_content flex"
                    onClick={() => {
                        navigate(`/profile/${user?.user_id}`);
                    }}
                >
                    <div className="content-image">
                        <div className="image">
                            <img
                                src={
                                    !user?.userImage
                                        ? "./assets/users/general.jpg"
                                        : `${user?.userImage}`
                                }
                                alt="Profile"
                            ></img>
                        </div>
                    </div>

                    <div className="content_data ml-2">
                        <div className="data-user-name-date flex items-center">
                            <div className="username text-base font-medium">
                                {user?.firstName} {user?.lastName}
                            </div>
                        </div>
                        <div className="data-caption">
                            <p className="text-sm font-light">
                                {user?.caption}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="date ">
                    {isFollowing ? (
                        <div
                            className="text-cyan-500 cursor-pointer ml-2"
                            onClick={unfollow}
                        >
                            {followState}
                        </div>
                    ) : (
                        <div
                            className="text-gray-500 cursor-pointer ml-2"
                            onClick={follow}
                        >
                            {followState}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Follower;
