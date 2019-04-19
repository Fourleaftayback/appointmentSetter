import React, { Component } from "react";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";

import NavBar from "./components/layouts/NavBar";
import Landing from "./components/layouts/Landing";
import Footer from "./components/layouts/Footer";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container fluid={true} className="App">
          <NavBar />
          <Landing />

          <Footer />
        </Container>
      </Provider>
    );
  }
}

export default App;
