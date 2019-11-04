import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {
  const loggedin = document.cookie;

  console.log(loggedin)
  return (
    <ul>
      <li>
        <Link to="/">StartPage</Link>
        {loggedin && <>
          <Link to="/update">Update</Link>
          <Link to="/newApartment">New Apartment</Link>
          <Link to="/logout">Logout</Link>
          </>
        }
        {!loggedin && <>
          <Link to="/login">Login</Link>
        </>}
      </li>
    </ul>
  );
}

export default NavBar;
