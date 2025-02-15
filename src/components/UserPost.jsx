import React, { useEffect, useState } from "react";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import UserPostcard from "./userPostCard/UserPostcard";
import { jwtDecode } from "jwt-decode";
import { getSavedPosts, getUserByEmail } from "../Api/UserApi";
import { getAllPosts } from "../Api/PostApi";
import Loader from "./loader/Loader";

const UserPost = () => {
    const [loggedUser, setLoggedUser] = useState();
    const [activeTab, setActiveTab] = useState("POSTS");
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [savedPostsId, setSavedPostsId] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getLoggedUser = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem("authToken");
                const decode = jwtDecode(token);
                const loggedUserEmail = decode.sub;

                const response = await getUserByEmail(loggedUserEmail);
                setLoggedUser(response);
            } catch (error) {
                console.error("Error fetching logged user:", error);
            }
            setIsLoading(false);
        };

        getLoggedUser();
    }, []);

    useEffect(() => {
        if (!loggedUser) return; // Prevents running when loggedUser is undefined

        const getUserPosts = async () => {
            setIsLoading(true);
            try {
                const response = await getAllPosts();
                setAllPosts(response);

                const userPosts = response.filter(
                    (post) => post.userId === loggedUser.user_id
                );
                setPosts(userPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
            setIsLoading(false);
        };

        const getSavedPost = async () => {
            setIsLoading(true);
            try {
                const response = await getSavedPosts(loggedUser.user_id);
                setSavedPostsId(response);
            } catch (error) {
                console.error("Error fetching saved posts:", error);
            }
            setIsLoading(false);
        };

        getUserPosts();
        getSavedPost();
    }, [loggedUser]); // Runs only when loggedUser updates

    useEffect(() => {
        if (savedPostsId.length === 0 || allPosts.length === 0) return;

        const getSavedPost = () => {
            setSavedPosts(
                savedPostsId
                    .map((postId) =>
                        allPosts.find((post) => post.postId === postId)
                    )
                    .filter(Boolean)
            );
        };

        getSavedPost();
    }, [savedPostsId, allPosts]); // Runs when either savedPostsId or allPosts updates

    const tabs = [
        {
            tab: "POSTS",
            icon: <AiOutlineTable />,
            activeTab: "",
        },

        {
            tab: "SAVED",
            icon: <BiBookmark />,
        },
    ];
    return (
        <div>
            {isLoading && <Loader />}
            <div className="flex justify-center space-x-10 border-t relative">
                {tabs.map((item) => (
                    <div
                        onClick={() => setActiveTab(item.tab)}
                        className={`${
                            activeTab === item.tab
                                ? "border-t border-black"
                                : "opacity-60"
                        } flex items-center cursor-pointer py-2 text-sm`}
                    >
                        <p>{item.icon}</p>

                        <p className="ml-3">{item.tab}</p>
                    </div>
                ))}
            </div>
            <div>
                <div className="flex flex-wrap justify-center">
                    {activeTab === "POSTS"
                        ? posts.map((post, index) => (
                              <UserPostcard post={post} />
                          ))
                        : savedPosts.map((post, index) => (
                              <UserPostcard post={post} />
                          ))}
                </div>
            </div>
        </div>
    );
};

export default UserPost;
