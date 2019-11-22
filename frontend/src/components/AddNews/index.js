import React, { useState } from "react";
import DatePicker from "react-datepicker";
import FormData from "form-data";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

// import { Teaxarea } from "../Input";
import { Textarea, Button } from "../Input";
import InputForm from "../InputForm";

const NewsContainer = styled.div`
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
const FormBox = styled.form`

`;

const AddNews = () => {
  const [title, setTitle] = useState("Street");
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
      title: title,
      description: description,
      information: information,
      img: img.name,
      lastDate: lastDate
    };

    console.log(data);

    axios
      .post("http://localhost:5000/news/add", data, { credentials: "include" })
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
      .post("http://localhost:5000/news/save", imgData, config)
      .then(res => console.log(res))
      .then(() => {
        window.location.href = "/";
      });
  };
  return (
    <NewsContainer>
      <FormBox>
        {/* <label>Street name</label> */}
        <br />
        <Textarea
          type="text"
          placeholder="Titel"
          // value={title}
          onChange={e => {
            e.persist();
            setTitle(e.target.value);
          }}
        />
        <br />
        {/* <label>Short description</label> */}
        <br />
        <Textarea
          type="text"
          placeholder="Ingress"
          // value={description}
          onChange={e => {
            e.persist();
            setDescription(e.target.value);
          }}
        />
        <br />

        {/* <label>Information</label>s */}
        <br />
        <Textarea
          placeholder="Information"
          height="140px"
          type="text"
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
        <br />
        <Button
          text="Lägg till nyhet"
          type="submit"
          onClick={e => onAddApartment(e)}
        ></Button>
      </FormBox>
    </NewsContainer>
  );
};

export default AddNews;
