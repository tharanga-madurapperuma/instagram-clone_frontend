import React from "react";
import ProfileDetails from "../components/ProfileDetails";
import UserPost from "../components/UserPost";
import { Navbar } from "@material-tailwind/react";

const Profile = () => {
    return (
        <div className="px-20">
            <div className="flex flex-row">
                <div>
                    <Navbar />
                </div>
                <div className="flex flex-col">
                    <div>
                        <ProfileDetails />
                    </div>
                    <div>
                        <UserPost />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
