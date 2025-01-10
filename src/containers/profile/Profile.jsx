import React from "react";
import ProfileDetails from "../../components/ProfileDetails";
import UserPost from "../../components/UserPost";
import NavBar from "../../components/NavigationBar/NavBar";

const Profile = () => {
    return (
        <div className="px-20">
            <div>
                <NavBar />
            </div>
            <div>
                <ProfileDetails />
            </div>
            <div>
                <UserPost />
            </div>
        </div>
    );
};

export default Profile;
