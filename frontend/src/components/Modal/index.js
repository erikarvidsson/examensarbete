import React, { useState } from "react";

const Modal = props => {
  const [openModal, setOpenModal] = useState(false);

  console.log(openModal)

  return (
    <div>
      {!openModal && <div onClick={() => setOpenModal(!openModal)}>Öppna</div>}
      {openModal && (
        <div>
          <div onClick={() => setOpenModal(!openModal)}>Stäng</div>
          {props.children}
        </div>
      )}
    </div>
  );
};

export default Modal;
