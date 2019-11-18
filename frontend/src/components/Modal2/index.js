import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalBox = styled.div`
  height: 0px;
  z-index: 99;
  .ModalContent {
    pointer-events: "none";
    position: ${props => props.positionContent || "fixed"};
    z-index: 9;
    top: ${props => props.top || "0"};
    left: ${props => props.left || "0"};
    background-color: white;
    width: ${props => props.width || "100vw"};
    height: ${props => props.height || "100vh"};
    z-index: 199;
  }
  .openClose {
    pointer-events: auto;
    height: 30px;
    width: 30px;
    background-color: white;
    border-radius: 15px;
    position: ${props => props.position || "relative"};
    left: 86%;
    top: 5%;
    z-index: 10;
    padding-top: 3px;
    text-align: center;
    padding-top: 3px;
    z-index: ${props => props.zIndex || '199'};
    h1 {
      font-size: 20px;
      -webkit-text-shadow: 0px 0px 29px 6px rgba(255, 255, 255, 0.33);
      -moz-text-shadow: 0px 0px 29px 6px rgba(255, 255, 255, 0.33);
      text-shadow: 1px 1px 2px white, 0 0 1em white, 0 0 0.2em white;
    }
  }
  .button {
    /* position: ${props => props.position || "fixed"}; */
    position: relative;
    width: 100vw; 
    text-align: center;
    margin-top: 10px;
    margin-bottom: 40px;
    /* color: #ccc; */

    h1 {
      font-size: 20px;
      -webkit-text-shadow: 0px 0px 29px 6px rgba(255, 255, 255, 0.33);
      -moz-text-shadow: 0px 0px 29px 6px rgba(255, 255, 255, 0.33);
      text-shadow: 1px 1px 2px white, 0 0 1em white, 0 0 0.2em white  ;
    }
  } 
`;

const Modal2 = props => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <ModalBox {...props}>
      {openModal && (
        <>
          <div className="ModalContent">
            <div
              position="absolute"
              className="openClose"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              X
            </div>

            {props.children}
          </div>
        </>
      )}
      <div
        className="button"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        {props.text}
      </div>
    </ModalBox>
  );
};

export default Modal2;
