import React, { Component } from "react";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";

import NavBar from "./components/layouts/NavBar";
import Landing from "./components/layouts/Landing";
import Footer from "./components/layouts/Footer";
import UserRegister from "./components/auth/UserRegister";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Container fluid={true} className="App bg-light">
            <NavBar />
            <Container fluid={true} className="main-container">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/signup" component={UserRegister} />
              </Switch>
            </Container>
            <Footer />
          </Container>
        </Router>
      </Provider>
    );
  }
}

export default App;
