import React, { useEffect, useState } from "react";
import Images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import CreatePost from "../../containers/post/CreatePost";

const NavBar = () => {
    const navigation = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [closeModal, setCloseModal] = useState(true);

    useEffect(() => {
        setModalIsOpen(false);
        setCloseModal(true);
    }, [closeModal]);

    return (
        <div className="flex flex-row h-screen justify-between">
            <div className="flex flex-col h-screen">
            <div className="leftMenu justify-items-start text-gray-800 m-10">
                {/* left menu */}
                <div className="mt-0 mb-20 cursor-pointer">
                    <img
                        src={Images.logo}
                        alt="logo"
                        onClick={() => {
                            navigation("/");
                        }}
                    />
                </div>

                <div
                    className="flex my-10 flex-row cursor-pointer"
                    onClick={() => {
                        navigation("/");
                    }}
                >
                    <img src={Images.home_fill} alt="home" />
                    <span>Home</span>
                </div>
                <div
                    className="flex flex-row my-10 cursor-pointer"
                    onClick={() => {
                        navigation("/search");
                    }}
                >
                    <img src={Images.search} alt="search" />
                    <span>Search</span>
                </div>
                <div
                    className="flex flex-row my-10 cursor-pointer"
                    onClick={() => {
                        setModalIsOpen(true);
                    }}
                >
                    <img src={Images.newPost} alt="newPost" />
                    <span>Create Post</span>
                    <CreatePost
                        open={modalIsOpen}
                        onClose={() => {
                            setCloseModal(false);
                        }}
                    />
                </div>
                <div
                    className="flex flex-row my-10 cursor-pointer"
                    onClick={() => {
                        navigation("/profile");
                    }}
                >
                    <img src={Images.profile} alt="profile" />
                    <span>Profile</span>
                </div>
                <div
                    className="flex flex-row my-10 cursor-pointer"
                    onClick={() => {
                        navigation("/settings");
                    }}
                >
                    <img src={Images.settings} alt="settings" />
                    <span>Settings</span>
                </div>
                <div
                    className="flex flex-row my-10 cursor-pointer"
                    onClick={() => {
                        navigation("/");
                    }}
                >
                    <img src={Images.logout} alt="logout" />
                    <span>Logout</span>
                </div>
            </div>
            </div>

            <div className="speration-line w-0.5 bg-gray-300"></div>

        </div>
    );
};

export default NavBar;
