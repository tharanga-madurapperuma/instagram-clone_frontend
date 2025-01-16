import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
    const settingIcon = "/assets/icons/Options.png";
    const logo = "/assets/images/Logo.png";
    const navigation = useNavigate();
    return (
        <div className="py-10">
            <div>
                <div className="leftMenu justify-items-start text-gray-800 m-10">
                    {/* left menu */}
                    <div className="mt-0 mb-20 cursor-pointer">
                        <img
                            src={logo}
                            alt="logo"
                            onClick={() => {
                                navigation("/");
                            }}
                        />
                    </div>
                </div>
                <div className="speration-line w-0.5 bg-gray-300"></div>
            </div>

            <div className="flex items-center space-x-10">
                <div className="w-[15]">
                    <img
                        className="w-40 h-40 rounded-full align-middle"
                        src="https://cdn.pixabay.com/photo/2023/05/10/19/18/sparrow-7984807_640.jpg"
                        alt=""
                    />
                </div>
                <div className="my-5 w-[50]">
                    <div className="font-medium mx-20 flex space-x-3 items-center">
                        <p>UserName</p>
                        <button
                            onClick={() => {
                                navigation("/editProfileDetails");
                            }}
                            className="py-1 rounded-md px-2 bg-[#e7e5e4]"
                        >
                            Edit profile
                        </button>
                        <button className="py-1 rounded-md px-2 bg-[#e7e5e4]">
                            View archive
                        </button>
                        <img
                            src={settingIcon}
                            alt="sttings"
                            className="w-7 h-7"
                        />
                    </div>
                    <div className="flex space-x-10 mx-20">
                        <div>
                            <span className="font-medium mr-2">10</span>
                            <span>Posts</span>
                        </div>
                        <div>
                            <span className="font-medium mr-2">10</span>
                            <span>Followers</span>
                        </div>
                        <div>
                            <span className="font-medium mr-2">10</span>
                            <span>Following</span>
                        </div>
                    </div>

                    <div className="mx-20 my-5">
                        <p className="font-medium">User Name</p>
                        <p className="font-thin text-sm">
                            Demon 😈 <br /> Coder 👨‍💻 <br /> Traveller ✈️
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
