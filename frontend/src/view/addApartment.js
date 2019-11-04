import React, { useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

const AddApatment = () => {
  const [adress, setAdress] = useState("Street");
  const [description, setDescription] = useState("information");
  const [img, setImg] = useState({});
  const [lastDate, setLastDate] = useState(new Date());

    console.log(img.name);
  const onAddApartment = e => {
    e.preventDefault();
    const data = {
      adress: adress,
      description: description,
      img: img.name,
      lastDate: lastDate
    };

    console.log(data);

    axios
      .post("http://localhost:5000/data/add", data, { credentials: "include" })
      .then(res => console.log(res.data));
  };

  return (
    <>
      <h1>Add a new apartment to listing</h1>
      <form>
        <label>Street name</label>
        <br />
        <input
          type="text"
          value={adress}
          onChange={e => {
            e.persist();
            setAdress(e.target.value);
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
        {/* <input
          type="text"
          value={img}
          onChange={e => {
            e.persist();
            setImg(e.target.value);
          }}
        /> */}
        <input
          type="file"
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
    </>
  );
};

export default AddApatment;
