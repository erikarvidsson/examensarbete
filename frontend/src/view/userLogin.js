import React, { useState } from 'react';
import axios from 'axios';

const UpdateUser = () => {

  const [username, setUsername] = useState('Name');
  const [password, setPassword] = useState('Password');

  // const user = {
  //   usernme: username,
  //   password: password
  // }

  // let axiosConfig = {
  //   headers: {
  //     'Content-Type': 'application/json;charset=UTF-8',
  //     "Access-Control-Allow-Origin": "*",
  //   }
  // };

  const onNewUser = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password
    }
    // console.log(message.info)
    // console.log(user)
    // axios.post(`http://localhost:5000/userLogin/login/${username}`, user)
    //   .then(res => console.log(res))

    axios.post('http://localhost:5000/userLogin/login', user)
      .then(res => {
        console.log(res.data)
        if(res.data){
          return console.log('sucessful signin')
        }else {
          return console.log('sigin not woriking')
        }
      });
  }

  return (
    <>
      <h1>Login Page </h1>
      <form>
        <label>Name</label>
        <br />
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <br />
        <label>Password</label>
        <br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <br />
        <br />
        <div type="submit" onClick={e => onNewUser(e)}>Login</div>
      </form>
    </>
  );
}

export default UpdateUser;
