import googlwplay from "../../assets/google.png";
import appstore from "../../assets/apple.png";
import instalogo from "../../assets/insta.png";
import facebook from "../../assets/fb.png";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { getAllUsers } from "../../Api/UserApi";
import axios from "axios"; 

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // get Images from public
    const googlePlay = "/assets/google.png";
    const appStore = "/assets/apple.png";
    const instaLogo = "/assets/insta.png";
    const facebook = "/assets/fb.png";

    const Navigation = useNavigate();
    const [gUsers, setGUser] = useState();
    var login = false;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResult = await getAllUsers();
                setGUser(await userResult.json());
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserData();
    }, []);

    const userValidation = async () => {
        try {
            const response = await axios.post("http://localhost:8080/users/login", {
                email: email,
                password: password,
            });

            if (response.data) {
                
                const { token } = response.data;

                
                localStorage.setItem("authToken", token);
                localStorage.setItem("userEmail", email);

                
                navigate("/");
            } else {
                
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="login-container">
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
                <div className="fb-box">
                    <img
                        src={facebook}
                        alt="facebook logo"
                        className="fb-logo"
                    />
                    <p className="log-fb">
                        <a className="fb-link" href="www.facebook.com">
                            Log in with Facebook
                        </a>
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
