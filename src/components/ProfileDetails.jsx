import React, { useState, useEffect } from "react";
import { BiSearch, BiX } from "react-icons/bi";
import axios from "axios";

const ProfileDetails = ({ userId }) => {
    const settingIcon = "/assets/icons/Options.png";
    const [showFollowers, setShowFollowers] = useState(false);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await axios.get(`/users/${userId}/followers`);
                setFollowers(response.data);
            } catch (error) {
                console.error("Error fetching followers:", error);
            }
        };

        fetchFollowers();
    }, [userId]);

    return (
        <div className="flex items-start space-x-20 mb-10 px-10 py-10">
            <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces"
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover"
            />
            <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                    <h1 className="text-xl font-normal">janedoe</h1>
                    <button className="px-4 py-1.5 bg-gray-100 rounded-md font-semibold">Edit profile</button>
                    <img
                        src={settingIcon}
                        alt="settings"
                        className="w-7 h-7"
                    />
                </div>
                <div className="flex space-x-10 mb-4">
                    <span><strong>542</strong> posts</span>
                    <button
                        onClick={() => setShowFollowers(true)}
                        className="hover:opacity-70"
                    >
                        <strong>{followers.length}</strong> followers
                    </button>
                    <span><strong>884</strong> following</span>
                </div>
                <div>
                    <h2 className="font-semibold">Jane Doe</h2>
                    <p className="text-gray-700">Digital creator</p>
                    <p className="mt-1">Capturing life's beautiful moments ✨</p>
                    <p className="text-blue-900">www.janedoe.com</p>
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
                                {followers.map((follower, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={follower.avatar}
                                                alt={follower.username}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-semibold">{follower.username}</p>
                                                <p className="text-gray-500 text-sm">{follower.name}</p>
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