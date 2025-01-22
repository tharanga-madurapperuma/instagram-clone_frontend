import React, { useEffect } from "react";
import { DotLoader } from "react-spinners";
import "./Loader.css";
import ReactModal from "react-modal";

const Loader = ({}) => {
    const [isModalOpen, setIsModalOpen] = React.useState(true);

    return (
        <div className="loader">
            <ReactModal
                isOpen={isModalOpen}
                contentLabel="Watch Story"
                className="loader-content"
                overlayClassName="loader-overlay"
                shouldCloseOnOverlayClick={true}
            >
                <DotLoader
                    color="#3fa9d4"
                    loading={true}
                    size={40}
                    speedMultiplier={1}
                    className="loader-spinner"
                />
            </ReactModal>
        </div>
    );
};

export default Loader;
