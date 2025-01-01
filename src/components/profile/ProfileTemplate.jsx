import React from "react";
import Data from "../../fetchData";

const ProfileTemplate = ({ user }) => {
    console.log(user);
    return (
        <div className="top-left_content flex">
            <div className="flex items-center justify-center">
                <div className="image">
                    <img
                        src={
                            user?.userImage
                                ? `${Data.fileStore.downloadUser}${user?.userImage}`
                                : `${Data.fileStore.downloadUser}`
                        }
                    ></img>
                </div>
            </div>
            <div className="content_data ml-3">
                <div className="data-user-name-date flex items-center">
                    <div className="username text-base font-semibold">
                        {user?.firstName} {user?.lastName}
                    </div>
                </div>
                <div className="data-caption">
                    <p className="text-sm font-normal">{user?.caption}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileTemplate;
