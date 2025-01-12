import React from "react";

const ProfileDetails = () => {
    const settingIcon = "/assets/icons/Options.png";
    return (
        <div className="py-10">
            <div className="flex items-center space-x-10">
                <div className="w-[15]">
                    <img
                        className="w-32 h-32 rounded-full"
                        src="https://cdn.pixabay.com/photo/2023/05/10/19/18/sparrow-7984807_640.jpg"
                        alt=""
                    />
                </div>
                <div className="my-5 w-[50]">
                    <div className="font-medium mx-20 flex space-x-3 items-center">
                        <p>UserName</p>
                        <button className="py-1 rounded-md px-2 bg-[#e7e5e4]">
                            Edit Profile
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
