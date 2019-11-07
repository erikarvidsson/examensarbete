import React, { useState, useEffect } from "react";
import axios from "axios";

const EdditInput = (props) => {
  const [apartment, setApartment] = useState({})
  const [adresses] = useState([
    { id: 1, name: "Dave", age: 50 },
    { id: 2, name: "Kellie", age: 42 },
    { id: 3, name: "Max", age: 12 },
    { id: 4, name: "Jack", age: 12 }
  ]);

  const [adress, setAdress] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState();

  if (props.apartmentId){
    sessionStorage.setItem("apartmentId", props.apartmentId);
  } 
  console.log(apartment)

  useEffect(() => {
    axios
      .get(`http://localhost:5000/${props.link}`)
      .then(res => {
        setApartment(res.data)
      });
  }, []);

  // axios
  //   .post("http://localhost:5000/users/add", user, {
  //     credentials: "include"
  //   })
  //   .then(res => {
  //     if (res.status === 200) {
  //       window.location.href = "/login";
  //     }
  //   });

  // const onNewUser = e => {
  //   e.preventDefault();

  //   const data = props.data ;

  //   axios
  //     .post("http://localhost:5000/emailServices/add", data)
  //     .then(res => console.log(res.data));
  // };

  return (
    <>
      <h2> Change input data</h2>
      {props.children}
    </>
  );
};

export default EdditInput;
