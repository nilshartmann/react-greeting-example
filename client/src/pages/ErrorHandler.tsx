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

  render() {
    const { children } = this.props;

    if (!this.state.hasError) {
      return children;
    }

    return (
      <div>
        <h1>An Error occured: {this.state.error && this.state.error.toString()}</h1>
        <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
      </div>
    );
  }
}
