import React, { useState } from "react";
import axios from 'axios'
import useForm from "react-hook-form";

import Container from "../components/Container";
import Modal from "../components/Modal";
import { P, H2, Header } from "../components/typo";
// import Modal2 from "../components/Modal2";

const Index = () => {
  const [textModal, setTextModal] = useState(false)

  const { register, handleSubmit, watch, errors } = useForm();

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

  const onUpdateTitle = e => {
  const data = {
    title: text
  };

    axios
      .post(`http://localhost:5000/data/index/save`, data, {
        credentials: "include"
      })
      .then(res => {
        if (res) {
          console.log("uppdate sucessful");
        }
      });
  };


  const updateValue = (test, e) => {
    test(e.target.value)
  }

  let username = sessionStorage.getItem("username");
  return (
    <Container>
      <div
        onClick={() => {
          setTextModal(!textModal);
        }}
      >
        Eddit header
      </div>
      {textModal && (
        <div>
          <form>
            <br />
            <label>Change header text</label>

            <input
              type="text"
              name="text"
              id="text"
              value={text}
              ref={register}
              onChange={e => {
                updateValue(setText, e);
              }}
            />
            <button type="submit" onClick={e => onUpdateTitle(e)}>
              Submit
            </button>
          </form>
        </div>
      )}

      <form>
        <br />
        <br />
        <label>Change header image</label>

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
        <button type="submit" onClick={e => onUpdateImage(e)}>
          Submit
        </button>
      </form>
      {/* <Modal2></Modal2> */}
      <H2 text={`Hello ${username ? username : "test"}`} textAlign="center"></H2>
    </Container>
  );
};

export default Index;
