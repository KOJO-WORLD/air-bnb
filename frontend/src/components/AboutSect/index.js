import { useEffect, useRef, useState } from "react"
import "./AboutSect.css"

const AboutSect = ({ buttonClass, menuClose }) => {
    // const AboutSect = () => {
    const [showAbout, setShowAbout] = useState(false)
    const ulRef = useRef()

    const openAbout = () => {
        if (showAbout) return;
        setShowAbout(true);
    };

    const clickCloseAbout = () => {
        setShowAbout(false);
    }

    // useEffect(() => {
    //     if (!showAbout) return;

    //     const closeAbout = (e) => {
    //         if (!ulRef.current.contains(e.target)) {
    //             setShowAbout(false);
    //         }
    //     };

    //     document.addEventListener('click', closeAbout);

    //     return () => document.removeEventListener("click", closeAbout);
    // }, [showAbout]);

    const ulClassName = "profile-dropdown" + (showAbout ? "" : " hidden");
    // const shadowCl = showMenu ? " shadowCl" : "";


    return (
        <>
            <button className={buttonClass} onClick={openAbout}><i class="fa-solid fa-circle-info"> </i> About</button>
            {/* <button className={buttonClass} onClick={openAbout}> */}
            {/* about */}
            {/* </button> */}
            <div className={ulClassName + " about-sect-background"}>
                <div className={ulClassName + " about-sect"}>
                    {/* <div> */}
                    <div className="about-top">
                        <h2 className="about-header">About</h2>
                        <h4 className="about-header">Developer: Laila Denman</h4>
                        <h4 className="about-header">Email: Lailadenman@gmail.com</h4>
                    </div>
                    <div className="about-links">
                        <div className="link-row1">
                            <a href="https://github.com/Lailadenman/Airbnb" target="_blank" className="about-link">Github Project Repo</a>
                            |
                            <a href="https://www.lailadenman.com/startbootstrap-agency-master/dist/index.html" target="_blank" className="about-link">Portfolio</a>
                        </div>
                        <div className="link-row2">
                            <a href="https://github.com/Lailadenman" target="_blank" className="about-link">Github</a>
                            |
                            <a href="https://drive.google.com/file/d/1lIofKBxHW164-QZ2CaJrd5lAY_RW5zim/view?usp=sharing" target="_blank" className="about-link">Resume</a>
                            |
                            <a href="https://www.linkedin.com/in/laila-denman/" target="_blank" className="about-link">LinkedIn</a>
                        </div>
                    </div>
                    <div className="about-close-div">
                        <button onClick={clickCloseAbout} className="about-close-button">close</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutSect
