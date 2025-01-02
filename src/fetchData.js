const BASE_URL = "http://localhost:8080";
// const BASE_URL = "https://render-deploy-bm1c.onrender.com";

const Data = {
    users: {
        getAllUsers: `${BASE_URL}/users/getAllUsers`,
        getUserById: `${BASE_URL}/users/getUserById/`,
        addUser: `${BASE_URL}/users/addUser`,
        updateUser: `${BASE_URL}/users/updateUser/`,
        getUserByEmail: `${BASE_URL}/users/getUserByEmail/`,
        deleteUser: `${BASE_URL}/users/deleteUser/`,
        searchUser: `${BASE_URL}/users/searchUser/`,
        addLikes: `${BASE_URL}/users/addLikes/`,
        removeLikes: `${BASE_URL}/users/removeLikes/`,
    },
    posts: {
        getAllPosts: `${BASE_URL}/getAllPosts`,
        getPostById: `${BASE_URL}/getPostById/`,
        addPost: `${BASE_URL}/addPost`,
        incrementLikeCount: `${BASE_URL}/incrementLikes/`,
        decrementLikeCount: `${BASE_URL}/decrementLikes/`,
        getLikeCount: `${BASE_URL}/getLikeCount/`,
    },
    comments: {
        getAllComments: `${BASE_URL}/getAllComments`,
        getCommentById: `${BASE_URL}/getCommentById/`,
        addComment: `${BASE_URL}/addComment`,
    },
    fileStore: {
        uploadPost: `${BASE_URL}/uploadPost`,
        downloadPost: `${BASE_URL}/downloadPost/`,
        uploadStory: `${BASE_URL}/uploadStory`,
        downloadStory: `${BASE_URL}/downloadStory/`,
        uploadUser: `${BASE_URL}/uploadUser`,
        downloadUser: `${BASE_URL}/downloadUser/`,
    },
    mail: {
        sendMail: `${BASE_URL}/registration/`,
    },
    stories: {
        getAllStories: `${BASE_URL}/getAllStories`,
        getStoryById: `${BASE_URL}/getStoryById/`,
        addStory: `${BASE_URL}/addStory`,
        markedWatched: `${BASE_URL}/watchedStory/`,
    },
};

export default Data;
