import React, { useState } from "react";
import axios from "axios";

const InputForm = () => {
  const [adresses] = useState([
    { id: 1, name: "Dave", age: 50 },
    { id: 2, name: "Kellie", age: 42 },
    { id: 3, name: "Max", age: 12 },
    { id: 4, name: "Jack", age: 12 }
  ]);

  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [description, setDescription] = useState("");
  const [date] = useState(new Date());

  function getCook(cookiename) {
    // Get name followed by anything except a semicolon
    var cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(
      !!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : ""
    );
  }

  var email = getCook("email");

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
      <h2> Hello</h2>
      <form>
        <h2>Hejs</h2>
        Name:
        <input
          type="text"
          value={name}
          onChange={e => {
            e.persist();
            setName(e.target.value);
          }}
        />
        <br />
        Adress:
        <input
          type="text"
          value={adress}
          onChange={e => {
            e.persist();
            setAdress(e.target.value);
          }}
        />
        <br />
        Description:
        <input
          type="text"
          value={description}
          onChange={e => {
            e.persist();
            setDescription(e.target.value);
          }}
        />
        <br />
        <select>
          <option value="select adress" />
          {adresses.map(adress => {
            // console.log(adress);
            return (
              <option value={adress.id} key={adress.id}>
                {adress.name}
              </option>
            );
          })}
        </select>
      </form>
      <div type="submit" onClick={e => onNewUser(e)}>
        CLICK ME
      </div>
    </>
  );
};

export default InputForm;
