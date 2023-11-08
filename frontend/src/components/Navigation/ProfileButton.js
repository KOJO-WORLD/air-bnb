import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import './Navigation.css';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from "react-router-dom";
import AboutSect from "../AboutSect";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());

        history.push('/')
    };

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
            <div className={ulClassName + ' dropDown' + " dropDrown-div"} ref={ulRef}>
                <div className="signed-menu">
                    <li className="info menu-buttons login-button">
                        <div>
                            Hello, {user.firstName} {user.lastName} ({user.username})
                        </div>
                        <div>{user.email}</div>
                    </li>
                    <li id="divider">
                        <hr color="d6d6d6" size="1"></hr>
                    </li>
                    <li className="info menu-buttons">
                        <NavLink to='/spots/current' className="link">
                            Manage Spots
                        </NavLink>
                    </li>
                    {/* <li className="info">
                        <NavLink to='/spots/current' className="link">
                            Wishlist
                        </NavLink>
                    </li> */}
                    <li id="divider">
                        <hr color="d6d6d6" size="1"></hr>
                    </li>
                    <li className="signup-button menu-buttons">
                        {/* Turn this into a modal with all of the appropriate info */}
                        <AboutSect buttonClass={"about-button"} />
                        {/* <button className='about-button'><i class="fa-solid fa-circle-info"> </i> About</button> */}
                    </li>
                    <li className="menu-buttons logout-li">
                        <button onClick={logout} className="about-button">Log Out</button>
                    </li>
                </div>
            </div>
        </>
    );
}

export default ProfileButton;
