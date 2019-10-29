import React, { useState } from "react";

const Modal = (props) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {!openModal && <div onClick={() => setOpenModal(!openModal)}>Öppna</div>}
      {openModal && (
        <>
          <div onClick={() => setOpenModal(!openModal)}>Stäng</div>
          {props.children}
        </>
      )}
    </>
  );
};

export default Modal;



