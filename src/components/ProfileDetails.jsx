import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BiSearch, BiX } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../Api/UserApi";

const ProfileDetails = () => {
    const settingIcon = "/assets/icons/Options.png";
    const [showFollowers, setShowFollowers] = useState(false);
    const navigation = useNavigate();
    const [user, setUser] = useState("Guest User");
    const [isLoading, setIsLoading] = useState(false);

    const followers = [
        {
            id: 1,
            username: "tharu_rd",
            name: "Tharushi Ranasinghe",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
        },
        {
            id: 2,
            username: "tharukaamasha",
            name: "Tharuka Amasha",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop",
        },
        {
            id: 3,
            username: "w.msew",
            name: "W.M Sew wasala",
            avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop",
        },
        {
            id: 4,
            username: "waruna_hashan_",
            name: "Waruna Hashan",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop",
        },
        {
            id: 5,
            username: ".mindii",
            name: "Theekshana lakmindu",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
        },
    ];

    useEffect(() => {
        const getUserByToken = async () => {
            setIsLoading(true);
            const token = localStorage.getItem("authToken");
            const decode = jwtDecode(token);
            const loggedUserEmail = decode.sub;

            const response = await getUserByEmail(loggedUserEmail);
            setUser(response);
            setIsLoading(false);
        };
        getUserByToken();
    });

    return (
        <div className="flex items-start space-x-20 mb-10 px-10 py-10">
            <img
                src={
                    user === "Guest User"
                        ? "/assets/users/general.jpg"
                        : user.userImage
                }
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover"
            />
            <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                    <h1 className="text-xl font-normal">
                        {user === "Guest User"
                            ? "Guest User"
                            : user?.firstName + " " + user?.lastName}
                    </h1>
                    <button
                        className="px-4 py-1.5 bg-gray-100 rounded-md font-semibold"
                        onClick={() => {
                            navigation("/editProfileDetails");
                        }}
                    >
                        Edit profile
                    </button>
                    <img src={settingIcon} alt="settings" className="w-7 h-7" />
                </div>
                <div className="flex space-x-10 mb-4">
                    <span>
                        <strong>542</strong> posts
                    </span>
                    <button
                        onClick={() => setShowFollowers(true)}
                        className="hover:opacity-70"
                    >
                        <strong>88.5k</strong> followers
                    </button>
                    <span>
                        <strong>884</strong> following
                    </span>
                </div>
                <div>
                    <h2 className="font-semibold">
                        {user === "Guest User"
                            ? "Guest User"
                            : user?.firstName + " " + user?.lastName}
                    </h2>
                    <p className="text-gray-700">
                        {user === "Guest User" ? "" : user?.caption}
                    </p>
                    <p className="mt-1">
                        {!user?.slogan
                            ? `Capturing life's beautiful moments ✨`
                            : user?.slogan}
                    </p>
                    <p className="text-blue-900">
                        {!user?.website ? "" : user?.website}
                    </p>
                </div>
            </div>

            {/* Followers Modal */}
            {showFollowers && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
