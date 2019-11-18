import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import { Textarea, Input, Button } from "../Input";
import { Header } from "../typo";

const Select = styled.select`
  border: 0;
  height: 50px;
  width: 328px;
  border-radius: 25px;
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  padding-left: 12px;
  padding-right: 12px;
`;

const InputForm = () => {
  const [adresses] = useState([
    { id: 1, name: "Välj adress    ->" },
    { id: 2, name: "Kellbbergsgatan 4B" },
    { id: 3, name: "MaxGatan 45c" },
    { id: 4, name: "Jackjacobbstorg 2" },
    { id: 5, name: "Björksgatan 35A" }
  ]);

  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [date] = useState(new Date());

  // var email = sessionStorage.getItem("email");

  console.log(email);

  const onNewUser = e => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      adress: adress,
      description: description,
      date: date
    };

    axios
      .post("http://localhost:5000/emailServices/add", data)
      .then(res => console.log(res.data));
  };

  return (
    <>
      <Header text="Serviceanmälan" marginLeft="0"> </Header>
      <form>

        <br />
        <Input
        paddingTop="0"
          placeholder="Ditt namn"
          type="text"
          value={name}
          onChange={e => {
            e.persist();
            setName(e.target.value);
          }}
        />
        <br />
        <br />
        <br />
        <Input
          paddingTop="0"
          type="text"
          placeholder="Lägenhets nummer"
          // value={adress}
          onChange={e => {
            e.persist();
            setAdress(e.target.value);
          }}
        />
        <br />
        <br />
        <br />
        <Input
          paddingTop="0"
          type="text"
          placeholder="Telefonummer"
          // value={adress}
          onChange={e => {
            e.persist();
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        <br />
        <Textarea
          height="150px"
          type="text"
          placeholder="Beskriv ditt problem"
          // value={description}
          onChange={e => {
            e.persist();
            setDescription(e.target.value);
          }}
        />
        <br />
        <Select>
          {/* <option selected="selected" /> */}
          {adresses.map(adress => {
            // console.log(adress);
            return (
              <option value={adress.id} key={adress.id}>
                {adress.name}
              </option>
            );
          })}
        </Select>
      </form>
      <br />
      <Button
        text="Skicka Serviceanmälan"
        type="submit"
        onClick={e => onNewUser(e)}
      ></Button>
    </>
  );
};

export default InputForm;
