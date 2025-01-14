import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { getAllUsers } from "../../Api/UserApi";

const Login = () => {
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
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        gUsers?.map((GUser) => {
            if (GUser.email === email && GUser.password === password) {
                login = true;
                let loggedUser = JSON.stringify(GUser);
                localStorage.setItem("loggedUser", loggedUser);
                localStorage.setItem("userEmail", GUser.email);
                Navigation("/");
            } else if (GUser.email === email) {
                alert("Incorrect password");
            }
        });
        if (!login) {
            alert("User does not exist");
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
                        id="email"
                        placeholder="Phone number, username, or email"
                    />
                </div>
                <div>
                    <input
                        className="input-box"
                        type="password"
                        id="password"
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
                        onClick={() => Navigation("/signup")}
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
