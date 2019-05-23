import React from "react";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import store from "./store";
import history from "./history/History";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import PrivateRoute from "./components/common/PrivateRoute";
import TeamPrivateRoute from "./components/common/TeamPrivateRoute";

import { setCurrentUser, logOutUser } from "./actions/authActions";

import NavBar from "./components/layouts/NavBar";
import Landing from "./components/layouts/Landing";
import Footer from "./components/layouts/Footer";
import UserRegister from "./components/auth/UserRegister";
import TeamLanding from "./components/team/TeamLanding";
import RegisterTeam from "./components/auth/team/RegisterTeam";
import Pending from "./components/messages/Pending";
import MyAppContainer from "./components/myAppointments/MyAppContainer";
import AdminLanding from "./components/admin/AdminLanding";
import TimeOffLanding from "./components/timeOff/TimeOffLanding";

import ResetRequest from "./components/common/ResetRequest";
import NotAuthorized from "./components/common/NotAuthorized";
import NotFound from "./components/common/NotFound";

import "./App.css";
import "react-infinite-calendar/styles.css";

//set up jwt token auth here
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logOutUser());
    //store.dispatch(clearData());
    window.location.href = "/"; //this may need to get refactored
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Container fluid={true} className="App bg-light">
          <div className="dark-overlay" />
          <NavBar />
          <Container>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/signup" component={UserRegister} />
              <TeamPrivateRoute exact path="/team" component={TeamLanding} />

              <Route path="/team/register" component={RegisterTeam} />
              <Route exact path="/forgot" component={ResetRequest} />
              <Route exact path="/team/forgot" component={ResetRequest} />

              <Route exact path="/not-authorized" component={NotAuthorized} />
              <PrivateRoute exact path="/pending" component={Pending} />
              <PrivateRoute
                exact
                path="/myappointments"
                component={MyAppContainer}
              />
              <TeamPrivateRoute exact path="/manage" component={AdminLanding} />
              <TeamPrivateRoute
                exact
                path="/timeoff"
                component={TimeOffLanding}
              />

              <Route component={NotFound} />
            </Switch>
          </Container>
          <Footer />
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
