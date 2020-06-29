import React from "react";

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import Main from "./view/main";
import Confirm from "./view/confirm";
import Purchase from "./view/purchase";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/purchase" exact component={Purchase} />
        <Route path="/confirm" exact component={Confirm} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}
export default App;
