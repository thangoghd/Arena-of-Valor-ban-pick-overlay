import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import openSocket from "socket.io-client";

import Index from "./pages/Index/Index";
import Admin from "./pages/Admin/Admin";

import FontStyles from './fonts/fonts';

const socket = openSocket("http://localhost:8000", {
  transports: ["websocket"],
});

function App() {
  return (
    <Router>
      <FontStyles />
      <Switch>
        <Route exact path="/" render={() => <Index socket={socket} />} />
        <Route path="/admin" render={() => <Admin socket={socket} />} />
      </Switch>
    </Router>
  );
}

export default App;
