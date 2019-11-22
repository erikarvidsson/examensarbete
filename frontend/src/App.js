import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Index from "./view/index";
// import NavBar from "./view/navBar";
import NavBarBurger from "./view/navBarBurger";
import UpdateUser from "./view/updateUser";
import AddAdmin from "./view/addAdmin";
import Apartmentlist from "./view/apartmentlist";
import AddApartment from "./view/addApartment";
import AddNews from "./view/addNews";
import SearchedApartments from "./view/searchedApartments";
import ServiceNotification from "./view/serviceNotification";
import UserProfile from "./view/userProfile";
import UserLogin from "./view/userLogin";
import UserLogout from "./view/userLogout";
import Test from "./view/test";
// import NotFound from "./view/notFound";

function App() {
  const loggedin = document.cookie;
  const admin = sessionStorage.getItem("admin");

  return (
    <Router>
      <NavBarBurger />
      <Switch>
        <>
          <Route path="/" exact component={Index} />
          <Route path="/apartmentlist" exact component={Apartmentlist} />
          <Route path="/update" exact component={UpdateUser} />
          {!admin && !loggedin && (
            <Route path="/login" exact component={UserLogin} />
          )}
          {loggedin && !admin && (
            <>
              {/* <Route path="/apartmentlist" exact component={Apartmentlist} /> */}
              <Route path="/profile" exact component={UserProfile} />
              <Route path="/logout" exact component={UserLogout} />
              <Route path="/sapts" exact component={SearchedApartments} />
              <Route
                path="/serviceNotification"
                component={ServiceNotification}
              />
            </>
          )}
          {admin && (
            <>
              <Route path="/addAdmin" exact component={AddAdmin} />
              <Route
                path="/serviceNotification"
                component={ServiceNotification}
              />
              <Route path="/newApartment" exact component={AddApartment} />
              <Route path="/addNews" exact component={AddNews} />
              {/* <Route path="/apartmentlist" exact component={Apartmentlist} /> */}
              <Route path="/logout" exact component={UserLogout} />
            </>
          )}
        </>
      </Switch>
    </Router>
  );
}

export default App;
