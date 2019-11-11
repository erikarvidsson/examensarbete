import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from "../components/Container";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState();

  // const user = {
  //   usernme: username,
  //   date: date
  // }
  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${sessionStorage.getItem("id")}`)
      .then(res => {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setId(res.data._id);
      });
  },[])
        console.log(id);


  const onNewUser = e => {

    e.preventDefault();
    const user = {
      username: username,
      email: email,
      password: password
    };

    // console.log(user);

    

    axios
      .post(`http://localhost:5000/users/update/${id}`, user, { credentials: "include" })
      .then(res => {if(res){
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("email", email);
        document.cookie = `token=${username} + 1234`;
        console.log("uppdate sucessful");
        window.location.href = "/";
      }});

  };

  return (
    <Container>
      <h1>Create a new user</h1>
      <form>
        <label>Name</label>
        <br />
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <label>Email</label>
        <br />
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />

        <div type="submit" onClick={e => onNewUser(e)}>
          Submit
        </div>
      </form>
    </Container>
  );
};

export default UserProfile;
