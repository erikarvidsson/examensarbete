import React, { useState } from "react";
import axios from "axios";

import Container from "../components/Container";
import { Input, Button } from "../components/Input";
import { Header } from "../components/typo";

const AddAdmin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [status, setStatus] = useState();

  // const user = {
  //   usernme: username,
  //   date: date
  // }

  const onNewUser = e => {
    e.preventDefault();
    const user = {
      username: username,
      email: email,
      password: password
    };


    axios
      .post("http://localhost:5000/users/addAdmin", user, {
        credentials: "include"
      })
      .then(res => {
        if (res.status === 200) {
          window.location.href = "/";
        }
      });
  };

  return (
    <Container>
      <Header marginLeft="0" text="Create a new admin"></Header>
      <form>
        <label>Namn</label>
        <br />
        <Input
          paddingTop="0"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <label>Email</label>
        <br />
        <Input
          paddingTop="0"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <label>Lösenord</label>
        <br />
        <Input
          paddingTop="0"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <br />
        <Button text="Lägg till Admin" type="submit" onClick={e => onNewUser(e)} />
      </form>
    </Container>
  );
};

export default AddAdmin;
