import React, { Component } from "react";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/layouts/Landing";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Landing />
        </Container>
      </Provider>
    );
  }
}

export default App;
