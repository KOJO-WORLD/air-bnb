import { useEffect, useRef, useState } from "react"
import "./AboutSect.css"

const AboutSect = ({buttonClass, menuClose}) => {
// const AboutSect = () => {
    const [showAbout, setShowAbout] = useState(false)
    const ulRef = useRef()

    const openAbout = () => {
        if (showAbout) return;
        setShowAbout(true);
    };

    useEffect(() => {
        if (!showAbout) return;

        const closeAbout = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowAbout(false);
            }
        };

        document.addEventListener('click', closeAbout);

        return () => document.removeEventListener("click", closeAbout);
    }, [showAbout]);

    const ulClassName = "profile-dropdown" + (showAbout ? "" : " hidden");
    // const shadowCl = showMenu ? " shadowCl" : "";


    return (
        <>
            <button className={buttonClass} onClick={openAbout}>
                about
            </button>
            <div className={ulClassName +  " about-sect"}>
            {/* <div> */}
                <h2>About</h2>
                <h4>Creator: Laila Denman</h4>
                <h4>Email</h4>
                <h4>Repo</h4>
                <h4>Github</h4>
                <h4>Portfolio site</h4>
                <h4>Resume</h4>
                <h4>LinkedIn</h4>
                <button>close</button>
            </div>
        </>
    )
}

export default AboutSect
