"use client";

import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, winner: false };
  }

  increment = () => {
    this.setState((prevState) => {
      const newCount = prevState.count + 1;
      return {
        count: newCount,
        winner: newCount >= 10,
      };
    });
  };

  decrement = () => {
    this.setState((prevState) => {
      const newCount = prevState.count > 0 ? prevState.count - 1 : 0;
      return {
        count: newCount,
        winner: newCount >= 10,
      };
    });
  };

  reset = () => {
    this.setState({ count: 0, winner: false });
  };

  render() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
        <div className="flex space-x-4">
          <button
            onClick={this.increment}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Increment
          </button>

          <button
            onClick={this.decrement}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Decrement
          </button>

          <button
            onClick={this.reset}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            Reset
          </button>
        </div>

        <div>
          {this.state.winner ? (
            <p className="text-xl font-bold text-green-700">
              You Won: {this.state.count}
            </p>
          ) : (
            <p className="text-xl font-semibold text-gray-800">
              Count: {this.state.count}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Counter;
