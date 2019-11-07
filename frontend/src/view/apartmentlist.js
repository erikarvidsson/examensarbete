import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import FormData from "form-data";
import axios from "axios";

import Modal from "../components/Modal";
import Text from "../components/Text";
import EdditInput from "../components/EdditInput";

const Apartmentlist = () => {
  const [apartment, setApartment] = useState();
  const [apartments, setApartments] = useState([{}]);
  // const [apartmentId, setApartmentId] = useState([{}]);

  const [adress, setAdress] = useState();
  const [description, setDescription] = useState();
  const [img, setImg] = useState(false);
  const [lastDate, setLastDate] = useState(new Date());
  // const [data, setData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/data/`).then(res => {
      setApartments(res.data);
      // console.log(apartments)
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


    console.log(data)

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
  };
  console.log(apartments);

  return (
    <>
      {apartments &&
        apartments.map(apartment => {
          return (
            // <div onClick={() => { setApartmentId(apartment._id);}}>
            <div  >
              <Modal>
                <EdditInput data={data} link={`data/${apartment._id}`} apartmentId={apartment._id}>
                  <form>
                    <label>Street name</label>
                    <br />
                    <input
                      type="text"
                      value={adress}
                      placeholder={"New adress"}
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
              <h2>{apartment.adress}</h2>
              <h2>{apartment.description}</h2>
            </div>
          );
        })}
    </>
  );
};

export default Apartmentlist;
