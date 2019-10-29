import React, { useState } from 'react';
import axios from 'axios';

const UpdateUser = () => {

  const [username, setUsername] = useState('Name');
  const [email, setEmail] = useState('Name');
  const [password, setPassword] = useState('Password');

  // const user = {
  //   usernme: username,
  //   date: date
  // }

  const onNewUser = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      email: email,
      password: password
    }

    console.log(user)

    axios.post('http://localhost:5000/users/add', user, { credentials: 'include'})
      .then(res => console.log(res.data));
  }

  return (
    <>
      <h1>Hello {username}</h1>
      <form>
        <label>Name</label>
        <br />
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <br />
        <label>Email</label>
        <br />
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        <br />
        <label>Password</label>
        <br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <br />
        <br />
        <div type="submit" onClick={e => onNewUser(e)}>Submit</div>
      </form>
    </>
  );
}

export default UpdateUser;
