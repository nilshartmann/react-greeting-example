import * as React from "react";
import { Greeting, NewGreeting } from "../../types";

interface GreetingComposerProps {
  greeting?: Greeting;
  onSave(newGreeting: NewGreeting): void;
}

interface GreetingComposerState {
  name: string;
  greeting: string;
}

export default class GreetingComposer extends React.Component<GreetingComposerProps, GreetingComposerState> {
  input: HTMLInputElement | null = null;

  render() {
    const { name, greeting } = this.state;
    const saveDisabled = !(name && greeting);

    return (
      <div>
        <input
          ref={input => (this.input = input)}
          onChange={event => this.updateModel(event)}
          name="name"
          value={name}
          placeholder="Name"
        />
        <input onChange={event => this.updateModel(event)} name="greeting" value={greeting} placeholder="Greeting" />
        <button onClick={() => this.reset()}>Clear</button>
        <button disabled={saveDisabled} onClick={() => this.save()}>
          Save
        </button>
      </div>
    );
  }

  constructor(props: GreetingComposerProps) {
    super(props);
    const { name, greeting } = this.props.greeting || { name: "", greeting: "" };
    this.state = {
      name,
      greeting
    };
  }

  reset() {
    this.setState({ name: "", greeting: "" });
    if (this.input) {
      this.input.focus();
    }
  }

  save() {
    const { onSave } = this.props;
    const { name, greeting } = this.state;
    onSave({
      name,
      greeting
    });
  }

  updateModel(event: React.SyntheticEvent<HTMLInputElement>) {
    this.setState({ [event.currentTarget.name as any]: event.currentTarget.value });
  }
}
