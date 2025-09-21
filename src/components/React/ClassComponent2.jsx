import React, { Component } from "react";

class LifecycleExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    console.log("Constructor called");
  }

  // componentDidMount: This runs once after the component is mounted (rendered) for the first time.
  componentDidMount() {
    console.log("componentDidMount called");
  }

  // componentDidUpdate: This runs after the component is updated (i.e., state or props changed).
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate called");
    if (prevState.count !== this.state.count) {
      console.log(
        `Count changed from ${prevState.count} to ${this.state.count}`
      );
    }
  }

  // componentWillUnmount: This runs just before the component is unmounted (removed from the DOM).
  componentWillUnmount() {
    console.log("componentWillUnmount called");
  }

  // Increment count state
  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    console.log("Render called");
    return (
      <div>
        <h1>Lifecycle Example</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleIncrement}>Increment Count</button>
      </div>
    );
  }
}

export default LifecycleExample;
