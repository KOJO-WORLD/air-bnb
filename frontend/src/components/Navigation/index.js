import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import MenuButton from './MenuButton';
// import * as sessionActions from '../../store/session';
import './Navigation.css';
// import SpotForm from '../SpotForm/SpotForm';
// import OpenModalButton from './OpenModalButton';

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
          <NavLink to="/createSpot" className="create-link link">
            Airbnb your home
          </NavLink>
        </span>
        <span className='dropButton'>
          <ProfileButton user={sessionUser} />
        </span>
      </div>
    );
  } else {
    sessionLinks = (
      <div className='right-side'>
        <span id='create-span'>
          <NavLink to="/login" className="create-link link">
            Airbnb your home
          </NavLink>
        </span>
        <span className='dropButton'>
          <MenuButton />
        </span>
      </div>
    );
  }

  return (
    <nav className='nav'>

      <div className='left-side'>
        <NavLink exact to="/" className="link home-link">
          <span className='logo-button'><i id="airbnb-logo" className="fa-brands fa-airbnb"></i><p className='home-airbnb'>airbnb</p></span>
        </NavLink>
      </div>
      <div>
        {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
