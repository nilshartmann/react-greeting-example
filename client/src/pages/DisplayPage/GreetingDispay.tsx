import * as React from "react";
import { Greeting } from "../../types";

interface GreetingDisplayProps {
  greeting: Greeting;
}

export default class GreetingDisplay extends React.Component<GreetingDisplayProps> {
  render() {
    const { greeting } = this.props;

    return (
      <React.Fragment>
        <p>
          Someone send you a greeting, <b>{greeting.name}</b>!
        </p>
        <h1>{greeting.greeting}</h1>
      </React.Fragment>
    );
  }
}
