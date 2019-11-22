import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import { P, H3, Header } from "../components/typo";
import { Input, Button, Textarea } from "../components/Input";
import Container from "../components/Container";
import Modal from "../components/Modal";
import Modal2 from "../components/Modal2";

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
  margin-bottom: 30px;
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


const SearchedApartments = (props) => {
  const [apartments, setApartments] = useState([{}]);
  const [search, setSearch] = useState([{}]);
  const [serachApts, setSerachApts] = useState([{}]);

  const user = sessionStorage.getItem("id");


  useEffect(() => {
    axios.get(`http://localhost:5000/data/`).then(res => {
      setApartments(res.data);
    });

    axios.get(`http://localhost:5000/SApt/`).then(res => {
      setSearch(res.data);
    });
  }, []);

  const getApartments = () => {
    return search.map(sapt => {
      if (sapt.userId === user) {
        return true;
      } else {
        return false;
      }
    });
  };

    const getApartmentData = () => {
      return apartments.map(aptdata => {
        if (
          aptdata._id ===
          search.map(sapt => {
            return sapt.dataId;
          })
        ) {
          return true;
        } else {
          return false;
        }
      });
    };

  const finalarray = [];

  const compare = (a, b) => {
    a.forEach(e1 => { b.forEach((e2) => {
      if(e1._id === e2.dataId){
        finalarray.push(e1)
      }
    })
    setSerachApts(finalarray);
    });
  }
  
  useEffect(() => {
    setSearch(getApartments());
    setApartments(getApartmentData());
  }, []);

  useEffect(() => {
    compare(apartments, search);
  }, [apartments, search]);

  console.log(serachApts);

  const haveSearchAppartment = dataId => {
    axios.get(`http://localhost:5000/SApt/${dataId}`).then(res => {
      if (res.data && res.data.userId === user) {
        // setNoSearch(noSearch => [...noSearch, res.data.dataId]);
        console.log(res.data);
        return true;
      } else {
        return false;
      }
    });
    // .then(res => setNoSearch([...noSearch, res.data]));
  };

  const deleteSearch = (dataId) => {
    // console.log(dataId)
    const id = {dataId}
    console.log(id)
    axios
      .delete(`http://localhost:5000/SApt/${id.dataId}`)
      .then(res => console.log(res))
      .then(() => {window.location.href = "/sapts"});

  };

  const searchApartment = dataId => {
    const search = {
      userId: sessionStorage.getItem("id"),
      dataId: dataId
    };

    axios
      .post("http://localhost:5000/SApt/add", search)
      .then(res => console.log(res));
    // window.location.href = "/apartmentlist";
  };

  return (
    <Container>
      <Header text="Sökta lägenheter" marginLeft="0" />
      {serachApts.map(sapt => {
        return (
          <Wrapper>
            <DisplayBox>
              <div className="imgBox">
                <Img
                  src={`http://localhost:5000/${sapt.img}`}
                  alt=""
                  key={sapt._id}
                />
              </div>
              <div>
                <H3 text={sapt.adress} marginTop="0" marginBottom="0"></H3>
                <P text={sapt.description} marginTop="0" fontSize="12px"></P>
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
                  <img src={`http://localhost:5000/${sapt.img}`} alt="" />
                </ImgDiv>
                <Header
                  text={sapt.adress}
                  textAlign="center"
                  marginLeft="0"
                  marginRight="0"
                ></Header>
                <P
                  fontWeight="bold"
                  text={sapt.description}
                  textAlign="center"
                  marginLeft="10%"
                ></P>
                <P text={sapt.information} marginBottom="34px" marginLeft="10%">
                  {sapt.information}
                </P>
                <Button text="Ta bort ansökan" onClick={() => {deleteSearch(sapt._id)}} />
              </ContentBox>
            </Modal2>
          </Wrapper>
        );
      })}
    </Container>
  );
};

export default SearchedApartments;
