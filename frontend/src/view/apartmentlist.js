import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import FormData from "form-data";
import axios from "axios";
import styled from "styled-components";

import { P, H3, Header } from "../components/typo";
import { Input, Button, Textarea } from "../components/Input";
import Modal from "../components/Modal";
import Modal2 from "../components/Modal2";
import EdditInput from "../components/EdditInput";
import Container from "../components/Container";

const Wrapper = styled.div`
  margin-top: 40px;
  form {
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
  }
`;
const ImgDiv = styled.div`
  width: 100vw;
  height: 300px;
  overflow: hidden;
  object-fit: cover;
  /* top: 0; */
  img {
    width: 100%;
  }
`;

const Img = styled.img`
  height: 100px;
`;

const DisplayBox = styled.div`
  height: 100px;
  /* width: 80vw;
  margin-top: 3%; */
  /* margin-bottom: 30px; */
  /* border-radius: 5px; */
  overflow: hidden;

  display: flex;
  img {
    width: 100%;
    overflow: hidden;
    object-fit: cover;
  }
  .imgBox {
    width: 40%;
  }
  div {
    width: 60%;
  }
`;

const ContentBox = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  height: 94%;
`;

const Apartmentlist = () => {
  const [apartments, setApartments] = useState([{}]);
  const [search, setSearch] = useState([{}]);
  const [noSearch, setNoSearch] = useState([]);
  // const [apartmentId, setApartmentId] = useState([{}]);

  const [adress, setAdress] = useState();
  const [description, setDescription] = useState();
  const [information, setInformation] = useState();
  const [img, setImg] = useState();
  const [lastDate, setLastDate] = useState(new Date());

  // const [modal, setModal] = useState();

  const user = sessionStorage.getItem("id");
  const admin = sessionStorage.getItem("admin");

  useEffect(() => {
    // if (apartments) {
      axios.get(`http://localhost:5000/data/`).then(res => {
        setApartments(res.data);
      });
    // }

    axios.get(`http://localhost:5000/SApt/`).then(res => {
      setSearch(res.data);
    });
  }, []);

  // useEffect(() => {
  //   haveSearchAppartment();
  // }, []);


  const data = {
    adress: adress,
    description: description,
    information: information,
    img: `${img ? img.name : "img"}`,
    lastDate: lastDate
  };

  const onUppdateApartment = (
    e,
    noAdress,
    noDescription,
    noInformation,
    noImg
  ) => {
    e.preventDefault();

    const data2 = {
      adress: `${adress ? adress : noAdress}`,
      description: `${description ? description : noDescription}`,
      information: `${information ? information : noInformation}`,
      img: `${img ? img.name : "img"}`,
      lastDate: lastDate
    };

    let apartmentId = sessionStorage.getItem("apartmentId");

    axios
      .post(`http://localhost:5000/data/update/${apartmentId}`, data2, {
        credentials: "include"
      })
      .then(res => {
        if (res) {
          console.log("uppdate sucessful");
        }
      })
      .then(() => {
        window.location.href = "/apartmentlist";
      });

    if (img && img !== noImg) {
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
        .then(res => console.log(res))
        .then(() => {window.location.href = "/apartmentlist"})
    } else {
      // window.location.href = "/apartmentlist";
    }
  };


  const searchApartment = dataId => {
    const search = {
      userId: sessionStorage.getItem("id"),
      dataId: dataId
    };

    axios
      .post("http://localhost:5000/SApt/add", search)
      .then(res => console.log(res))
      .then(() => {window.location.href = "/apartmentlist"});
  };

  return (
    <Container>
      <Header text="Våra lediga lägenheter" marginLeft="0"/>
      {apartments &&
        apartments
          .map(apartment => {
            // haveSearchAppartment(apartment._id);
            return (
              <Wrapper key={apartment._id}>
                <DisplayBox>
                  <div className="imgBox">
                    <Img
                      src={`http://localhost:5000/${apartment.img}`}
                      alt=""
                      key={apartment._id}
                    />
                  </div>
                  <div>
                    <H3
                      text={apartment.adress}
                      marginTop="0"
                      marginBottom="0"
                    ></H3>
                    <P
                      text={apartment.description}
                      marginTop="0"
                      fontSize="12px"
                    ></P>
                  </div>
                  <hr />
                </DisplayBox>
                <Modal2
                  text="Visa mer"
                  zIndex="999"
                  openText="View"
                  closeText="inherit"
                  // position="absolute"
                  width="100vw"
                  height="100vh"
                  top="0"
                  left="0"
                >
                  <ContentBox>
                    <ImgDiv>
                      <img
                        src={`http://localhost:5000/${apartment.img}`}
                        alt=""
                      />
                    </ImgDiv>
                    <Header
                      text={apartment.adress}
                      textAlign="center"
                      marginLeft="0"
                      marginRight="0"
                      fontSize="38px"
                    ></Header>
                    <P
                      fontWeight="bold"
                      text={apartment.description}
                      textAlign="center"
                      marginLeft="10%"
                    ></P>
                    <P
                      text={apartment.information}
                      marginBottom="34px"
                      marginLeft="10%"
                    >
                      {apartment.information}
                    </P>

                    {admin && (
                      <Modal position="absolute" zIndex="0" openText="Redigera">
                        <Header text="Uppdatera annonsen"></Header>
                        <EdditInput
                          data={data}
                          link={`data/${apartment._id}`}
                          apartmentId={apartment._id}
                        >
                          <form noValidate>
                            <label>Adress</label>
                            <br />
                            <Input
                              paddingTop="0"
                              type="text"
                              value={adress ? adress : apartment.adress}
                              placeholder={"New adress"}
                              onChange={e => {
                                e.persist();
                                setAdress(e.target.value);
                              }}
                            />
                            <br />
                            <label>Kort beskrivning</label>
                            <br />
                            <Input
                              paddingTop="0"
                              type="text"
                              value={
                                description
                                  ? description
                                  : apartment.description
                              }
                              placeholder={"New description"}
                              onChange={e => {
                                e.persist();
                                setDescription(e.target.value);
                              }}
                            />
                            <label>Information</label>
                            <br />
                            <Textarea
                              height="250px"
                              paddingTop="0"
                              type="text"
                              value={
                                information
                                  ? information
                                  : apartment.information
                              }
                              placeholder={"New description"}
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
                                required
                                className="inputfile"
                                type="file"
                                name="img"
                                id="img"
                                onChange={e => {
                                  e.persist();
                                  setImg(
                                    e.target.files[0]
                                      ? e.target.files[0]
                                      : apartment.img
                                  );
                                }}
                                required
                              />
                            </label>
                            <br />
                            <DatePicker
                              selected={lastDate}
                              onChange={setLastDate}
                              cd
                              adjustDateOnChange
                            />
                            <br />
                            <br />
                            <Button
                              text="uppdatera"
                              type="submit"
                              onClick={e =>
                                onUppdateApartment(
                                  e,
                                  apartment.adress,
                                  apartment.description,
                                  apartment.information,
                                  apartment.img
                                )
                              }
                            ></Button>
                          </form>
                        </EdditInput>
                      </Modal>
                    )}
                    {user && !admin && (
                      <>
                        {/* {console.log(haveSearchAppartment(apartment._id))} */}
                        <Button
                          text="Sök Lägenheten"
                          onClick={() => searchApartment(apartment._id)}
                        ></Button>
                        <div></div>
                      </>
                    )}
                  </ContentBox>
                </Modal2>
                {/* {console.log(user)} */}
              </Wrapper>
            );
          })
          .reverse()}
    </Container>
  );
};

export default Apartmentlist;
