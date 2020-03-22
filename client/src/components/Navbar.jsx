import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Signout from './Auth/Signout';

import styled from 'styled-components';

const Nav = styled.nav`
  text-align: center;
  padding-bottom: 0.2em;
  padding-top: 2em;
  background-color: #efefef;
  box-shadow: -3px 3px 10px 0px rgba(168, 168, 168, 0.7);

  ul {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    list-style: none;
  }
`;


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
    <Nav>
      {getCurrentUser ? <NavbarAuth user={getCurrentUser} /> : <NavbarUnAuth />}
    </Nav>
  );
};

export default Navbar;
