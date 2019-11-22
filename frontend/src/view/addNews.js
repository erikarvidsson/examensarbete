import React from "react";
import "react-datepicker/dist/react-datepicker.css";

import Container from "../components/Container";
import { Header } from "../components/typo";
import AddNews from "../components/AddNews";


const AddApatment = () => {
  return (
    <Container>
      <Header text="Lägg till nyhet" marginLeft="0"></Header>
      <AddNews></AddNews>
    </Container>
  );
};

export default AddApatment;
