import React from "react";
import ProfileDetails from "../../components/ProfileDetails";
import UserPost from "../../components/UserPost";
import NavBar from "../../components/NavigationBar/NavBar";

const Profile = () => {
    return (
        <div>
            <div className="flex flex-row">
                <div>
                    <NavBar />
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
