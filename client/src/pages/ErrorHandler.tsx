import * as React from "react";

interface ErrorHandlerState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export default class ErrorHandler extends React.Component<{}, ErrorHandlerState> {
  readonly state: ErrorHandlerState = {
    hasError: false
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo
    });
  }

  renderErrorInfo() {
    const { errorInfo } = this.state;

    if (!errorInfo) {
      return null;
    }

    return (
      <React.Fragment>
        <h2>Component Stack</h2>
        <pre>{errorInfo.componentStack}</pre>
      </React.Fragment>
    );
  }

  renderErrorStack() {
    const { error } = this.state;

    if (!error || !error.stack) {
      return null;
    }

    return (
      <React.Fragment>
        <h2>Stack Trace</h2>
        <pre>{error.stack}</pre>
      </React.Fragment>
    );

    // const trace = error.stack.replace("\n", "XXX");
    // return <pre>{trace}</pre>;
  }

  render() {
    const { children } = this.props;

    if (!this.state.hasError) {
      return children;
    }

    return (
      <div>
        <h1>An Error occured: {this.state.error && this.state.error.message}</h1>
        {this.renderErrorStack()}
        {this.renderErrorInfo()}
      </div>
    );
  }
}
