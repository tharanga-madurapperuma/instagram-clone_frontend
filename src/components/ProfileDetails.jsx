import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { BiSearch, BiX } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
    getFollowers,
    getFollowings,
    getUserByEmail,
    getUserById,
} from "../Api/UserApi";
import "./profileDetails.css";
import { getPostsByUserId } from "../Api/PostApi";

const ProfileDetails = ({ userProfileId }) => {
    const settingIcon = "/assets/icons/Options.png";
    const [showFollowers, setShowFollowers] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const navigation = useNavigate();
    const [user, setUser] = useState("Guest User");
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState();
    const [displayUser, setDisplayUser] = useState();

    useEffect(() => {
        const fetchFollowers = async () => {
            if (!displayUser?.user_id) return;
            try {
                const response = await getFollowers(displayUser?.user_id);
                setFollowers(response);
            } catch (error) {
                console.error("Error fetching followers:", error);
            }
        };

        const fetchFollowing = async () => {
            if (!displayUser?.user_id) return;
            try {
                const response = await getFollowings(displayUser?.user_id);
                setFollowing(response);
            } catch (error) {
                console.error("Error fetching following:", error);
            }
        };

        fetchFollowers();
        fetchFollowing();
    }, [user, displayUser]);

    useEffect(() => {
        const getPostCount = async () => {
            if (!displayUser?.user_id) return;
            try {
                const response = await getPostsByUserId(displayUser?.user_id);
                setCount(response.length);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        getPostCount();
    }, [user]);

    const fetchData = async () => {
        try {
            setIsLoading(true);

            // Fetch Logged-in User
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found");

            const decode = jwtDecode(token);
            const loggedUserEmail = decode.sub;

            const userResponse = await getUserByEmail(loggedUserEmail);
            if (!userResponse) throw new Error("User not found");

            setUser(userResponse);
        } catch (error) {
            console.error("Error fetching data:", error);
            localStorage.removeItem("authToken");
            navigation("/login"); // Redirect to login if authentication fails
        } finally {
            setIsLoading(false);
        }
    };

    const checkUser = async () => {
        if (userProfileId === user.user_id) {
            setDisplayUser(user);
        } else {
            const response = await getUserById(userProfileId);

            setDisplayUser(response);
        }
    };

    // Fetch Data on Component Mount
    useEffect(() => {
        fetchData();
        checkUser();
    }, [navigation]);

    return (
        <div className="flex items-start space-x-20 mb-10 px-10 py-10 w-[100%] profileDetails-top">
            <img
                src={
                    displayUser?.userImage === null
                        ? "/assets/users/general.jpg"
                        : displayUser?.userImage
                }
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover"
            />
            <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4 profileDetails-header">
                    <h1 className="text-xl font-normal profileDetails-username">
                        {displayUser === "Guest User"
                            ? "Guest User"
                            : displayUser?.firstName +
                              " " +
                              displayUser?.lastName}
                    </h1>
                    {user?.user_id === userProfileId ? (
                        <>
                            <button
                                className="px-4 py-1.5 bg-gray-100 rounded-md font-semibold"
                                onClick={() => {
                                    navigation("/editProfileDetails");
                                }}
                            >
                                Edit profile
                            </button>
                            <img
                                src={settingIcon}
                                alt="settings"
                                className="w-7 h-7"
                            />
                        </>
                    ) : null}
                </div>
                <div className="flex space-x-10 mb-4">
                    <span>
                        <strong>{count}</strong> posts
                    </span>
                    <button
                        onClick={() => setShowFollowers(true)}
                        className="hover:opacity-70"
                    >
                        <strong>{followers.length}</strong> followers
                    </button>
                    <span>
                        <strong>{following.length}</strong> following
                    </span>
                </div>
                <div>
                    <p className="text-gray-700">
                        {displayUser === "Guest User"
                            ? ""
                            : displayUser?.caption}
                    </p>
                    <p className="mt-1">
                        {!displayUser?.slogan
                            ? `Capturing life's beautiful moments ✨`
                            : displayUser?.slogan}
                    </p>
                    <p className="text-blue-900">
                        {!displayUser?.website ? "" : displayUser?.website}
                    </p>
                </div>
            </div>

            {/* Followers Modal */}
            {showFollowers && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full">
                    <div className="bg-white rounded-xl w-full max-w-md">
                        <div className="border-b p-4 flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Followers</h2>
                            <button onClick={() => setShowFollowers(false)}>
                                <BiX className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-2">
                            <div className="mb-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="w-full px-4 py-2 bg-gray-100 rounded-lg"
                                    />
                                    <BiSearch className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
                                </div>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {followers.map((follower) => (
                                    <div
                                        key={follower.id}
                                        className="flex items-center justify-between p-2 hover:bg-gray-50"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={follower.avatar}
                                                alt={follower.username}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-semibold">
                                                    {follower.username}
                                                </p>
                                                <p className="text-gray-500 text-sm">
                                                    {follower.name}
                                                </p>
                                            </div>
                                        </div>
                                        <button className="px-6 py-1.5 rounded bg-gray-100 text-sm font-semibold">
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDetails;
