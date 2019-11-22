import React, { useState } from "react";
import axios from "axios";

import Container from "../components/Container";
import { Input, Button } from "../components/Input";
import { Header } from "../components/typo";

const UserLogin = () => {
  const [username, setUsername] = useState("Name");
  const [password, setPassword] = useState("Password");
  const [token, setToken] = useState("");

  const onNewUser = e => {
    e.preventDefault(); 
    const user = {
      username: username,
      password: password
    };

    axios.post("http://localhost:5000/userLogin/login", user).then(req => {
      if (req) {
        // console.log(req.headers.authorization);
        sessionStorage.setItem("username", req.data.user.username);
        sessionStorage.setItem("email", req.data.user.email);
        sessionStorage.setItem("id", req.data.user._id);

        if (req.data.user.admin) {
          sessionStorage.setItem("admin", true);
        }
        document.cookie = `token=${req.data.token}`;
        console.log("sucessful signin");
        window.location.href = "/";
      } else {
        return console.log("sigin not woriking");
      }
    });
  };

  return (
    <Container>
      <Header text="Logga in" marginLeft="0"/>
      <form>
        <h1>{token.username}</h1>
        <label>Name</label>
        <br />
        <Input
          paddingTop="0"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <label>Password</label>
        <br />
        <Input
          paddingTop="0"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <br />
        <Button text="Logga in" type="submit" onClick={e => onNewUser(e)} />
      </form>
    </Container>
  );
};

export default UserLogin;
