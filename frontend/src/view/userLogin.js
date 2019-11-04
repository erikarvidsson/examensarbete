import React, { useState } from "react";
import axios from "axios";

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
        sessionStorage.setItem("username", req.data.username);
        sessionStorage.setItem("email", req.data.email);
        sessionStorage.setItem("id", req.data._id);
        document.cookie = `token=${req.data.username} + 1234`;
        console.log("sucessful signin");
        window.location.href = "/";
      } else {
        return console.log("sigin not woriking");
      }
    });
  };

  return (
    <>
      <h1>Login Page </h1>
      <form>
        <h1>{token.username}</h1>
        <label>Name</label>
        <br />
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <br />
        <div type="submit" onClick={e => onNewUser(e)}>
          Login
        </div>
      </form>
    </>
  );
};

export default UserLogin;
