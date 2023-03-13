import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import './Navigation.css';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory();

    const openMenu = () => {
        // console.log('clicked!');
        // console.log('old menu', showMenu);
        if (showMenu) return;
        setShowMenu(true);
        // console.log('new menu', showMenu);
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

    return (
        <>
            <button onClick={openMenu} className="profile-button">
                <div>
                    <i id='user-icon' className="fas fa-user-circle" />
                </div>
                <div>
                    <i id='bar-icon' className="fa-solid fa-bars" />
                </div>
            </button>
            <div className={ulClassName + ' dropDown' + " dropDrown-div"} ref={ulRef}>
                <ul>
                    <li className="info">Hello, {user.firstName} {user.lastName} ({user.username})</li>
                    {/* <li>{user.username}</li> */}
                    <li className="info">{user.email}</li>
                    <li id="divider">
                        <i>——————————————</i>
                    </li>
                    <li className="info">
                        <NavLink to='/spots/current' className="link">
                            Manage Spots
                        </NavLink>
                    </li>
                    <li id="divider">
                        <i>——————————————</i>
                    </li>
                    <li>
                        <button onClick={logout} id='log-out-button'>Log Out</button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default ProfileButton;
