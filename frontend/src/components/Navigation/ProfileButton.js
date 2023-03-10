import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import './Navigation.css';
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom";


function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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
                    <i id='user-icon'className="fas fa-user-circle" />
                </div>
                <div>
                    <i id='bar-icon' className="fa-solid fa-bars" />
                </div>
            </button>
            <ul className={ulClassName + ' dropDown'} ref={ulRef}>
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                <li>
                    <NavLink to='/spots/current' className="link">
                        Manage Spots
                    </NavLink>
                </li>
                <li>
                    <button onClick={logout}>Log Out</button>
                </li>
            </ul>
        </>
    );
}

export default ProfileButton;
