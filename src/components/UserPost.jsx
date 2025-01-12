import React from "react";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import UserPostcard from "./userPostCard/UserPostcard";

const UserPost = () => {
    const [activeTab, setActiveTab] = React.useState();
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
        {
            tab: "TAGGED",
            icon: <AiOutlineUser />,
        },
    ];

    return (
        <div>
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
                    {[1, 1, 1, 1, 1, 1].map((item, index) => (
                        <UserPostcard />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserPost;
