import React, { Suspense } from "react";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import history from "./history/History";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/common/PrivateRoute";
import TeamPrivateRoute from "./components/common/TeamPrivateRoute";

import { setCurrentUser, logOutUser, checkToken } from "./actions/authActions";

import NavBar from "./components/layouts/NavBar";
import Landing from "./components/layouts/Landing";
import Footer from "./components/layouts/Footer";
import TeamLanding from "./components/team/TeamLanding";
import Pending from "./components/messages/Pending";
import MyAppContainer from "./components/myAppointments/MyAppContainer";
import ConfirmLanding from "./components/confirm/ConfirmLanding";
import ResetRequest from "./components/common/ResetRequest";
import ResetPassword from "./components/common/ResetPassword";
import NotAuthorized from "./components/common/NotAuthorized";
import NotFound from "./components/common/NotFound";
import FallBack from "./components/common/FallBack";

import "./App.scss";
import "react-infinite-calendar/styles.css";

const UserRegister = React.lazy(() => import("./components/auth/UserRegister"));
const AdminLanding = React.lazy(() =>
  import("./components/admin/AdminLanding")
);
const TimeOffLanding = React.lazy(() =>
  import("./components/timeOff/TimeOffLanding")
);
const RegisterTeam = React.lazy(() =>
  import("./components/auth/team/RegisterTeam")
);

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
          <Container className="main-container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <TeamPrivateRoute exact path="/team" component={TeamLanding} />
              <Route
                exact
                path="/signup"
                component={() => (
                  <Suspense fallback={<FallBack />}>
                    <UserRegister />
                  </Suspense>
                )}
              />
              <Route
                path="/team/register"
                component={() => (
                  <Suspense fallback={<FallBack />}>
                    <RegisterTeam />
                  </Suspense>
                )}
              />
              <Route exact path="/forgot" component={ResetRequest} />
              <Route exact path="/team/forgot" component={ResetRequest} />
              <Route
                path="/reset/team/password"
                component={props => (
                  <ResetPassword
                    {...props}
                    getUrl="/reset/team"
                    putUrl="/reset/team/newpassword"
                    checkToken={checkToken}
                  />
                )}
              />

              <Route
                path="/reset/password"
                component={props => (
                  <ResetPassword
                    {...props}
                    getUrl="/reset/user"
                    putUrl="/reset/user/newpassword"
                    checkToken={checkToken}
                  />
                )}
              />

              <TeamPrivateRoute
                path="/confirm/team"
                component={ConfirmLanding}
              />

              <Route exact path="/not-authorized" component={NotAuthorized} />
              <PrivateRoute exact path="/pending" component={Pending} />
              <PrivateRoute
                exact
                path="/myappointments"
                component={MyAppContainer}
              />
              <TeamPrivateRoute
                exact
                path="/manage"
                component={() => (
                  <Suspense fallback={<FallBack />}>
                    <AdminLanding />
                  </Suspense>
                )}
              />
              <TeamPrivateRoute
                exact
                path="/timeoff"
                component={() => (
                  <Suspense fallback={<FallBack />}>
                    <TimeOffLanding />
                  </Suspense>
                )}
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
