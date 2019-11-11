import React, { useState } from "react";
import styled from 'styled-components';

const Modal = props => {
  const [openModal, setOpenModal] = useState(false);

  console.log(openModal)

  const ModalBox = styled.div`
    .ModalContent {
      position: fixed;
      z-index: 9;
      top: 20%;
      background-color: white;
      width: 80vw;
      height: 30vh;
    }
    .openClose {
      position: relative;
      right: 10%;
      top: 10%;
      z-index: 10;
      text-align: right;
    }
  `;

  return (
    <ModalBox>
      {!openModal && (
        <div className="openClose" onClick={() => setOpenModal(!openModal)}>
          Öppna
        </div>
      )}
      {openModal && (
        <>
          <div className="openClose"  onClick={() => setOpenModal(!openModal)}>
            Stäng
          </div>
          <div className="ModalContent">{props.children}</div>
        </>
      )}
    </ModalBox>
  );
};

export default Modal;
