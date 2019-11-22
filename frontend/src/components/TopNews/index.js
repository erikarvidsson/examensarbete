import React, { useState, useEffect } from "react";
import FormData from "form-data";
import axios from "axios";
import styled from "styled-components";
import { Header, H2, H3 } from "../typo";
import Modal2 from "../Modal2";

// import Modal from "../components/Modal";
// import EdditInput from "../components/EdditInput";
// import Container from "../components/Container";

const NewsBox = styled.div`
  /* margin-left: 20px; */
  /* width: 400px; */
  flex-shrink: 0;
  height: 100%;
  margin-bottom: 44px;
  img {
    width: 100%;
    height: 150px;
  }
`;
const OpenNewsBox = styled.div`
  /* margin-left: 20px; */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9;
  scroll-snap-align: start;

  .openImg {
    width: 100vw;
    height: 40vh;
  }
`;
const TopNewsBox = styled.div`
  scroll-snap-type: x mandatory;
  width: 300px;
  height: 100%;
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-left: 10vw;
  width: 80vw;
  margin-top: 3%;
  border-radius: 5px;
  margin-bottom: 100px;
  background-color: white;
  -webkit-box-shadow: 0px 0px 15px -6px rgba(0, 0, 0, 0.77);
  -moz-box-shadow: 0px 0px 15px -6px rgba(0, 0, 0, 0.77);
  box-shadow: 0px 0px 15px -6px rgba(0, 0, 0, 0.77);

  display: flex;
  img {
    scroll-snap-align: start;
    width: 100%;
    overflow: hidden;
    object-fit: cover;
  }
  .imgBox {
    width: 40%;
  }
  div {
    width: 100%;
  }
`;

const TopNews = () => {
  const [news, setNews] = useState([{}]);
  // const [apartmentId, setApartmentId] = useState([{}]);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [information, setInformation] = useState();
  const [img, setImg] = useState("false");
  const [lastDate, setLastDate] = useState(new Date());

  const username = sessionStorage.getItem("username");

  useEffect(() => {
    axios.get(`http://localhost:5000/news/`).then(res => {
      setNews(res.data);
    });
  }, []);

  const data = {
    title: title,
    description: description,
    information: information,
    img: img.name,
    lastDate: lastDate
  };

  const onUppdateApartment = e => {
    e.preventDefault();

    let apartmentId = sessionStorage.getItem("apartmentId");

    axios
      .post(`http://localhost:5000/news/update/${apartmentId}`, data, {
        credentials: "include"
      })
      .then(res => {
        if (res) {
          console.log("uppdate sucessful");
        }
      });

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
      .then(res => console.log(res));
    window.location.href = "/apartmentlist";
  };

  return (
    <TopNewsBox>
      {news &&
        news
          .reverse()
          .slice(0, 3)
          .map(news => {
            return (
              <>
                <NewsBox>
                  <img src={`http://localhost:5000/${news.img}`} alt="" />
                  <H2
                    text={news.title}
                    textAlign="center"
                    fontSize="30px;"
                    marginLeft="0"
                  ></H2>
                  <H3 text={news.description} marginLeft="0" textAlign="center"></H3>
                  <Modal2
                    marginTop="10px;"
                    buttonMT="30px"
                    positionContent="fixed"
                    position="relative"
                    top="0"
                    left="0"
                    buttonWidth="100%"
                    buttonMB="0"
                    height="100vh"
                    text="Läs mer"
                  >
                    <OpenNewsBox>
                      <img
                        className="openImg"
                        src={`http://localhost:5000/${news.img}`}
                        alt=""
                      />
                      <H2
                        text={news.title}
                        marginLeft="0"
                        textAlign="center"
                      ></H2>
                      <H3
                        text={news.description}
                        fontWeight="bold"
                        fontSize="26px"
                        textAlign="center"
                        marginLeft="0"
                        marginRight="0"
                        paddingLeft="10px"
                        paddingRight="10px"
                      ></H3>
                      <H3
                        text={news.information}
                        marginLeft="0"
                        marginRight="0"
                        paddingLeft="10px"
                        paddingRight="10px"
                      ></H3>
                    </OpenNewsBox>
                  </Modal2>
                </NewsBox>
              </>
            );
          })}
    </TopNewsBox>
  );
};

export default TopNews;
