import axios from "axios";
// Get BASE URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ##########################################
// MAIN FUNCTIONS FOR POSTS
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
            //localStorage.removeItem("authToken");
            //window.location.reload();
        }
        console.log(error.response?.data || error.message);
        throw error; // Propagate the error to be handled in the calling function
    }
};

// ##########################################
// API ENDPOINTS FOR POSTS
// ##########################################

// API functions for get all posts
export const getAllPosts = async () => {
    return await apiRequest("GET", "/getAllPosts");
};

// API functions for get post by ID
export const getPostById = async (postId) => {
    return await apiRequest("GET", `/getPostById/${postId}`);
};

export const getPostsByUserId = async (userId) => {
    return await apiRequest("GET", `/getPostByUserId/${userId}`);
};

// API functions for add post
export const addPost = async (post) => {
    return await apiRequest("POST", "/addPost", post);
};

// API functions for increment like count
export const incrementLikeCount = async (postId) => {
    return await apiRequest("POST", `/incrementLikes/${postId}`);
};

// API functions for decrement like count
export const decrementLikeCount = async (postId) => {
    return await apiRequest("POST", `/decrementLikes/${postId}`);
};

// API functions for get like count
export const getLikeCount = async (postId) => {
    return await apiRequest("GET", `/getLikeCount/${postId}`);
};

// API functions for delete post
export const deletePost = async (postId) => {
    return await apiRequest("DELETE", `/deletePost/${postId}`);
};

// API functions for edit post
export const editPost = async (postId, post) => {
    return await apiRequest("PUT", `/editPost/${postId}`, post);
};
