import React, { useEffect, useState } from "react";
import "./createPost.css";
import ReactModal from "react-modal";
import ProfileTemplate from "../../components/profile/ProfileTemplate";
import FileResizer from "react-image-file-resizer";
import { addPost } from "../../Api/PostApi";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { toast, ToastContainer, Zoom } from "react-toastify";

ReactModal.setAppElement("#root");

const CreatePost = ({ open, onClose, loggedUser }) => {
    // images from public folder
    const dragDrop = "/assets/icons/dragDrop.png";

    const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const [modelOpen, setModelOpen] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [file, setFile] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const unsuccessPost = () => {
        toast.error("Post Creation failed Failed!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Zoom,
        });
    };

    const successPost = () => {
        toast.info("Post Created Succesfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Zoom,
        });
    };

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
    const handleOnChange = async (e) => {
        e.preventDefault();
        const fileUpload = e.target.files[0];

        if (fileUpload && fileUpload.type.startsWith("image/")) {
            // resize the image
            try {
                const file = await resizeFile(fileUpload);

                setFile(file);
            } catch (error) {
                console.error("Error resizing the file:", error);
                alert("Failed to resize the image. Please try again.");
            }
        } else {
            setFile(null);
            alert("Please select image or video file");
        }
    };

    // After create post button clicked this method happens
    const handleClicked = async () => {
        if (!file) {
            alert("Please select a file");
            return;
        }

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("file", file); // Append the file with the key 'image'
            formData.append("upload_preset", "instagram-clone_posts");
            formData.append("cloud_name", { CLOUDINARY_CLOUD_NAME });
            const CLOUD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

            const response_cloudinary = await axios.post(CLOUD_URL, formData);

            // get file url from cloudinary and assign it to fileUrl
            const fileUrl = response_cloudinary.data.secure_url;

            await addPost({
                description: description,
                userId: loggedUser.user_id,
                likeCount: 0,
                imageUrl: fileUrl, // Use fileUrl here
            });

            setFile(null);
            setDescription("");
            onClose();
            await successPost();
            window.location.reload();
        } catch (error) {
            console.error("Error creating post:", error);
            unsuccessPost();
        } finally {
            setIsLoading(false);
        }
    };

    // File resizer
    const resizeFile = (file) =>
        new Promise((resolve, reject) => {
            // Determine output format based on the input file type
            const outputFormat = file.type === "image/png" ? "PNG" : "JPEG";

            FileResizer.imageFileResizer(
                file,
                1000, // Target width
                1000, // Target height
                outputFormat, // Dynamically set output format
                100, // Quality percentage
                0, // Rotation (0 degrees)
                (uri) => {
                    // Convert Base64 to File
                    const byteString = atob(uri.split(",")[1]);
                    const mimeString = uri.split(",")[0].match(/:(.*?);/)[1];
                    const arrayBuffer = new ArrayBuffer(byteString.length);
                    const uint8Array = new Uint8Array(arrayBuffer);

                    for (let i = 0; i < byteString.length; i++) {
                        uint8Array[i] = byteString.charCodeAt(i);
                    }

                    const blob = new Blob([uint8Array], { type: mimeString });
                    const resizedFile = new File([blob], file.name, {
                        type: mimeString,
                    });

                    resolve(resizedFile);
                },
                "base64", // Output type
                (error) => {
                    reject(error);
                }
            );
        });

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
            <ToastContainer />
            {isLoading && <Loader />}
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
                        <img src={dragDrop} alt="dragDrop" />
                        <p className="text-center">
                            Drag photos and video here
                        </p>
                        <label htmlFor="file-upload" className="text-center">
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
                    <div className="flex newPostImageContainer-wrapper">
                        <div className="newPostImageContainer ">
                            <img
                                className="newPostImage"
                                src={URL.createObjectURL(file)}
                                alt=""
                            />
                        </div>

                        <div className="newPostContainer flex flex-col w-[400px] h-full mt-5 ">
                            <div className="createPost-profile flex items-start w-full">
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
