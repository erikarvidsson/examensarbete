import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {
  return (
    <ul>
      <li>
        <Link to="/">StartPage</Link>
        <Link to="/update">Update</Link>
        <Link to="/newApartment">New Apartment</Link>
      </li>
    </ul>
  );
}

export default NavBar;
