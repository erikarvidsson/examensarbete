import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  position: fixed;
  background-color: #1c4c8a;
  width: 100vw;
  height: 60px;
  left: 0;
  color: white;

  ul {
    position: fixed;
    list-style-type: none;
    width: 93%;
    top: 16px;
  }

  a {
    margin-left: 20px;
    margin-right: 20px;
  }
  .leftMenueItem {
    position: fixed;
    top: 22px;
    right: 0;
  }
`;

const NavBar = () => {
  const loggedin = document.cookie;
  const admin = sessionStorage.getItem("admin");

  return (
    <Nav>
      <ul>
        <li>
          <Link to="/">StartPage</Link>
          {loggedin && (
            <>
              <Link to="/apartmentlist">Apartments</Link>
              <Link to="/serviceNotification">Service Notification</Link>
              <div className="leftMenueItem">
                <Link to="/logout">Logout</Link>
              </div>
            </>
          )}
          {loggedin && admin && (
            <>
              <Link to="/newApartment">New Apartment</Link>
            </>
          )}
          {!loggedin && (
            <>
              <Link to="/apartmentlist">Apartments</Link>
              <Link to="/update">New Account</Link>
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
