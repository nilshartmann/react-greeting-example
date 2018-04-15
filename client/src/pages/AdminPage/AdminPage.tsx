import * as React from "react";
import { Router, Route } from "react-router-dom";
import GreetingList from "./GreetingList";
import { Greeting, NewGreeting } from "../../types";
import { RouteComponentProps } from "react-router";

import Chart from "./Chart";
import { aggregateGreetings } from "./util";

const BACKEND_URL = "http://localhost:7000/greetings";

interface LoadableGreetingComposerState {
  GreetingComposer?: React.ComponentType<any>;
}
class LoadableGreetingComposer extends React.Component<any, LoadableGreetingComposerState> {
  readonly state: LoadableGreetingComposerState = {};

  async componentDidMount() {
    const loadedComponent = await import(/* webpackChunkName: "greeting" */ "./GreetingComposer");
    this.setState({ GreetingComposer: loadedComponent.default });
  }

  render() {
    if (this.state.GreetingComposer) {
      return <this.state.GreetingComposer {...this.props} />;
    }

    return <span>Loading...</span>;
  }
}

interface AdminPageProps extends RouteComponentProps<void> {}

interface AdminPageState {
  greetings: Greeting[];
  filter: string | null;
}

export default class AdminPage extends React.Component<AdminPageProps, AdminPageState> {
  readonly state: AdminPageState = {
    greetings: [],
    filter: null
  };

  render() {
    const { greetings, filter } = this.state;
    const aggregatedGreetings = aggregateGreetings(greetings);
    const filtered = filter ? greetings.filter(greeting => greeting.name === filter) : greetings;

    return (
      <div className="Main">
        <div className="Left">
          <Route exact path="/" render={() => <GreetingList greetings={filtered} onAdd={() => this.redirectTo("/add")} />} />
          <Route
            path="/add"
            render={() => (
              <LoadableGreetingComposer
                initialName={filter}
                onSave={(greeting: NewGreeting) => this.saveGreeting(greeting)}
                onCancel={() => this.redirectTo("/")}
              />
            )}
          />
        </div>
        <div className="Right">
          <Chart
            data={aggregatedGreetings}
            onSegmentSelected={filter => {
              if (this.state.filter === filter) {
                // reset filter when clicking again
                this.setState({ filter: null });
              } else {
                this.setState({ filter });
              }
            }}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.loadGreetings();
  }

  async loadGreetings() {
    let greetings = null;
    try {
      const response = await fetch(BACKEND_URL);
      greetings = await response.json();
    } catch (err) {
      console.error("LOADING GREETINGS FAILED:", err);
      return;
    }

    this.setState({ greetings });
  }

  async saveGreeting(greetingToBeAdded: NewGreeting) {
    let newGreeting;
    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(greetingToBeAdded)
      });
      if (response.status !== 201) {
        throw new Error("Invalid status code: " + response.status);
      }
      newGreeting = await response.json();
    } catch (err) {
      console.error("LOADING GREETINGS FAILED:", err);
    }
    // add the new greetings to the list of all greetings
    // (create a new array for immutability)

    const newGreetings = [...this.state.greetings, newGreeting];

    // set the new list of greetings as our new state
    // also set 'MODE_MASTER' to make sure the master-View is
    // displayed now
    this.setState({
      greetings: newGreetings
    });

    // redirect to master view
    this.redirectTo("/");
  }

  redirectTo(path: string) {
    const { history } = this.props;
    history.push(path);
  }
}
