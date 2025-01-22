import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";

const Signup = () => {
    const navigation = useNavigate();
    const [gUser, setGUser] = useState();
    const [email, setEmail] = useState("");
    const instalogo = "/assets/insta.png";
    const googlwplay = "/assets/google.png";
    const appstore = "/assets/apple.png";

    const saveUserData = async (email, password, firstname, lastname) => {
        // Should be replaced with the actual API endpoint
        const response = await fetch("http://localhost:8080/users/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                firstname: firstname,
                lastname: lastname,
            }),
        });
        const data = await response.json();
        console.log(data);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            // Should be replaced with the actual API endpoint
            try {
                const response = await fetch(
                    "http://localhost:8080/users/getUserByEmail/{email}"
                );
                const data = await response.json();
                setGUser(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserData();
    }, [email]);

    const userValidation = async () => {
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            // Should be replaced with the actual API endpoint
            // Fetch user by email
            const response = await fetch(
                `http://localhost:8080/users/getUserByEmail/${email}`
            );
            if (response.ok) {
                const data = await response.json();
                if (data?.email === email) {
                    alert("User already exists, Please login");
                    return;
                }
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }

        // Save user if no existing user is found
        await saveUserData(email, password, firstname, lastname);

        const user = {
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
        };

        localStorage.setItem("userEmail", email);
        let loggedUser = JSON.stringify(user);
        localStorage.setItem("user", loggedUser);

        navigation("/");
    };

    return (
        <div className="login-container">
            <div className="box-3">
                <div className="box-1-logo">
                    <img
                        src={instalogo}
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
                </div>
                <div>
                    <input
                        className="input-box"
                        type="text"
                        id="password"
                        placeholder="Password"
                    />
                </div>
                <div>
                    <input
                        className="input-box"
                        type="text"
                        id="firstname"
                        placeholder="First Name"
                    />
                </div>
                <div>
                    <input
                        className="input-box"
                        type="text"
                        id="lastname"
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
                        <b>Privacy Policy</b> and <b>Cookies Policy</b>.
                    </p>
                </div>
                <div className="login-button-box">
                    <button className="login-button" onClick={userValidation}>
                        Sign up
                    </button>
                </div>
            </div>
            <div className="box-2">
                <div>
                    <p className="account">
                        Have an account?
                        <span
                            className="sign-up-span"
                            onClick={() => navigation("/")}
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
                        src={appstore}
                        alt="app store logo"
                        className="app-store-logo"
                    />
                    <img
                        src={googlwplay}
                        alt="google play logo"
                        className="google-play-logo"
                    />
                </div>
            </div>
        </div>
    );
};

export default Signup;
