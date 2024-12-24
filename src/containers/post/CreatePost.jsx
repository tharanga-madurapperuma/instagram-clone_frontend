import React, { useEffect, useState } from "react";
import "./createPost.css";
import Images from "../../assets/images";
import ProfileNameIcon from "../../components/profile/ProfileTemplatePost";
import ReactModal from "react-modal";
import axios from "axios";
import Data from "../../fetchData";
import ProfileTemplate from "../../components/profile/ProfileTemplate";

ReactModal.setAppElement("#root");

const CreatePost = ({ open, onClose, loggedUser }) => {
    const [modelOpen, setModelOpen] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [file, setFile] = useState("");
    const [description, setDescription] = useState("");

    // Use effect to handle open and close modal
    useEffect(() => {
        setModelOpen(open);
    }, [open]);

    // Drop handle
    const handleDrop = (e) => {
        e.preventDefault();
        if (isDragOver) {
            const droppedFile = e.dataTransfer.files[0];

            if (droppedFile.type.startsWith("image/")) {
                setFile(droppedFile);
            }
        } else {
            alert("Please select an image only");
        }
    };

    // Drag over handle
    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
        setIsDragOver(true);
    };

    // Drag leave handle
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    // On change handle for file input
    const handleOnChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (
            file &&
            (file.type.startsWith("image/") || file.type.startsWith("video/"))
        ) {
            setFile(file);
        } else {
            setFile(null);
            alert("Please select image or video file");
        }
    };

    // After create ost button clicked this method happens
    const handleClicked = async () => {
        if (!file) {
            alert("Please select a file");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("image", file); // Append the file with the key 'image'

            const fileUploadResponse = await axios.post(
                Data.fileStore.uploadPost,
                formData, // Send the FormData instance
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Required for file uploads
                    },
                }
            );

            // Use response.data directly for the next request
            const fileUrl = fileUploadResponse.data;

            const response = await axios.post(Data.posts.addPost, {
                description: description,
                userId: loggedUser.user_id,
                likeCount: 0,
                imageUrl: fileUrl, // Use fileUrl here
            });

            if (response.status === 201) {
                alert("Post created successfully!");
                setFile(null);
                setDescription("");
                onClose();
            }
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post. Please try again.");
        }
    };

    return (
        <ReactModal
            isOpen={modelOpen}
            onRequestClose={() => {
                setModelOpen(false);
                onClose();
            }}
            contentLabel="Create Post"
            className="modal"
            overlayClassName="overlay"
            shouldCloseOnOverlayClick={true}
        >
            <div className="flex flex-col items-center">
                <div className="mb-[8px]">
                    <h2 className="font-bold">Create New Post</h2>
                </div>
                <div className="h-[1px] w-full bg-gray-400"></div>
                {!file && (
                    <div
                        className="dragdrop flex flex-col justify-center items-center p-20"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        <img src={Images.dragDrop} alt="dragDrop" />
                        <p>Drag photos and video here</p>
                        <label htmlFor="file-upload">
                            Select from Computer
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            accept="image/*"
                            onChange={handleOnChange}
                        />
                    </div>
                )}
                {file && (
                    <div className="flex">
                        <div className="newPostImageContainer ">
                            <img
                                className="newPostImage"
                                src={URL.createObjectURL(file)}
                                alt=""
                            />
                        </div>

                        <div className="flex flex-col w-[400px] h-full mt-5">
                            <div className="flex items-start w-full">
                                <ProfileTemplate user={loggedUser} />
                            </div>
                            <textarea
                                rows={5}
                                className="w-full bg-slate-100 mt-5 p-5 post-textarea"
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            ></textarea>
                            <button
                                className="post-button align"
                                onClick={() => {
                                    handleClicked();
                                }}
                            >
                                Post
                            </button>
                            <p className="text-gray-500 text-xs mt-5">
                                &copy; instagram clone, developed by Tharanga
                                Madurapperuma, Rusiru Erandaka and Harshana
                                Rathnayaka.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </ReactModal>
    );
};

export default CreatePost;
