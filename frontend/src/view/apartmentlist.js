import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import FormData from "form-data";
import axios from "axios";
import styled from "styled-components";
import { P, H2, Header } from "../components/typo";

import Modal from "../components/Modal";
import EdditInput from "../components/EdditInput";
import Container from "../components/Container";

const Apartmentlist = () => {
  const [apartments, setApartments] = useState([{}]);
  // const [apartmentId, setApartmentId] = useState([{}]);

  const [adress, setAdress] = useState();
  const [description, setDescription] = useState();
  const [img, setImg] = useState("false");
  const [lastDate, setLastDate] = useState(new Date());

  useEffect(() => {
    axios.get(`http://localhost:5000/data/`).then(res => {
      setApartments(res.data);
    });
  }, []);

  const data = {
    adress: adress,
    description: description,
    img: img.name,
    lastDate: lastDate
  };

  const onUppdateApartment = e => {
    e.preventDefault();

    let apartmentId = sessionStorage.getItem("apartmentId");

    axios
      .post(`http://localhost:5000/data/update/${apartmentId}`, data, {
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
      .post("http://localhost:5000/data/save", imgData, config)
      .then(res => console.log(res));
    window.location.href = "/apartmentlist";
  };


  const Img = styled.img`
    height: 100px;
  `;
  const DisplayBox = styled.div`
    height: 100px;
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

  return (
    <Container>
      {apartments &&
        apartments.map(apartment => {
          return (
            <div key={apartment._id}>
              <Modal>
                <EdditInput
                  data={data}
                  link={`data/${apartment._id}`}
                  apartmentId={apartment._id}
                >
                  <form>
                    <label>Street name</label>
                    <br />
                    <input
                      type="text"
                      value={adress}
                      placeholder={"New adress"}
                      onChange={e => {
                        e.persist();
                        setAdress(e.target);
                      }}
                    />
                    <br />
                    <label>Information</label>
                    <br />
                    <input
                      type="text"
                      value={description}
                      placeholder={"New description"}
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
                    <button onClick={e => onUppdateApartment(e)}>Submit</button>
                  </form>
                </EdditInput>
              </Modal>
              <DisplayBox>
                <div className="imgBox">
                  <Img
                    src={`http://localhost:5000/${apartment.img}`}
                    alt=""
                    key={apartment._id}
                  />
                </div>
                <div>
                  <H2 text={apartment.adress}></H2>
                  <P text={apartment.description}></P>
                </div>
              </DisplayBox>
            </div>
          );
        })}
    </Container>
  );
};

export default Apartmentlist;
