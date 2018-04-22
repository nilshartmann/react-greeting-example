import * as React from "react";
import { Greeting, NewGreeting } from "../../types";

interface GreetingComposerProps {
  initialName?: string | null;
  onCancel(): void;
  onSave(newGreeting: NewGreeting): void;
}

interface GreetingComposerState {
  name: string;
  greeting: string;
}

export default class GreetingComposer extends React.Component<GreetingComposerProps, GreetingComposerState> {
  render() {
    const { name, greeting } = this.state;
    const saveDisabled = !(name && greeting);

    return (
      <div>
        <input onChange={event => this.updateModel(event)} name="name" value={name} placeholder="Name" />
        <input onChange={event => this.updateModel(event)} name="greeting" value={greeting} placeholder="Greeting" />
        <button onClick={this.reset}>Clear</button>
        <button onClick={this.cancel}>Cancel</button>
        <button disabled={saveDisabled} onClick={() => this.save()}>
          Save
        </button>
      </div>
    );
  }

  constructor(props: GreetingComposerProps) {
    super(props);
    const { initialName } = this.props;
    this.state = {
      name: initialName || "",
      greeting: ""
    };
  }

  reset = () => {
    this.setState({ name: "", greeting: "" });
  };

  cancel = () => {
    const { onCancel } = this.props;

    onCancel();
  };

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
