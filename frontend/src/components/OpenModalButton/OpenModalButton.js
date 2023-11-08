import EditSpotForm from "../EditSpotForm/EditSpotForm";
import LoginFormPage from "../LoginFormPage";
import ReviewForm from "../ReviewForm/ReviewForm";
import SignupFormPage from "../SignUpFormPage";
import SpotForm from "../SpotForm/SpotForm";
import { useEffect, useRef, useState } from "react"

const OpenModalButton = ({ buttonText, component, buttonClass }) => {
    const [showModal, setShowModal] = useState(true);
    const ulRef = useRef();

    let modalClass;

    const openModal = () => {
        // modalClass = ''
        console.log("about was clicked");
        if (showModal) return;
        setShowModal(true);
    }

    const closeModal = () => {
        // modalClass = ' hidden'
        if (!showModal) return;
        setShowModal(false)
    }

    if (!component) {
        return null;
    }

    if (!buttonClass) {
        return "";
    }

    modalClass = "modal" + (showModal ? "" : " hidden");

    return (
        <>
            <button onClick={openModal} className={buttonClass}>
                {buttonText}
            </button>
            <div className={"modal-background" + modalClass} onClick={closeModal}>
                <div className="modal-child" onClick={e => e.stopPropagation()}>
                    {component}
                </div>
            </div>
        </>
    );
}

export default OpenModalButton;
