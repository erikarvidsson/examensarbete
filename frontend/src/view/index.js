import React, { useState, useEffect } from "react";
import axios from "axios";
import useForm from "react-hook-form";
import styled from "styled-components";

import Container from "../components/Container";
import AddNews from "../components/AddNews";
import TopNews from "../components/TopNews";
import Modal from "../components/Modal";
import { P, H2, H3, Header } from "../components/typo";
import { Textarea, Input, Button } from "../components/Input";
import InputForm from "../components/InputForm";

const ImgDiv = styled.div`
  width: 100vw;
  height: 200px;
  overflow: hidden;
  object-fit: cover;
  /* top: 0; */
  div {
    position: absolute;
    width: 100vw;
    height: 200px;
    /* background-color: white;s */
    background-image: linear-gradient(transparent, white);
  }
  img {
    width: 100%;
  }
`;

const Hr = styled.hr`
  display: flex;
  align-content: center;
  width: 90vw;
  margin-left: 5vw;
`;

const ImgButton = styled.div`
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

  const imgs = !img.name ? img : img.name;
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
      window.location.href = "/";
    }
  };

  const username = sessionStorage.getItem("username");
  const admin = sessionStorage.getItem("admin");
  return (
    <>
      <ImgDiv>
        <div></div>
        <img src={`http://localhost:5000/${img}`} alt="" />
      </ImgDiv>
      <Container marginTop="10px">
        {username && admin && (
          <Modal position="absolute">
            <form>
              <br />
              <br />
              <ImgButton>
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
              </ImgButton>

              <br />
              <br />
              <Button
                text="Uppdatera"
                type="submit"
                onClick={e => onUppdateIndex(e)}
              >
              </Button>
            </form>
          </Modal>
        )}
        <H2
          text={header}
          textAlign="center"
          marginLeft="0"
          marginRight="0"
          width="100%"
        ></H2>
        {username && admin && (
          <Modal position="absolute">
            <form>
              <br />
              <label>Change header text</label>
              <br />
              <Textarea
                type="textarea"
                name="text"
                id="text"
                value={header}
                ref={register}
                onChange={e => {
                  setHeader(e.target.value);
                }}
              />
              <br />
              <br />
              <Button
                text="Uppdatera"
                type="submit"
                onClick={e => onUppdateIndex(e)}
              >
                Submit
              </Button>
            </form>
          </Modal>
        )}
        <P
          text={text}
          position="initial"
          textAlign="center"
          width="76%"
          marginLeft="12%"
        ></P>
        {username && admin && (
          <Modal position="absolute">
            <form>
              <br />
              <br />
              <label>Change header info</label>

              <Textarea
                height="150px"
                type="text"
                name="text"
                id="text"
                value={text}
                ref={register}
                onChange={e => {
                  setText(e.target.value);
                }}
              />
              <br />
              <Button
                text="Uppdatera"
                type="submit"
                onClick={e => onUppdateIndex(e)}
              >
                Submit
              </Button>
            </form>
          </Modal>
        )}
        <H2
          text="Nyheter"
          fontSize="30px"
          textAlign="center"
          marginLeft="0"
        ></H2>
        <Hr />
        <TopNews />

        {/* <InputForm /> */}
        {/* <H2
          text={`Hello ${username ? username : "test"}`}
          textAlign="center"
        ></H2> */}
      </Container>
    </>
  );
};

export default Index;
