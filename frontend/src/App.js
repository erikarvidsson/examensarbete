import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Index from "./view/index";
import NavBar from "./view/navBar";
import UpdateUser from "./view/updateUser";
import AddApatment from "./view/addApartment";
import UserLogin from "./view/userLogin";

function App() {
  return (
    <Router>
      <NavBar/>
      <Route path="/" exact component={Index} />
      <Route path="/update" exact component={UpdateUser} />
      <Route path="/newApartment" exact component={AddApatment} />
      <Route path="/login" exact component={UserLogin} />
    </Router>
  );
}

export default App;
