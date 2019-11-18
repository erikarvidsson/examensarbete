import React, { useState } from "react";
import DatePicker from "react-datepicker";
import FormData from "form-data";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

import Container from "../components/Container";
import InputForm from "../components/InputForm";

const FormBox = styled.form`

`;

const ServiceNotification = () => {
  const [adress, setAdress] = useState("Street");
  const [description, setDescription] = useState("information");
  const [information, setInformation] = useState("information");
  const [img, setImg] = useState();
  const [lastDate, setLastDate] = useState(new Date());

  const onAddApartment = e => {
    e.preventDefault();

    console.log(img.name);
    const data = {
      userId: sessionStorage.getItem("id"),
      userName: sessionStorage.getItem("username"),
      adress: adress,
      description: description,
      information: information,
      img: img.name,
      lastDate: lastDate
    };

    console.log(data);

    axios
      .post("http://localhost:5000/data/add", data, { credentials: "include" })
      .then(res => console.log(res.data));

    const imgData = new FormData();
    imgData.append("filename", img.name);
    imgData.append("img", img, img.name);

    const config = {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data; boundary=${imgData._boundary}`
      }
    };

    axios
      .post("http://localhost:5000/data/save", imgData, config)
      .then(res => console.log(res));
  };
  return (
    <Container>
      <FormBox>
        <InputForm></InputForm>
      </FormBox>
    </Container>
  );
};

export default ServiceNotification;
