import React, { useEffect, useRef, useState } from "react";
import "./editProfile.css";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { getUserByEmail, updateUser } from "../../Api/UserApi";
import {
    IoClose,
    IoHomeOutline,
    IoSearchSharp,
    IoSettingsOutline,
} from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { TiThMenu } from "react-icons/ti";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";
import FileResizer from "react-image-file-resizer";
import axios from "axios";

const EditProfile = () => {
    const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    // logo Image
    const logo = "/assets/Logo.png";
    // get the user
    const [LOGGED_USER, setLoggedUser] = useState();

    const navigation = useNavigate();

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [menuOpen, setMenuOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const scrollableDivRef = useRef(null); // Reference to the scrollable div
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(
        "/assets/upload-image.jpg"
    );
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Empty array ensures the effect runs only on mount and unmount

    useEffect(() => {
        const fetchLoggedUser = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem("authToken");
                const decodeToken = jwtDecode(token);
                const loggedUserEmail = decodeToken.sub;
                const response = await getUserByEmail(loggedUserEmail);

                if (response) {
                    setLoggedUser(response); // Update LOGGED_USER here
                } else {
                    console.log("User not found");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLoggedUser();
    }, []); // Run only once when the component mounts

    // Effect to set user details after LOGGED_USER updates
    useEffect(() => {
        if (LOGGED_USER) {
            setProfileImage(
                LOGGED_USER?.userImage
                    ? LOGGED_USER?.userImage
                    : "/assets/upload-image.jpg"
            );
            setFirstName(LOGGED_USER.firstName || "");
            setLastName(LOGGED_USER.lastName || "");
            setEmail(LOGGED_USER.email || "");
            setCaption(LOGGED_USER.caption || "");
        }
    }, [LOGGED_USER]); // Dependency ensures this runs only when LOGGED_USER changes

    // Use effect for color changing navbar when scrolling
    useEffect(() => {
        const handleScroll = () => {
            const scrollDiv = scrollableDivRef.current;
            if (!scrollDiv) return;

            const scrollY = scrollDiv.scrollTop; // Get scroll position of the div

            const maxOpacity = 0.9; // Maximum opacity value
            const minOpacity = 0; // Minimum opacity value
            const scrollThreshold = 600; // Scroll threshold to reach full opacity

            const newOpacity = Math.min(
                maxOpacity,
                Math.max(minOpacity, scrollY / scrollThreshold)
            );
            setOpacity(newOpacity);
        };

        const scrollDiv = scrollableDivRef.current;
        if (scrollDiv) {
            scrollDiv.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (scrollDiv) {
                scrollDiv.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    // image upload function
    const handleImageUpload = async (e) => {
        e.preventDefault();
        const fileUpload = e.target.files[0];

        if (fileUpload && fileUpload.type.startsWith("image/")) {
            // resize the image
            try {
                const file = await resizeFile(fileUpload);

                setFile(file);
            } catch (error) {
                console.error("Error resizing the file:", error);
                alert("Failed to resize the image. Please try again.");
            }
        } else {
            setFile(null);
            alert("Please select image or video file");
        }
    };

    // File resizer
    const resizeFile = (file) =>
        new Promise((resolve, reject) => {
            // Determine output format based on the input file type
            const outputFormat = file.type === "image/png" ? "PNG" : "JPEG";

            FileResizer.imageFileResizer(
                file,
                1000, // Target width
                1000, // Target height
                outputFormat, // Dynamically set output format
                100, // Quality percentage
                0, // Rotation (0 degrees)
                (uri) => {
                    // Convert Base64 to File
                    const byteString = atob(uri.split(",")[1]);
                    const mimeString = uri.split(",")[0].match(/:(.*?);/)[1];
                    const arrayBuffer = new ArrayBuffer(byteString.length);
                    const uint8Array = new Uint8Array(arrayBuffer);

                    for (let i = 0; i < byteString.length; i++) {
                        uint8Array[i] = byteString.charCodeAt(i);
                    }

                    const blob = new Blob([uint8Array], { type: mimeString });
                    const resizedFile = new File([blob], file.name, {
                        type: mimeString,
                    });

                    resolve(resizedFile);
                },
                "base64", // Output type
                (error) => {
                    reject(error);
                }
            );
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("file", file); // Append the file with the key 'image'
            formData.append("upload_preset", "instagram-clone_users");
            formData.append("cloud_name", { CLOUDINARY_CLOUD_NAME });
            const CLOUD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

            const response_cloudinary = await axios.post(CLOUD_URL, formData);

            // get file url from cloudinary and assign it to fileUrl
            let fileUrl = response_cloudinary.data.secure_url;
            setProfileImage(fileUrl);

            // Update user details
            await updateUser(LOGGED_USER.user_id, {
                firstName: firstName,
                lastName: lastName,
                email: email,
                caption: caption,
                userImage: fileUrl,
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-row">
            {isLoading && <Loader />}
            {screenWidth > 768 ? (
                <div className="leftMenu justify-items-start text-gray-800 m-10">
                    {/* left menu */}
                    <div className="mt-0 mb-20 cursor-pointer">
                        <img
                            src={logo}
                            alt="logo"
                            onClick={() => {
                                navigation("/");
                            }}
                        />
                    </div>

                    <div
                        className="flex my-10 flex-row cursor-pointer items-center home_icons_container"
                        onClick={() => {
                            navigation("/");
                        }}
                    >
                        <IoHomeOutline className="home_icons" />
                        <span>Home</span>
                    </div>
                    <div
                        className="flex flex-row my-10 cursor-pointer items-center home_icons_container"
                        onClick={() => {
                            navigation("/search");
                        }}
                    >
                        <IoSearchSharp className="home_icons" />
                        <span>Search</span>
                    </div>
                    <div
                        className="flex flex-row my-10 cursor-pointer items-center home_icons_container"
                        onClick={() => {
                            navigation("/profile");
                        }}
                    >
                        <CgProfile className="home_icons" />
                        <span>Profile</span>
                    </div>
                    <div
                        className="flex flex-row my-10 cursor-pointer items-center home_icons_container"
                        onClick={() => {
                            navigation("/settings");
                        }}
                    >
                        <IoSettingsOutline className="home_icons" />
                        <span>Settings</span>
                    </div>
                    <div
                        className="flex flex-row my-10 cursor-pointer items-center home_icons_container"
                        onClick={() => {
                            navigation("/");
                        }}
                    >
                        <LuLogOut className="home_icons" />
                        <span>Logout</span>
                    </div>
                </div>
            ) : menuOpen ? (
                <>
                    <div
                        className="smallScreen-overlay"
                        onClick={() => {
                            setMenuOpen(false);
                        }}
                    ></div>
                    <div className="leftMenu-small-screen flex flex-col justify-evenly items-center">
                        {/* left menu for small screens*/}

                        <div className="">
                            <IoClose
                                className="home_icons close-smallScreen "
                                onClick={() => {
                                    setMenuOpen(false);
                                }}
                            />
                        </div>
                        <div
                            className=""
                            onClick={() => {
                                navigation("/");
                            }}
                        >
                            <IoHomeOutline className="home_icons" />
                        </div>
                        <div
                            className="home_icons_container"
                            onClick={() => {
                                navigation("/search");
                            }}
                        >
                            <IoSearchSharp className="home_icons" />
                        </div>
                        <div
                            className=""
                            onClick={() => {
                                navigation("/profile");
                            }}
                        >
                            <CgProfile className="home_icons" />
                        </div>
                        <div
                            className=""
                            onClick={() => {
                                navigation("/settings");
                            }}
                        >
                            <IoSettingsOutline className="home_icons" />
                        </div>
                        <div
                            className=""
                            onClick={() => {
                                navigation("/");
                            }}
                        >
                            <LuLogOut className="home_icons" />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className="small-screen-navbar flex justify-between items-center w-[100vw] h-10"
                        style={{
                            backgroundColor: `rgba(200,200,200, ${opacity})`,
                            transition: "background-color 0.5s ease",
                        }}
                    >
                        <div>
                            <TiThMenu
                                className="home_icons menu-icon-smallScreen"
                                onClick={() => {
                                    console.log("menu icon clicked");
                                    setMenuOpen(true);
                                }}
                            />
                        </div>

                        <div>
                            <img src={logo} alt="logo" />
                        </div>
                        <div>
                            <AiOutlineUsergroupAdd className="small-screen-follower-icon" />
                        </div>
                    </div>
                </>
            )}

            {/* seperation line */}
            {screenWidth > 768 ? (
                <div className="speration-line w-0.5 bg-gray-300"></div>
            ) : null}
            <div className="flex items-center justify-center w-full h-[100vh]">
                <div className="edit-profile-container flex flex-row ">
                    <div className="edit-profile_upload-image flex justify-center items-center ">
                        <label
                            htmlFor="user-image-upload"
                            className="upload_image flex justify-center items-center"
                        >
                            <img
                                src={
                                    file
                                        ? URL.createObjectURL(file)
                                        : profileImage
                                }
                            />
                        </label>
                    </div>
                    <div className="edit-profile-form_container flex justify-center items-center bg-slate-200">
                        <form className="edit-profile-form flex items-center flex-col">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Caption"
                                value={caption}
                                onChange={(e) => {
                                    setCaption(e.target.value);
                                }}
                            />
                            <input
                                className="edit-profile-form_image-input"
                                type="file"
                                id="user-image-upload"
                                accept="image/*"
                                onChange={(e) => {
                                    handleImageUpload(e);
                                }}
                            />
                            <button
                                className="edit-profile-form_button"
                                onClick={(e) => {
                                    handleSubmit(e);
                                }}
                            >
                                Edit Profile
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
