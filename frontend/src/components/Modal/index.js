import React, { useState } from "react";

import styled from "styled-components";

const ModalBox = styled.div`
  .ModalContent {
    position: ${props => props.positionContent || "fixed"};
    z-index: 9;
    top: ${props => props.top || "0"};
    left: ${props => props.left || "0"};
    background-color: white;
    /* width: 80vw; */
    width: ${props => props.width || "100vw"};
    height: ${props => props.height || "100vh"};
    /* margin-left: 10vw; */
    border-radius: 25px;
  }
  .openClose {
    position: ${props => props.position || "relative"};
    right: 4%;
    top: 10%;
    z-index: ${props => props.zIndex || '10' };
    text-align: right;
    padding-top: 20px;
    /* color: #ccc; */
    h1 {
      font-size: 20px;
      -webkit-text-shadow: 0px 0px 29px 6px rgba(255, 255, 255, 0.33);
      -moz-text-shadow: 0px 0px 29px 6px rgba(255, 255, 255, 0.33);
      text-shadow: 1px 1px 2px white, 0 0 1em white, 0 0 0.2em white;
    }
  }

`;

const Modal = props => {
  const [openModal, setOpenModal] = useState(false);

  if(props.modal){
    let newPath = props.modal
    window.location.href = { newPath };
  }

  // console.log(openModal);

  return (
    <ModalBox {...props}>
      {!openModal && (
        <div className="button" onClick={() => setOpenModal(!openModal)}>
          <h1>{props.openText ? props.openText : " Öppna"}</h1>
      
        </div>
      )}
      {openModal && (
        <>
          <div className="openClose" onClick={() => setOpenModal(!openModal)}>
            <h1>{props.closeText ? props.closeText : "Stäng"}</h1>
          
          </div>
          <div className="ModalContent">{props.children}</div>
        </>
      )}
    </ModalBox>
  );
};

export default Modal;
