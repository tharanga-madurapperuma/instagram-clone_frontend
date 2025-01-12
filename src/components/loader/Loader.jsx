import React, { useEffect } from "react";
import { HashLoader } from "react-spinners";
import "./Loader.css";
import ReactModal from "react-modal";

const Loader = ({ loading }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(true);

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                setIsModalOpen(false);
            }, 1000);
        }
    }, [loading]);

    return (
        <div className="loader">
            <ReactModal
                isOpen={isModalOpen}
                contentLabel="Watch Story"
                className="loader-content"
                overlayClassName="loader-overlay"
                shouldCloseOnOverlayClick={true}
            >
                <HashLoader
                    color="#3fa9d4"
                    loading={loading}
                    size={75}
                    speedMultiplier={1}
                />
            </ReactModal>
        </div>
    );
};

export default Loader;