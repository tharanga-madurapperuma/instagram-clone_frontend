import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
    const settingIcon = "/assets/icons/Options.png";

    const followers = [
        { id: 1, username: 'tharu_rd', name: 'Tharushi Ranasinghe', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop' },
        { id: 2, username: 'tharukaamasha', name: 'Tharuka Amasha', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop' },
        { id: 3, username: 'w.msew', name: 'W.M Sew wasala', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop' },
        { id: 4, username: 'waruna_hashan_', name: 'Waruna Hashan', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop' },
        { id: 5, username: '.mindii', name: 'Theekshana lakmindu', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop' },
      ];
    
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
                            alt="sttings"
                            className="w-7 h-7"
                        />
            </div>
            <div className="flex space-x-10 mb-4">
              <span><strong>542</strong> posts</span>
              <span><strong>88.5k</strong> followers</span>
              <span><strong>884</strong> following</span>
            </div>
            <div>
              <h2 className="font-semibold">Jane Doe</h2>
              <p className="text-gray-700">Digital creator</p>
              <p className="mt-1">Capturing life's beautiful moments ✨</p>
              <p className="text-blue-900">www.janedoe.com</p>
            </div>
          </div>
        </div>
    );
};

export default ProfileDetails;
