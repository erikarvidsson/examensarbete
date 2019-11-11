import React, { useState } from "react";
import DatePicker from "react-datepicker";
import FormData from "form-data";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

import Container from "../components/Container";

const Test = () => {
  const [header, setHeader] = useState("Street");
  const [description, setDescription] = useState("information");
  const [img, setImg] = useState();
  const [lastDate, setLastDate] = useState(new Date());

  const onAddApartment = e => {
    e.preventDefault();

    console.log(img.name);
    const data = {
      header: header,
      description: description,
      img: img.name,
      lastDate: lastDate
    };

    console.log(data);

    axios
      .post("http://localhost:5000/index/add", data, { credentials: "include" })
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
      .post("http://localhost:5000/index/save", imgData, config)
      .then(res => console.log(res));
  };
  return (
    <Container>
      <h1>Add a new apartment to listing</h1>
      <form>
        <label>Street name</label>
        <br />
        <input
          type="text"
          value={header}
          onChange={e => {
            e.persist();
            setHeader(e.target.value);
          }}
        />
        <br />
        <label>Information</label>
        <br />
        <input
          type="text"
          value={description}
          onChange={e => {
            e.persist();
            setDescription(e.target.value);
          }}
        />
        <br />
        <label>Add images</label>
        <br />
        <input
          type="file"
          name="img"
          id="img"
          onChange={e => {
            e.persist();
            setImg(e.target.files[0]);
          }}
        />
        <br />
        <label>Last date to apply </label>
        <br />
        <DatePicker
          selected={lastDate}
          onChange={setLastDate}
          cd
          adjustDateOnChange
        />
        <br />
        <button onClick={e => onAddApartment(e)}>Submit</button>
      </form>
    </Container>
  );
};

export default Test;
