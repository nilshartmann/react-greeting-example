import * as React from "react";
import LinkButtonBar from "../../components/LinkButtonBar";
import { RouteComponentProps } from "react-router";
import { Greeting } from "../../types";

const BACKEND_URL = "http://localhost:7000/greetings";

interface GreetingDisplayControllerParams {
  greetingId: string;
}

interface GreetingDisplayControllerProps extends RouteComponentProps<GreetingDisplayControllerParams> {}

interface GreetingDisplayControllerState {
  greeting?: Greeting;
}

export default class DisplayPage extends React.Component<GreetingDisplayControllerProps, GreetingDisplayControllerState> {
  componentDidMount() {
    this.loadGreeting(this.props);
  }

  componentWillReceiveProps(nextProps: GreetingDisplayControllerProps) {
    this.loadGreeting(nextProps);
  }

  async loadGreeting(props: GreetingDisplayControllerProps) {
    const { match } = props;

    let greeting = null;
    try {
      const response = await fetch(`${BACKEND_URL}/${match.params.greetingId}`);
      greeting = await response.json();
    } catch (err) {
      console.error("LOADING GREETINGS FAILED:", err);
      return;
    }

    this.setState({ greeting });
  }

  render() {
    if (!this.state || !this.state.greeting) {
      return <h1>No Greeting loaded</h1>;
    }

    const { greeting } = this.state;

    // In a real-world, more complex example the rendering of the greeting would go to it's own dump component
    return (
      <React.Fragment>
        <p>
          Someone send you a greeting, <b>{greeting.name}</b>!
        </p>
        <h1>{greeting.greeting}</h1>
        <LinkButtonBar links={[{ title: "Home", target: "/" }, { title: "Add Greeting", target: "/add" }]} />
      </React.Fragment>
    );
  }
}
