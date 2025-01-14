import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import CreatePost from "../../containers/post/CreatePost";

const NavBar = () => {
    const logo = "/assets/images/Logo.png";
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
                            src={logo}
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
                        <img src={"home_fill"} alt="home" />
                        <span>Home</span>
                    </div>
                    <div
                        className="flex flex-row my-10 cursor-pointer"
                        onClick={() => {
                            navigation("/search");
                        }}
                    >
                        <img src={"search"} alt="search" />
                        <span>Search</span>
                    </div>
                    <div
                        className="flex flex-row my-10 cursor-pointer"
                        onClick={() => {
                            setModalIsOpen(true);
                        }}
                    >
                        <img src={"newPost"} alt="newPost" />
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
                        <img src={"profile"} alt="profile" />
                        <span>Profile</span>
                    </div>
                    <div
                        className="flex flex-row my-10 cursor-pointer"
                        onClick={() => {
                            navigation("/settings");
                        }}
                    >
                        <img src={"settings"} alt="settings" />
                        <span>Settings</span>
                    </div>
                    <div
                        className="flex flex-row my-10 cursor-pointer"
                        onClick={() => {
                            navigation("/");
                        }}
                    >
                        <img src={"logout"} alt="logout" />
                        <span>Logout</span>
                    </div>
                </div>
            </div>

            <div className="speration-line w-0.5 bg-gray-300"></div>
        </div>
    );
};

export default NavBar;
