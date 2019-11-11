import React, { useState, useEffect } from "react";
import axios from "axios";
import useForm from "react-hook-form";
import styled from "styled-components";

import Container from "../components/Container";
import Modal from "../components/Modal";
import { P, H2, Header } from "../components/typo";

const Index = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const [img, setImg] = useState("");
  const [text, setText] = useState("");
  const [header, setHeader] = useState("");
  const [indexId, setIndexId] = useState("");

  const [image, setImage] = useState();
  const [indexData, setIndexData] = useState();
  const [lastDate, setLastDate] = useState(new Date());


  console.log(header);
  console.log(text);
  console.log(img);
  useEffect(() => {
    axios.get(`http://localhost:5000/index/`).then(res => {
      setIndexId(res.data[0]._id);
      setHeader(res.data[0].header);
      setText(res.data[0].description);
      setImg(res.data[0].img);
    });
  }, []);

  const imgs = (!img.name ? img : img.name)
  const data = {
    header: header,
    description: text,
    img: imgs,
    lastDate: lastDate
  };

  const onUppdateIndex = e => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/index/update/${indexId}`, data, {
        credentials: "include"
      })
      .then(res => {
        if (res) {
          console.log("uppdate sucessful");
        }
      });

    if (img.name) {
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
      // window.location.href = "/index";
    }
  };

  const ImgDiv = styled.div`
    width: 100%;
    height: 300px;
    overflow: hidden;
    object-fit: cover;
    /* top: 0; */
  `;

  let username = sessionStorage.getItem("username");
  return (
    <>
      <ImgDiv>
        <img src={`http://localhost:5000/${img}`} alt="" />
      </ImgDiv>
      <Container marginTop="20px">
        {username && (
          <Modal>
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
              <button type="submit" onClick={e => onUppdateIndex(e)}>
                Submit
              </button>
            </form>
          </Modal>
        )}
        <Header
          text={header}
          textAlign="center"
          width="76%"
          marginLeft="12%"
        ></Header>
        {username && (
          <Modal>
            <form>
              <br />
              <label>Change header text</label>

              <input
                type="text"
                name="text"
                id="text"
                value={header}
                ref={register}
                onChange={e => {
                  setHeader(e.target.value);
                }}
              />
              <button type="submit" onClick={e => onUppdateIndex(e)}>
                Submit
              </button>
            </form>
          </Modal>
        )}
        <H2 text={text} textAlign="center" width="76%" marginLeft="12%"></H2>

        {username && (
          <Modal>
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
                  setText(e.target.value);
                }}
              />
              <button type="submit" onClick={e => onUppdateIndex(e)}>
                Submit
              </button>
            </form>
          </Modal>
        )}
        {/* <H2
          text={`Hello ${username ? username : "test"}`}
          textAlign="center"
        ></H2> */}
      </Container>
    </>
  );
};

export default Index;
