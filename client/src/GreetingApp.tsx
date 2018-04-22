import * as React from "react";
import * as Loadable from "react-loadable";
import ErrorHandler from "./pages/ErrorHandler";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class LoadingComponent extends React.Component<Loadable.LoadingComponentProps> {
  render() {
    return this.props.error ? console.log(this.props.error) || <div>Error loading component!</div> : <div>Loading...</div>;
  }
}

const LoadableAdminPage = Loadable({
  loader: () => import(/* webpackChunkName: "AdminPage" */ "./pages/AdminPage"),
  loading: LoadingComponent
});

const LoadableDisplayPage = Loadable({
  loader: () => import(/* webpackChunkName: "DisplayPage" */ "./pages/DisplayPage"),
  loading: LoadingComponent
});

const GreetingApp = () => (
  <Router>
    <div>
      <h1 style={{ paddingBottom: "5px", marginBottom: "1rem", borderBottom: "1px solid gray" }}>Greeting App</h1>
      <Switch>
        <React.StrictMode>
          <ErrorHandler>
            <Route exact path="/greet/:greetingId" component={LoadableDisplayPage} />
            <Route path="/" component={LoadableAdminPage} />
          </ErrorHandler>
        </React.StrictMode>
      </Switch>
    </div>
  </Router>
);

export default GreetingApp;
