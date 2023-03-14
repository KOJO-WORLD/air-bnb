import EditSpotForm from "../EditSpotForm/EditSpotForm";
import LoginFormPage from "../LoginFormPage";
import ReviewForm from "../ReviewForm/ReviewForm";
import SignupFormPage from "../SignUpFormPage";
import SpotForm from "../SpotForm/SpotForm";

const OpenModalButton = ({ buttonText, component }) => {
    // const [showModal, setShowModal] = useState(true);
    // const ulRef = useRef();

    let modalClass;

    const openModal = () => {
        modalClass = ''
    }

    const closeModal = () => {
        modalClass = ' hidden'
    }

    if (!component) {
        return null;
    }
    // let component;
    // switch (modal) {
    //     case 'login':
    //         component = <LoginFormPage />;
    //         break;
    //     case 'signup':
    //         component = <SignupFormPage />;
    //         break;
    //     case 'create':
    //         component = <SpotForm />;
    //     case 'update':
    //         component = <EditSpotForm />;
    //     case 'review':
    //         component = <ReviewForm />;
    //     default:
    //         return null;
    // }

    return (
        <>
            <button onClick={openModal}>
                {buttonText} check
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
