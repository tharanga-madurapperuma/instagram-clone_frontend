import React from "react";
import "./follower.css";
import "../post/post.css";

const Follower = ({ user }) => {
    return (
        <div className="follower mt-3">
            <div className=" flex justify-between">
                <div className="top-left_content flex">
                    <div className="content-image">
                        <div className="image">
                            <img
                                src={
                                    !user.userImage
                                        ? "./assets/users/general.jpg"
                                        : `./${user.userImage}`
                                }
                                alt="Profile"
                            ></img>
                        </div>
                    </div>

                    <div className="content_data ml-2">
                        <div className="data-user-name-date flex items-center">
                            <div className="username text-base font-medium">
                                {user?.firstName} {user?.lastName}
                            </div>
                        </div>
                        <div className="data-caption">
                            <p className="text-sm font-light">
                                {user?.caption}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="date text-cyan-500 m-2">Followed</div>
            </div>
        </div>
    );
};

export default Follower;
