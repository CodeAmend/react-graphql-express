import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Signout from './Signout';


const NavbarUnAuth = () => {
  return (
    <ul>
      <li><NavLink to="/" exact>Home</NavLink></li>
      <li><NavLink to="/signin">Signin</NavLink></li>
      <li><NavLink to="/signup">Signup</NavLink></li>
      <li><NavLink to="/search">Search</NavLink></li>
    </ul>
  )
}

const NavbarAuth = ({ user }) => {
  return (
    <Fragment>
      <ul>
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/search">Search</NavLink></li>
        <li><NavLink to="/recipe/add">Add Recipe</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li>
          <Signout />
        </li>
      </ul>

      <h2>Welcome, <strong>{user.username}</strong></h2>
    </Fragment>
  )
}

const Navbar = ({ session: { getCurrentUser } }) => {
  return (
    <nav>
      {getCurrentUser ? <NavbarAuth user={getCurrentUser} /> : <NavbarUnAuth />}
    </nav>
  );
};

export default Navbar;
