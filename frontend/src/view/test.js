import React from "react";
import Modal from "../components/Modal";
import InputForm from "../components/InputForm";

const Index = () => {
      function GetUserName() {
        var username = "<?php echo $_SESSION['username'] ?>";
        alert(username);
      } 
      GetUserName()
  return (
    <>
      <Modal>
        <InputForm/>
      </Modal>
    </>
  );
};

export default Index;