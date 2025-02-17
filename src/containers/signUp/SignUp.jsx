import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, getUserByEmail } from "../../Api/UserApi";
import "../../App.css";
import "./signUp.css";
import Loader from "../../components/loader/Loader";
import { algoliasearch } from "algoliasearch";

const Signup = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    // images from public folder
    const instaLogo = "/assets/insta.png";
    const googlePlay = "/assets/google.png";
    const appStore = "/assets/apple.png";

    const navigation = useNavigate();
    const [gUser, setGUser] = useState();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Algolia credentials
    // const APP_ID = process.env.REACT_APP_ALGOLIA_ID;
    // const WRITE_KEY = process.env.REACT_APP_ALGOLIA_WRITE_API_KEY;
    // const INDEX_NAME = "instagram-clone";

    // const writeClient = algoliasearch(APP_ID, WRITE_KEY);

    const saveUserData = async (email, password, firstName, lastName) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/users/register`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                }),
            });

            const data = await response.json();
            setGUser(data);
        } catch (error) {
            console.error("Error saving user data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `${API_BASE_URL}/users/getUserByEmail/{email}`
                );
                const data = await response.json();
                setGUser(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        if (email) fetchUserData();
    }, [email]);

    const validateForm = (email, password) => {
        const errors = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errors.email = "Email is required.";
        } else if (!emailRegex.test(email)) {
            errors.email = "Invalid email format.";
        }

        // Password validation
        if (!password) {
            errors.password = "Password is required.";
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters long.";
        } else if (!/[A-Z]/.test(password)) {
            errors.password =
                "Password must contain at least one uppercase letter.";
        } else if (!/[a-z]/.test(password)) {
            errors.password =
                "Password must contain at least one lowercase letter.";
        } else if (!/[0-9]/.test(password)) {
            errors.password = "Password must contain at least one number.";
        } else if (!/[!@#$%^&*]/.test(password)) {
            errors.password =
                "Password must contain at least one special character.";
        }

        return errors;
    };

    // const updateAlgoliRecord = async (email) => {
    //     try {
    //         setIsLoading(true);
    //         const response = await getUserByEmail(email);

    //         const record = {
    //             user_id: response?.user_id,
    //             caption: response?.caption,
    //             firstName: response?.firstName,
    //             lastName: response?.lastName,
    //             userImage: response?.userImage,
    //         };

    //         const { taskID } = await writeClient.saveObject({
    //             INDEX_NAME,
    //             body: record,
    //         });

    //         await writeClient.waitForTask({
    //             INDEX_NAME,
    //             taskID,
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const userValidation = async () => {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const formErrors = validateForm(email, password);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            setIsLoading(true);
            const response = await getUserByEmail(email);
            if (response.data?.email === email) {
                alert("User already exists, Please login");
                return;
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setIsLoading(false);
        }

        await saveUserData(email, password, firstName, lastName);
        //await updateAlgoliRecord(email);

        const user = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        };

        navigation("/login");
    };

    return (
        <div className="login-container">
            {isLoading && <Loader />}
            <div className="box-3">
                <div className="box-1-logo">
                    <img
                        src={instaLogo}
                        alt="instagram logo"
                        className="instagram-logo"
                    />
                </div>
                <div>
                    <input
                        className="input-box"
                        type="text"
                        id="email"
                        placeholder="Email address"
                    />
                    {errors.email && (
                        <p className="error-text">{errors.email}</p>
                    )}
                </div>
                <div>
                    <input
                        className="input-box"
                        type="password"
                        id="password"
                        placeholder="Password"
                    />
                    {errors.password && (
                        <p className="error-text">{errors.password}</p>
                    )}
                </div>
                <div>
                    <input
                        className="input-box"
                        type="text"
                        id="firstName"
                        placeholder="First Name"
                    />
                </div>
                <div>
                    <input
                        className="input-box"
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                    />
                </div>
                <div>
                    <p className="instruction">
                        People who use our service may have uploaded your
                        contact information to Instagram. Learn more
                    </p>
                </div>
                <div>
                    <p className="instruction">
                        By signing up, you agree to our <b>Terms</b>,{" "}
                        <b>Privacy Policy</b>, and <b>Cookies Policy</b>.
                    </p>
                    <div className="login-button-box">
                        <button
                            className="login-button"
                            onClick={userValidation}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
            <div className="box-2">
                <p className="account">
                    Have an account?
                    <span
                        className="sign-up-span"
                        onClick={() => navigation("/login")}
                    >
                        Log in
                    </span>
                </p>
            </div>
            <div className="get-app-box">
                <p>Get the app.</p>
            </div>
            <div className="app-store-google-play-box">
                <img
                    src={appStore}
                    alt="app store logo"
                    className="app-store-logo"
                />
                <img
                    src={googlePlay}
                    alt="google play logo"
                    className="google-play-logo"
                />
            </div>

            <div className="footer">
                <div className="footer-links">
                    <a href="#">Meta</a>
                    <a href="#">About</a>
                    <a href="#">Blog</a>
                    <a href="#">Jobs</a>
                    <a href="#">Help</a>
                    <a href="#">API</a>
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">Locations</a>
                    <a href="#">Instagram Lite</a>
                    <a href="#">Threads</a>
                    <a href="#">Contact uploading and non-users</a>
                    <a href="#">Meta Verified</a>
                </div>
                <div className="footer-bottom">
                    <span>English (UK)</span>
                    <span>© 2024 Instagram from Meta</span>
                </div>
            </div>
        </div>
    );
};

export default Signup;
