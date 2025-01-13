import api from "../../api"; // Adjust the path based on your project structure

const userValidation = async () => {
    try {
        const response = await api.post("/users/login", {
            email: email,
            password: password,
        });

        if (response.data) {
            const { token } = response.data;

            // Store the token in localStorage
            localStorage.setItem("authToken", token);
            localStorage.setItem("userEmail", email);

            // Redirect to home page
            navigate("/");
        } else {
            alert("Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Invalid email or password. Please try again.");
    }
};
