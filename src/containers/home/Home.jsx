import React, { useEffect, useState } from "react";
import Images from "../../assets/images";
import "./home.css";
import Story from "../../components/story/Story";
import Post from "../../components/post/Post";
import Follower from "../../components/follower/Follower";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import CreatePost from "../post/CreatePost";
import axios from "axios";
import Data from "../../fetchData";
import {
    IoClose,
    IoHomeOutline,
    IoSearchSharp,
    IoSettingsOutline,
} from "react-icons/io5";
import { CgAddR, CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { TiThMenu } from "react-icons/ti";

const Home = () => {
    // get the user
    const [LOGGED_USER, setLoggedUser] = useState();

    const [posts, setPosts] = useState([]);
    const navigation = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [closeModal, setCloseModal] = useState(true);
    const [users, setUsers] = useState([]);
    const [stories, setStories] = useState([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Empty array ensures the effect runs only on mount and unmount

    useEffect(() => {
        // Get all users, stories and posts
        const fetchUsers = async () => {
            const response = await axios.get(Data.users.getAllUsers);
            setUsers(response.data);
        };

        // get all stories
        const fetchStories = async () => {
            const response = await axios.get(Data.stories.getAllStories);
            setStories(response.data);
        };

        // get all posts
        const fetchPosts = async () => {
            const response = await axios.get(Data.posts.getAllPosts);
            setPosts(response.data);
        };
        const fetchLoggedUser = async () => {
            await axios
                .get(Data.users.getUserById + "U7")
                .then((response) => {
                    setLoggedUser(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        fetchUsers();
        fetchStories();
        fetchPosts();
        fetchLoggedUser();
    }, []);

    useEffect(() => {
        setModalIsOpen(false);
        setCloseModal(true);
    }, [closeModal]);

    return (
        <div className="flex flex-row">
            {screenWidth > 768 ? (
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
                        className="flex my-10 flex-row cursor-pointer items-center home_icons_container"
                        onClick={() => {
                            navigation("/");
                        }}
                    >
                        <IoHomeOutline className="home_icons" />
                        <span>Home</span>
                    </div>
                    <div
                        className="flex flex-row my-10 cursor-pointer items-center home_icons_container"
                        onClick={() => {
                            navigation("/search");
                        }}
                    >
                        <IoSearchSharp className="home_icons" />
                        <span>Search</span>
                    </div>
                    <div
                        className="flex flex-row my-10 cursor-pointer items-center home_icons_container"
                        onClick={() => {
                            setModalIsOpen(true);
                        }}
                    >
                        <CgAddR className="home_icons" />
                        <span>Create Post</span>
                        <CreatePost
                            open={modalIsOpen}
                            onClose={() => {
                                setCloseModal(false);
                            }}
                            loggedUser={LOGGED_USER}
                        />
                    </div>
                    <div
                        className="flex flex-row my-10 cursor-pointer items-center home_icons_container"
                        onClick={() => {
                            navigation("/profile");
                        }}
                    >
                        <CgProfile className="home_icons" />
                        <span>Profile</span>
                    </div>
                    <div
                        className="flex flex-row my-10 cursor-pointer items-center home_icons_container"
                        onClick={() => {
                            navigation("/settings");
                        }}
                    >
                        <IoSettingsOutline className="home_icons" />
                        <span>Settings</span>
                    </div>
                    <div
                        className="flex flex-row my-10 cursor-pointer items-center home_icons_container"
                        onClick={() => {
                            navigation("/");
                        }}
                    >
                        <LuLogOut className="home_icons" />
                        <span>Logout</span>
                    </div>
                </div>
            ) : menuOpen ? (
                <>
                    <div
                        className="smallScreen-overlay"
                        onClick={() => {
                            setMenuOpen(false);
                        }}
                    ></div>
                    <div className="leftMenu-small-screen flex flex-col justify-evenly items-center">
                        {/* left menu for small screens*/}

                        <div className="">
                            <IoClose
                                className="home_icons close-smallScreen "
                                onClick={() => {
                                    setMenuOpen(false);
                                }}
                            />
                        </div>
                        <div
                            className=""
                            onClick={() => {
                                navigation("/");
                            }}
                        >
                            <IoHomeOutline className="home_icons" />
                        </div>
                        <div
                            className="home_icons_container"
                            onClick={() => {
                                navigation("/search");
                            }}
                        >
                            <IoSearchSharp className="home_icons" />
                        </div>
                        <div
                            className=""
                            onClick={() => {
                                setModalIsOpen(true);
                            }}
                        >
                            <CgAddR className="home_icons" />
                            <CreatePost
                                open={modalIsOpen}
                                onClose={() => {
                                    setCloseModal(false);
                                }}
                                loggedUser={LOGGED_USER}
                            />
                        </div>
                        <div
                            className=""
                            onClick={() => {
                                navigation("/profile");
                            }}
                        >
                            <CgProfile className="home_icons" />
                        </div>
                        <div
                            className=""
                            onClick={() => {
                                navigation("/settings");
                            }}
                        >
                            <IoSettingsOutline className="home_icons" />
                        </div>
                        <div
                            className=""
                            onClick={() => {
                                navigation("/");
                            }}
                        >
                            <LuLogOut className="home_icons" />
                        </div>
                    </div>
                </>
            ) : (
                <TiThMenu
                    className="home_icons menu-icon-smallScreen"
                    onClick={() => {
                        console.log("menu icon clicked");
                        setMenuOpen(true);
                    }}
                />
            )}

            {/* seperation line */}
            {screenWidth > 768 ? (
                <div className="speration-line w-0.5 bg-gray-300"></div>
            ) : null}

            <div className="feedSection justify-items-center ">
                {/* feed section */}
                <div className="feedSection_story flex flex-row justify-items-start ">
                    {[...stories].reverse().map((story) => (
                        <Story story={story} key={story.storyId} />
                    ))}
                </div>
                <div className="feedSection_post post-background">
                    {[...posts].reverse().map((post) => (
                        <Post
                            post={post}
                            key={post.postId}
                            loggedUser={LOGGED_USER}
                        />
                    ))}
                </div>
            </div>
            <div className="followers justify-items-center m-5">
                {/* All users*/}
                {users.map((user) => (
                    <Follower user={user} />
                ))}
            </div>
        </div>
    );
};

export default Home;
