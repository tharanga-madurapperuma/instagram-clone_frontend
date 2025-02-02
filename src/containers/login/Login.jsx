import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { getAllUsers } from "../../Api/UserApi";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { FaSquareFacebook } from "react-icons/fa6";

const Login = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // get Images from public
    const googlePlay = "/assets/google.png";
    const appStore = "/assets/apple.png";
    const instaLogo = "/assets/insta.png";
    const facebook = "/assets/fb.png";

    const [gUsers, setGUser] = useState();

    useEffect(() => {
        setIsLoading(true);
        const fetchUserData = async () => {
            try {
                const userResult = await getAllUsers();
                setGUser(await userResult.json());
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserData();

        // Initialize Facebook SDK
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: 1298521664790252,
                cookie: true,
                xfbml: true,
                version: "v16.0",
            });
        };

        // Load Facebook SDK
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
        setIsLoading(false);
    }, []);

    const userValidation = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${API_BASE_URL}/users/login`, {
                email: email,
                password: password,
            });
            if (response.data) {
                const token = response.data;
                console.log(token);
                localStorage.setItem("authToken", token);

                navigate("/");
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFacebookLogin = () => {
        window.FB.login(
            (response) => {
                if (response.status === "connected") {
                    const { accessToken } = response.authResponse;

                    // Send the accessToken to the backend for verification
                    axios
                        .post(`${API_BASE_URL}/users/facebook-login`, {
                            accessToken,
                        })
                        .then((res) => {
                            const { token } = res.data;

                            // Store the token and navigate to the homepage
                            localStorage.setItem("authToken", token);
                            navigate("/");
                        })
                        .catch((error) => {
                            console.error("Facebook login error:", error);
                            alert("Facebook login failed.");
                        });
                } else {
                    alert("User canceled login or did not fully authorize.");
                }
            },
            { scope: "public_profile,email" }
        );
    };

    return (
        <div className="login-container">
            {isLoading && <Loader />}
            <div className="box-1">
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Phone number, username, or email"
                    />
                </div>
                <div>
                    <input
                        className="input-box"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <div className="login-button-box">
                    <button className="login-button" onClick={userValidation}>
                        Log In
                    </button>
                </div>
                <div className="Limes-box">
                    <div className="line-1">
                        <div className="or-box">OR</div>
                    </div>

                    <div className="line-2"></div>
                </div>
                <div
                    className="fb-box cursor-pointer"
                    onClick={handleFacebookLogin}
                >
                    <FaSquareFacebook className="login-fb-icon" />
                    <p className="log-fb ">
                        <div className="fb-link">Log in with Facebook</div>
                    </p>
                </div>
                <div className="forgotten-password-box">
                    <p className="forgotten-password-link">
                        Forgotten your password?
                    </p>
                </div>
            </div>
            <div className="box-2">
                <p className="account">
                    Don't have an account?
                    <span
                        className="sign-up-span"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
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

export default Login;
