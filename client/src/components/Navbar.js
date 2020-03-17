import React from 'react';
import { NavLink } from 'react-router-dom';


const NavbarUnauth = () => {
  return (
    <ul>
      <li><NavLink to="/" exact>Home</NavLink></li>
      <li><NavLink to="/signin">Signin</NavLink></li>
      <li><NavLink to="/signup">Signup</NavLink></li>
      <li><NavLink to="/recipe/search">Search</NavLink></li>
    </ul>
  )
}

const NavbarAuth = () => {
  return (
    <ul>
      <li><NavLink to="/" exact>Home</NavLink></li>
      <li><NavLink to="/recipe/search">Search</NavLink></li>
      <li><NavLink to="/recipe/add">Add Recipe</NavLink></li>
      <li><NavLink to="/profile">Profile</NavLink></li>
      <li>
        <button>Signout</button>
      </li>
    </ul>
  )
}

const Navbar = () => (
  <nav>
    <NavbarUnauth />
  </nav>
);

export default Navbar;
