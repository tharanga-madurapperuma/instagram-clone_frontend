import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
    const settingIcon = "/assets/icons/Options.png";
    const logo = "/assets/images/Logo.png";
    const navigation = useNavigate();
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
