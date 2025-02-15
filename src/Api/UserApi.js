import axios from "axios";
// Get BASE URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ##########################################
// MAIN FUNCTIONS FOR USERS
// ##########################################

// Function to get Authorization headers
const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
    };
};

// API request function for all
const apiRequest = async (method, endpoint, payload = {}) => {
    const headers = getAuthHeaders();

    try {
        const response = await axios({
            method, // HTTP method (GET, POST, PUT, etc.)
            url: `${API_BASE_URL}${endpoint}`,
            headers,
            data: payload, // For PUT, POST requests
        });
        console.log("API request successful:", response.data);

        return response.data;
    } catch (error) {
        if (error.code === "ERR_NETWORK" || error.response.status === 401) {
            localStorage.removeItem("authToken");
        }
        console.log(error.response?.data || error.message);
        throw error; // Propagate the error to be handled in the calling function
    }
};

// ##########################################
// API ENDPOINTS FOR USERS
// ##########################################

// API functions for get all users
export const getAllUsers = async () => {
    return await apiRequest("GET", "/users/getAllUsers");
};

// API functions for get user by ID
export const getUserById = async (userId) => {
    return await apiRequest("GET", `/users/getUserById/${userId}`);
};

// API functions for add user
export const addUser = async (user) => {
    return await apiRequest("POST", "/users/register", user);
};

// API functions for update user
export const updateUser = async (userId, user) => {
    return await apiRequest("PUT", `/users/updateUser/${userId}`, user);
};

// API functions for get user by email
export const getUserByEmail = async (email) => {
    return await apiRequest("GET", `/users/getUserByEmail/${email}`);
};

// API functions for delete user
export const deleteUser = async (userId) => {
    return await apiRequest("DELETE", `/users/deleteUser/${userId}`);
};

// API functions for search user
export const searchUser = async (name) => {
    return await apiRequest("GET", `/users/searchUser/${name}`);
};

// API functions for add likes
export const addLikes = async (userId, postId) => {
    return await apiRequest("POST", `/users/addLikes/${userId}/${postId}`);
};

// API functions for remove likes
export const removeLikes = async (userId, postId) => {
    return await apiRequest("DELETE", `/users/removeLikes/${userId}/${postId}`);
};

// API for send emails
export const sendMail = async (email) => {
    return await apiRequest("POST", `/registration/${email}`);
};

export const savePost = async (postId, userId) => {
    return await apiRequest("POST", `/users/savePost/${postId}/${userId}`);
};

export const getSavedPosts = async (userId) => {
    return await apiRequest("GET", `/users/getSavedPosts/${userId}`);
};
