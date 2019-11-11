import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  position: fixed;
  background-color: white;
  width: 100vw;
  height: 50px;
  left: 0;

  a {
    margin-left: 20px;
    margin-right: 20px;
  }
  .leftMenueItem{
    position: fixed;
    top: 15px;
      right: 0;
  }
`;

const NavBar = () => {
  const loggedin = document.cookie;

  console.log(loggedin);
  return (
    <Nav>
      <ul>
        <li>
          <Link to="/">StartPage</Link>
          {loggedin && (
            <>
              <Link to="/newApartment">New Apartment</Link>
              <Link to="/apartmentlist">Apartments</Link>
              <div className="leftMenueItem">
                <Link to="/logout">Logout</Link>
              </div>
            </>
          )}
          {!loggedin && (
            <>
              <Link to="/update">New Account</Link>
              <Link to="/apartmentlist">Apartments</Link>
              <div className="leftMenueItem">
                <Link to="/login">Login</Link>{" "}
              </div>
            </>
          )}
        </li>
      </ul>
    </Nav>
  );
};

export default NavBar;
