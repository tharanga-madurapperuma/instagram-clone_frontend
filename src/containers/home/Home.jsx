import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import Story from "../../components/story/Story";
import Post from "../../components/post/Post";
import Follower from "../../components/follower/Follower";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import CreatePost from "../post/CreatePost";
import {
    IoClose,
    IoHomeOutline,
    IoSearchSharp,
    IoSettingsOutline,
} from "react-icons/io5";
import { CgAddR, CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { TiThMenu } from "react-icons/ti";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Loader from "../../components/loader/Loader";
import { getAllUsers, getUserByEmail } from "../../Api/UserApi";
import { getAllStories } from "../../Api/StoryApi";
import { getAllPosts } from "../../Api/PostApi";
import { jwtDecode } from "jwt-decode";

const Home = () => {
    // logo Image
    const logo = "/assets/Logo.png";
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
    const [opacity, setOpacity] = useState(0);
    const scrollableDivRef = useRef(null); // Reference to the scrollable div
    const [isLoading, setIsLoading] = useState(false);

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

    // useEffect(() => {
    //     setIsLoading(true);
    //     // Get all users, stories and posts
    //     const fetchUsers = async () => {
    //         const response = await getAllUsers();
    //         setUsers(response);
    //     };

    //     // get all stories
    //     const fetchStories = async () => {
    //         const response = await getAllStories();
    //         setStories(response);
    //     };

    //     // get all posts
    //     const fetchPosts = async () => {
    //         const response = await getAllPosts();
    //         setPosts(response);
    //     };
    //     const fetchLoggedUser = async () => {
    //         const token = localStorage.getItem("authToken");
    //         const decode = jwtDecode(token);
    //         const loggedUserEmail = decode.sub;

    //         const response = await getUserByEmail(loggedUserEmail);
    //         setLoggedUser(response);
    //     };

    //     fetchUsers();
    //     fetchStories();
    //     fetchPosts();
    //     fetchLoggedUser();
    //     setIsLoading(false);
    // }, []);

    // Fetch Data Function
    const fetchData = async () => {
        try {
            setIsLoading(true);

            // Fetch users, stories, and posts
            const [usersResponse, storiesResponse, postsResponse] =
                await Promise.all([
                    getAllUsers(),
                    getAllStories(),
                    getAllPosts(),
                ]);

            setUsers(usersResponse);
            setStories(storiesResponse);
            setPosts(postsResponse);

            // Fetch Logged-in User
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found");

            const decode = jwtDecode(token);
            const loggedUserEmail = decode.sub;

            const userResponse = await getUserByEmail(loggedUserEmail);
            if (!userResponse) throw new Error("User not found");

            setLoggedUser(userResponse);
        } catch (error) {
            console.error("Error fetching data:", error);
            localStorage.removeItem("authToken");
            navigation("/login"); // Redirect to login if authentication fails
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch Data on Component Mount
    useEffect(() => {
        fetchData();
    }, [navigation]); // Include navigation to avoid stale closures

    useEffect(() => {
        setModalIsOpen(false);
        setCloseModal(true);
    }, [closeModal]);

    // Use effect for color changing navbar when scrolling
    useEffect(() => {
        const handleScroll = () => {
            const scrollDiv = scrollableDivRef.current;
            if (!scrollDiv) return;

            const scrollY = scrollDiv.scrollTop; // Get scroll position of the div

            const maxOpacity = 0.9; // Maximum opacity value
            const minOpacity = 0; // Minimum opacity value
            const scrollThreshold = 600; // Scroll threshold to reach full opacity

            const newOpacity = Math.min(
                maxOpacity,
                Math.max(minOpacity, scrollY / scrollThreshold)
            );
            setOpacity(newOpacity);
        };

        const scrollDiv = scrollableDivRef.current;
        if (scrollDiv) {
            scrollDiv.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (scrollDiv) {
                scrollDiv.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    return (
        <div className="flex flex-row">
            {isLoading && <Loader />}
            {screenWidth > 768 ? (
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
                            window.localStorage.removeItem("authToken");
                            navigation("/login");
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
                                setMenuOpen(false);
                            }}
                        >
                            <CgAddR className="home_icons cursor-pointer" />
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
                                window.localStorage.removeItem("authToken");
                                navigation("/login");
                            }}
                        >
                            <LuLogOut className="home_icons" />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <CreatePost
                        open={modalIsOpen}
                        onClose={() => {
                            setCloseModal(false);
                        }}
                        loggedUser={LOGGED_USER}
                        onOpen={() => {
                            setMenuOpen(false);
                        }}
                    />
                    <div
                        className="small-screen-navbar flex justify-between items-center w-[100vw] h-10"
                        style={{
                            backgroundColor: `rgba(200,200,200, ${opacity})`,
                            transition: "background-color 0.5s ease",
                        }}
                    >
                        <div>
                            <TiThMenu
                                className="home_icons menu-icon-smallScreen"
                                onClick={() => {
                                    console.log("menu icon clicked");
                                    setMenuOpen(true);
                                }}
                            />
                        </div>

                        <div>
                            <img src={logo} alt="logo" />
                        </div>
                        <div>
                            <AiOutlineUsergroupAdd className="small-screen-follower-icon" />
                        </div>
                    </div>
                </>
            )}

            {/* seperation line */}
            {screenWidth > 768 ? (
                <div className="speration-line w-0.5 bg-gray-300"></div>
            ) : null}

            <div
                className="feedSection justify-items-center "
                ref={scrollableDivRef}
            >
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
                    <Follower user={user} key={user.user_id} />
                ))}
            </div>
        </div>
    );
};

export default Home;
