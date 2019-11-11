import React, { useState } from "react";
// import styled from "styled-components";

const Modal = props => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {!openModal && (
        <div className="button" onClick={() => setOpenModal(!openModal)}>
          Öppna
        </div>
      )}
      {openModal && (
        <div>
          <div>
            <div className="button" onClick={() => setOpenModal(!openModal)}>
              Stäng
            </div>
          </div>
            {props.children}
        </div>
      )}
    </>
  );
};

export default Modal;
