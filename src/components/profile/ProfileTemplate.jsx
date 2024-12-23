import React, { useEffect, useState } from "react";
import Data from "../../fetchData";

const ProfileTemplatePost = ({ user, post }) => {
    const [displayTime, setDisplayTime] = useState("");

    const getFormattedDateTime = () => {
        const now = new Date();

        const year = now.getFullYear(); // yyyy
        const month = String(now.getMonth() + 1).padStart(2, "0"); // MM (0-based index, add 1)
        const day = String(now.getDate()).padStart(2, "0"); // dd
        const hours = String(now.getHours()).padStart(2, "0"); // HH
        const minutes = String(now.getMinutes()).padStart(2, "0"); // mm
        const seconds = String(now.getSeconds()).padStart(2, "0"); // ss

        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    };

    // Example usage
    useEffect(() => {
        const presentTime = getFormattedDateTime();
        const postedTime = post.date;

        setDisplayTime(() => {
            const timeDifference = parseInt(presentTime) - parseInt(postedTime);
            if (timeDifference < 60) {
                return `${timeDifference} seconds ago`;
            } else if (timeDifference <= 5959) {
                return `${Math.ceil(timeDifference / 100)} minutes ago`;
            } else if (timeDifference <= 235959) {
                return `${Math.ceil(timeDifference / 10000)} hours ago`;
            } else if (timeDifference <= 29235959) {
                return `${Math.ceil(timeDifference / 1000000)} days ago`;
            } else if (timeDifference <= 1129235959) {
                return `${Math.ceil(timeDifference / 100000000)} months ago`;
            } else {
                return `${Math.ceil(timeDifference / 10000000000)} years ago`;
            }
        });
    }, []);

    return (
        <div className="top-left_content flex">
            <div className="content-image">
                <div className="image">
                    <img
                        src={`${Data.fileStore.downloadUser}${user.userImage}`}
                    ></img>
                </div>
            </div>
            <div className="content_data ml-3">
                <div className="data-user-name-date flex items-center">
                    <div className="username text-base font-medium">
                        {user.firstName} {user.lastName}
                    </div>
                    <div className="mx-2 bg-gray-500 mt-1"></div>
                    <div className="date text-gray-500 ml-0">{displayTime}</div>
                </div>
                <div className="data-caption">
                    <p className="text-sm font-light">{user.caption}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileTemplatePost;