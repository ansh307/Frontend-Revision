// Build a custom event emitter (on, off, emit).

import { argv } from "process";
import React from "react";

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(listener);
  }

  off(event, listener) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter(
      (regisListner) => regisListner !== listener
    );
  }

  emit(event, ...args) {
    if (!this.events[event]) return;

    this.events[event].forEach((listener) => {
      listener(...args);
    });
  }
}

const emmitter = new EventEmitter();

function onUserLogin(username) {
  console.log(`${username} has logged in!`);
}

function onUserLogout(username) {
  console.log(`${username} has logged out.`);
}

emmitter.on("userlogin", onUserLogin);
emmitter.on("userlogout", onUserLogout);

emmitter.emit("userLogin", "Alice"); // Alice has logged in!
emmitter.emit("userLogout", "Alice"); // Alice has logged out.

emmitter.off("userLogin", onUserLogin);

export const Task6 = () => {
  return <div>Task6</div>;
};
