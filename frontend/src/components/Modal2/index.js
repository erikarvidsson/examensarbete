import React, { useState, useEffect } from "react";
import axios from "axios";

const Modal2 = (props) => {
  
  const [openModal, setOpenModal] = useState(false)

    const handleClose = () => {
      setOpenModal(false);
    };
    const handleShow = () => {
      setOpenModal(true);
    };

  useEffect(() => {

  },[])

  console.log(openModal)

  return (
    <>
    {!openModal && (
      <div onClick={() => {handleShow()}}> Öppna </div>
    )}
    {openModal && (
      <>
        <div onClick={() => {handleClose()}}> Stäng </div>
        
          {props.children}
        
      </>
    )}
    </>
  );
};

export default Modal2;
