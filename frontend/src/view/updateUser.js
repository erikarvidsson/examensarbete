import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

const UpdateUser = () => {

  const [username, setUsername] = useState('Name');
  const [date, setDate] = useState(new Date());

  // const user = {
  //   usernme: username,
  //   date: date
  // }


  return (
    <>
      <h1>Hello {username}</h1>
      <form>
        <label>Name</label>
        <br />
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <br />
        <label>Date</label>
        <br />
        <DatePicker
          selected={date}
          onChange={setDate}
        />
        <br />
        <button type="submit" onSubmit={e => e.preventDeafult}>Submit</button>
      </form>
    </>
  );
}

export default UpdateUser;
