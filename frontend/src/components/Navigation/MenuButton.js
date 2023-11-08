import React, { useEffect, useState, useRef } from "react";
// import { useDispatch } from 'react-redux';
import './Navigation.css';
// import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AboutSect from "../AboutSect";

function MenuButton() {
    // const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    // const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const handleAbout = () => {
        setShowMenu(false);
    }

    // const logout = (e) => {
    //     e.preventDefault();
    //     dispatch(sessionActions.logout());

    //     history.push('/')
    // };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const shadowCl = showMenu ? " shadowCl" : "";

    return (
        <>
            <button onClick={openMenu} className={"profile-button" + shadowCl}>
                <div>
                    <i id='bar-icon' className="fa-solid fa-bars" />
                </div>
                <div>
                    <i id='user-icon' className="fas fa-user-circle fa-xl" />
                </div>
            </button>
            <div className={ulClassName + ' logoutDropDown' + " logoutDropDrown-div"} ref={ulRef}>
                <div className="logout-menu">
                    <li className="signup-button menu-buttons">
                        {/* turn this into a modal */}
                        <NavLink to="/login" className="link login-signup-link">Log In</NavLink>
                    </li>
                    <li className="signup-button menu-buttons">
                        {/* Turn this into a modal */}
                        <NavLink to="/signup" className="link login-signup-link">Sign Up</NavLink>
                    </li>
                    <li id="divider">
                        <hr color="d6d6d6" size="1"></hr>
                    </li>
                    <li className="about-li menu-buttons" onClick={handleAbout}>
                        {/* Turn this into a modal with all of the appropriate info */}
                        {/* <button className='about-button'>About</button> */}
                        {/* <OpenModalButton buttonText={"about"} component={AboutSect} buttonClass={'about-button'}/> */}
                        <AboutSect buttonClass={"about-button"} />
                    </li>
                </div>
            </div>
        </>
    );
}

export default MenuButton;
