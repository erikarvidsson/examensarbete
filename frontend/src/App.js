import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Index from "./view/index";
import NavBar from "./view/navBar";
import UpdateUser from "./view/updateUser";
import AddApatment from "./view/addApartment";
import UserProfile from "./view/userProfile";
import UserLogin from "./view/userLogin";
import UserLogout from "./view/userLogout";
import Test from "./view/test";
import NotFound from "./view/notFound";

function App() {
  const loggedin = document.cookie;

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/test" exact component={Test} />
        {loggedin && (
          <>
            <Route path="/newApartment" exact component={AddApatment} />
            <Route path="/profile" exact component={UserProfile} />
            <Route path="/logout" exact component={UserLogout} />
          </>
        )}
        {!loggedin && (
          <>
            <Route path="/login" exact component={UserLogin} />
            <Route path="/update" exact component={UpdateUser} />
          </>
        )}
        {/* <Route path="*" exact={true}   component={NotFound} /> */}
      </Switch>
    </Router>
  );
}

export default App;
