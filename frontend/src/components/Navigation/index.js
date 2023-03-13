import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import * as sessionActions from '../../store/session';
import './Navigation.css';
import SpotForm from '../SpotForm/SpotForm';
import OpenModalButton from './OpenModalButton';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  //   const dispatch = useDispatch();

  //   const logout = (e) => {
  //     e.preventDefault();
  //     dispatch(sessionActions.logout());
  //   };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='right-side'>
        <span id='create-span'>
          {/* <OpenModalButton
            buttonText="Create a spot"
            modalComponent={<SpotForm />}
          /> */}
          <NavLink to="/createSpot" className="create-link link">
            Create a new spot
          </NavLink>
        </span>
        <span className='dropButton'>
          <ProfileButton user={sessionUser} />
        </span>
        {/* <button onClick={logout}>Log Out</button> */}
      </div>
    );
  } else {
    sessionLinks = (
      <div className='right-side'>
        <NavLink to="/login" className="link">Log In</NavLink>
        <NavLink to="/signup" className="link">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <nav className='nav'>

      <div className='left-side'>
        <NavLink exact to="/" className="link">
          <i id="airbnb-logo" className="fa-brands fa-airbnb" autoCapitalize='off'>airbnb</i>
        </NavLink>
      </div>
      <div>
        {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
