import React from "react";
import ProfileDetails from "../../components/ProfileDetails";
import UserPost from "../../components/UserPost";
import NavBar from "../../components/NavigationBar/NavBar";
import { useParams } from "react-router-dom";

const Profile = () => {
    const userId = useParams().userId;
    return (
        <div>
            <div className="flex flex-row">
                <div>
                    <NavBar />
                </div>
                <div className="flex flex-col">
                    <div>
                        <ProfileDetails userProfileId={userId} />
                    </div>
                    <div>
                        <UserPost userProfileId={userId} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
