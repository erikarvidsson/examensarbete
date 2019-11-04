import React, { useState } from "react";
import axios from "axios";

const UpdateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState();

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

    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user, { credentials: "include" })
      .then(res => {
        if (res.status === 200) {
          window.location.href = "/login";
        }
      });

    if (status === 200) {
    }
  };

  return (
    <>
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
          Submit
        </div>
      </form>
    </>
  );
};

export default UpdateUser;
