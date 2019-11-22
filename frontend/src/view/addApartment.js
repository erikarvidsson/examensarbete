import React, { useState } from "react";
import DatePicker from "react-datepicker";
import FormData from "form-data";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

import Container from "../components/Container";
import { Textarea, Button } from "../components/Input";
import { H2, Header } from "../components/typo";

const FormBox = styled.form`
  .inputfile {
    display: none;

  }
  .inputfileLabel {
    height: 51px;
    width: 328px;
    border-radius: 100px;
    padding: 14px 30px;
    background-color: white;
    box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

`;

const AddApatment = () => {
  const [adress, setAdress] = useState("Street");
  const [description, setDescription] = useState("information");
  const [information, setInformation] = useState("information");
  const [img, setImg] = useState();
  const [lastDate, setLastDate] = useState(new Date());

  const onAddApartment = e => {
    e.preventDefault();

    const data = {
      userId: sessionStorage.getItem("id"),
      userName: sessionStorage.getItem("username"),
      adress: adress,
      description: description,
      information: information,
      img: img.name,
      lastDate: lastDate
    };

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
      window.location.href = "/apartmentlist";
  };
  return (
    <Container>
      <Header text="Dela en ny lägenhet" marginLeft="0"></Header>
      <FormBox>
        <br />
        <label>{/* <H2>Adress</H2> */}</label>
        <Textarea
          type="text"
          placeholder="Adress"
          // value={adress}
          onChange={e => {
            e.persist();
            setAdress(e.target.value);
          }}
        />
        <br />
        {/* <label>Kort beskrivning</label> */}
        <br />
        <Textarea
          type="text"
          placeholder="Kort beskrivning"
          // value={description}
          onChange={e => {
            e.persist();
            setDescription(e.target.value);
          }}
        />
        <br />

        {/* <label>Information</label> */}
        <br />
        <Textarea
          height="150px"
          type="text"
          placeholder="Information"
          // value={information}
          onChange={e => {
            e.persist();
            setInformation(e.target.value);
          }}
        />
        <br />
        <br />
        <label className="inputfileLabel">
          Välj bild
          <br />
          <input
            className="inputfile"
            type="file"
            name="img"
            id="img"
            onChange={e => {
              e.persist();
              setImg(e.target.files[0]);
            }}
          />
        </label>
        <br />
        <label>Senaste ansökningsdagen</label>
        <br />
        <DatePicker
          selected={lastDate}
          onChange={setLastDate}
          cd
          adjustDateOnChange
        />
        <br />
        <Button
          text="Lägg till lägenhet"
          type="submit"
          onClick={e => onAddApartment(e)}
        />
      </FormBox>
    </Container>
  );
};

export default AddApatment;
