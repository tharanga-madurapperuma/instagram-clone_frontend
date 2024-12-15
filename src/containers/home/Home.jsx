import React, { useEffect, useState } from "react";
import Images from "../../assets/images";
import "./home.css";
import Story from "../../components/story/Story";
import Post from "../../components/post/Post";
import Follower from "../../components/follower/Follower";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import CreatePost from "../post/CreatePost";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const navigation = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [closeModal, setCloseModal] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(`${BASE_URL}/users/getAllUser`);
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${BASE_URL}/getAllPosts`);
            setPosts(response.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (modalIsOpen) {
            document
                .querySelector(".feedSection_story")
                .classList.add("storyVisible");
        } else {
            document
                .querySelector(".feedSection_story")
                .classList.remove("storyVisible");
        }
    }, [modalIsOpen]);

    useEffect(() => {
        setModalIsOpen(false);
        setCloseModal(true);
    }, [closeModal]);

    console.log(users);
    return (
        <div className="flex flex-row">
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

            <div className="speration-line w-0.5 bg-gray-300"></div>

            <div className="feedSection justify-items-cente">
                {/* feed section */}
                <div className="feedSection_story flex flex-row justify-items-start ">
                    <Swiper spaceBetween={5} slidesPerView={8}>
                        <SwiperSlide>
                            <Story />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Story />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Story />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Story />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Story />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Story />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Story />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Story />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Story />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Story />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Story />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Story />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="feedSection_post">
                    {
                        /* post section */
                        posts.map((post) => (
                            <Post post={post} />
                        ))
                    }
                </div>
            </div>
            <div className="followers justify-items-center pr-10 mt-5 pt-5">
                {/* All users*/}
                {users.map((user) => (
                    <Follower user={user} />
                ))}
            </div>
        </div>
    );
};

export default Home;
