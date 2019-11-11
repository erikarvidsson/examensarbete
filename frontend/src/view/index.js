import React, { useState } from "react";
import axios from 'axios'

import Container from "../components/Container";
import Modal from "../components/Modal";
import Modal2 from "../components/Modal2";

const Index = () => {
  const [img, setImg] = useState();
  const [text, setText] = useState('');
  const [image, setImage] = useState();

  const onUpdateImage = e => {
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
  if (image) {
  }

  const updateValue = (test, e) => {
    test(e.target.value)
  }

  let username = sessionStorage.getItem("username");
  return (
    <Container>
      <Modal2>
        <form>
          <br />
          <label>Change header text</label>

          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={e => {
              updateValue(setText, e);
            }}
          />
          <br />
          <br />
          <label>Change header image</label>

          {/* <input
            type="file"
            name="img"
            id="img"
            onChange={e => {
              e.persist();
              setImg(e.target.files[0]);
            }}
          /> */}
          <br />
          <button onClick={e => onUpdateImage(e)}>Submit</button>
        </form>
      </Modal2>
      {/* <Modal2></Modal2> */}
      <h1>Hello {username ? username : "test"}</h1>
    </Container>
  );
};

export default Index;
