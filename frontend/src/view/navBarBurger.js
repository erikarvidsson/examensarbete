import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BurgerContainer = styled.div`
  /* background-color:  */
  width: 100vw;
  max-width: 375px;
  overflow: hidden;
  height: 70px;
  z-index: 199;
  border-bottom: 2px solid rgba(28, 76, 138, 0.5);
  hr {
    z-index: 199;
    height: 3px;
  }
  img {
    display: flex;
    height: 100%;
    margin: 0 auto;
  }
`;

const StyledBurger = styled.button`
  z-index: 199;
  position: absolute;
  top: 2.5%;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme }) => theme.primaryLight};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    background-color: ${({ open }) => (open ? "#fff" : "#1c4c8a")};
  }
`;

const StyledMenu = styled.nav`
  z-index: 99;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(+100vw)")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #1c4c8a;
  height: 100vh;
  width: 100vw;
  text-align: left;
  padding: 2rem;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  a {
    font-size: 1.4rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    /* color: ${({ theme }) => theme.primaryDark}; */
    color:  white;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color:  grey;
    }
  }
`;

const NavBarBurger = () => {
  const [open, setOpen] = useState();

  const loggedin = document.cookie;
  const admin = sessionStorage.getItem("admin");

  return (
    <BurgerContainer>
      <a href="/">
        <img src={`http://localhost:5000/km.png`} alt="" />
      </a>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <StyledMenu open={open}>
        <Link to="/" onClick={() => setOpen(!open)}>
          Hem
        </Link>
        {!admin && loggedin && (
          <>
            <Link to="/apartmentlist" onClick={() => setOpen(!open)}>
              Tillgängliga lägeneter
            </Link>
            <Link to="/serviceNotification" onClick={() => setOpen(!open)}>
              Serviceanmälan
            </Link>
            <Link to="/logout">Logga ut</Link>
          </>
        )}
        {admin && (
          <>
            <Link to="/apartmentlist" onClick={() => setOpen(!open)}>
              Tillgängliga lägeneter
            </Link>
            <hr />
            <Link to="/newApartment" onClick={() => setOpen(!open)}>
              Lägg till ledig lägenet
            </Link>
            <Link to="/addNews" onClick={() => setOpen(!open)}>
              Lägg till nyhet
            </Link>
            <Link to="/addAdmin" onClick={() => setOpen(!open)}>
              Lägg till Admin
            </Link>
            <hr />
            <Link to="/logout">Logga ut</Link>
          </>
        )}
        {!loggedin && (
          <>
            <Link to="/apartmentlist" onClick={() => setOpen(!open)}>
              Apartments
            </Link>
            <Link to="/update" onClick={() => setOpen(!open)}>
              New Account
            </Link>
            <div className="leftMenueItem">
              <Link to="/login" onClick={() => setOpen(!open)}>
                Login
              </Link>{" "}
            </div>
          </>
        )}
      </StyledMenu>
    </BurgerContainer>
  );
};

export default NavBarBurger;
