import * as React from "react";

import AdminPage from "./pages/AdminPage";
import GreetingDisplay from "./pages/DisplayPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const GreetingApp = () => (
  <Router>
    <div>
      <h1 style={{ paddingBottom: "5px", marginBottom: "1rem", borderBottom: "1px solid gray" }}>Greeting App</h1>
      <Switch>
        <Route path="/greet/:greetingId" component={GreetingDisplay} />
        <Route path="/" component={AdminPage} />
      </Switch>
    </div>
  </Router>
);

export default GreetingApp;
