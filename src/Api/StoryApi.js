import axios from "axios";
// Get BASE URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ##########################################
// MAIN FUNCTIONS FOR STORIES
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
// API ENDPOINTS FOR STORIES
// ##########################################

// API functions for get all stories
export const getAllStories = async () => {
    return await apiRequest("GET", "/getAllStories");
};

// API functions for get story by ID
export const getStoryById = async (storyId) => {
    return await apiRequest("GET", `/getStoryById/${storyId}`);
};

// API functions for add story
export const addStory = async (story) => {
    return await apiRequest("POST", "/addStory", story);
};

// API functions for marked watched
export const addWatchedUser = async (storyId, userId) => {
    return await apiRequest("POST", `/addWatchedUser/${storyId}/${userId}`);
};

export const getWatchedusers = async (storyId) => {
    return await apiRequest("GET", `/watchedStory/${storyId}`);
};

// API functions for delete story
export const deleteStory = async (storyId) => {
    return await apiRequest("DELETE", `/deleteStory/${storyId}`);
};
