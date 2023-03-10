import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import * as sessionActions from '../../store/session';
import './Navigation.css';
import SpotForm from '../SpotForm/SpotForm';

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
        <span>
          <NavLink to="/createSpot">
            Create a new spot
          </NavLink>
        </span>
        <span>
          <ProfileButton user={sessionUser} />
        </span>
        {/* <button onClick={logout}>Log Out</button> */}
      </div>
    );
  } else {
    sessionLinks = (
      <div className='right-side'>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <nav className='nav'>

      <div>
        <NavLink exact to="/">
          <i class="fa-brands fa-airbnb" autoCapitalize='off'>airbnb</i>
        </NavLink>
      </div>
      <div>
        {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
