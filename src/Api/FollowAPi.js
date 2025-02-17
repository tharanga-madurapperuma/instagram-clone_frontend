import axios from "axios";
// Get BASE URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ##########################################
// MAIN FUNCTIONS FOR COMMENTS
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
        // if (error.code === "ERR_NETWORK" || error.response.status === 401) {
        //     localStorage.removeItem("authToken");
        // }
        console.log(error.response?.data || error.message);
        throw error; // Propagate the error to be handled in the calling function
    }
};

// ##########################################
// API ENDPOINTS FOR COMMENTS
// ##########################################

// API functions for get all comments
export const followUser = async (userId, followUserId) => {
    return await apiRequest("POST", `/followUser/${userId}/${followUserId}`);
};

export const unfollowUser = async (userId, followUserId) => {
    return await apiRequest(
        "DELETE",
        `/unfollowUser/${userId}/${followUserId}`
    );
};
