# JavaScript

## The difference between `==` and `===` comes down to **type coercion** in JavaScript.

1. **`==` (Equality Operator)**:

   - It compares the values of two variables, **but it allows type coercion**. This means that it converts one or both operands to a common type before making the comparison.
   - Example:

     ```javascript
     5 == "5"; // true
     ```

     Here, JavaScript converts the string `'5'` to the number `5` and then compares them, which results in `true`.

2. **`===` (Strict Equality Operator)**:

   - It compares both **value and type**. There is no type coercion, meaning both operands must be of the same type to be considered equal.
   - Example:

     ```javascript
     5 === "5"; // false
     ```

     Here, even though the values are the same, `5` is a number and `'5'` is a string, so they are not strictly equal.

### Summary:

- **`==`**: Compares values **with type coercion**.
- **`===`**: Compares both **value and type** **without type coercion**.

It's generally recommended to use `===` to avoid unexpected results due to type coercion.

---

---

## What is the event loop? Explain microtasks vs macrotasks

The **event loop** is a fundamental concept in JavaScript (and other languages with asynchronous behavior), and it's responsible for managing and coordinating the execution of multiple tasks, especially in a non-blocking, asynchronous environment like the browser or Node.js.

### How the Event Loop Works:

1. **Call Stack**: This is where all the synchronous code (the code that's executed immediately) is placed. The event loop continually checks if the call stack is empty. If it is, it looks for tasks in the **message queue** or other task queues to execute.

2. **Message Queue (or Task Queue)**: This queue contains tasks that are ready to be executed, usually after some asynchronous operation (like a `setTimeout`, a network request, or a user input event).

3. **Event Loop**: The event loop's job is to monitor the call stack and the task queues. If the call stack is empty, it will start executing tasks in the message queue. This ensures that the JavaScript runtime environment doesn't get blocked by long-running tasks and can handle asynchronous events.

4. **Web APIs (or Node APIs)**: These are APIs provided by the browser or Node.js that handle operations like `setTimeout`, DOM events, or AJAX calls. When these tasks complete, they are placed in the appropriate queue for the event loop to process.

---

### Microtasks vs Macrotasks:

**Tasks** can be divided into two main categories in terms of execution order: **microtasks** and **macrotasks**.

1. **Macrotasks** (also called **Tasks**):

   - These are larger tasks that typically involve things like `setTimeout`, `setInterval`, or handling events like `click` or `load`.
   - Macrotasks are placed in the **task queue** (also called the **message queue**).
   - They are processed after all the currently executing code (i.e., the call stack) has completed and all the microtasks have been executed.

   Example of macrotasks:

   ```javascript
   setTimeout(() => {
     console.log("Macrotask");
   }, 0);
   ```

2. **Microtasks**:

   - Microtasks are smaller, more **urgent** tasks that are placed in the **microtask queue** (sometimes called the **Job Queue**).
   - They have **higher priority** than macrotasks. After the current script (or stack) is finished, the event loop will first process all the microtasks before it moves to the macrotasks.
   - Common examples of microtasks are Promises (e.g., `promise.then()`) and `queueMicrotask()`.

   Example of microtasks:

   ```javascript
   Promise.resolve().then(() => {
     console.log("Microtask");
   });
   ```

---

### Execution Order:

The event loop follows this sequence:

1. **Execute all the code in the call stack** (synchronous code).
2. **Execute all the microtasks** in the microtask queue (e.g., promise handlers).
3. **Process one macrotask** from the macrotask queue (e.g., `setTimeout`, user events).
4. **Repeat**: The event loop will keep cycling through this process until there are no tasks left to execute.

### Example:

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Macrotask 1");
}, 0);

Promise.resolve().then(() => {
  console.log("Microtask 1");
});

setTimeout(() => {
  console.log("Macrotask 2");
}, 0);

Promise.resolve().then(() => {
  console.log("Microtask 2");
});

console.log("End");
```

### Expected Output:

```javascript
Start
End
Microtask 1
Microtask 2
Macrotask 1
Macrotask 2
```

### Breakdown:

- **Synchronous code**: `console.log("Start")` and `console.log("End")` are executed first.
- **Microtasks**: Both `Promise.resolve().then(...)` are microtasks, so they are executed right after the synchronous code and before any macrotasks.
- **Macrotasks**: `setTimeout` functions are queued as macrotasks. Even though they are set with `0` delay, they are executed after all microtasks are completed.

### Key Differences:

- **Microtasks** (e.g., promises, `queueMicrotask`) are executed immediately after the currently executing script (i.e., before macrotasks) and before rendering.
- **Macrotasks** (e.g., `setTimeout`, `setInterval`, DOM events) are executed after all microtasks have been processed.

This distinction allows JavaScript to handle things like **Promises** and **async/await** more efficiently and deterministically, ensuring that they execute before longer tasks like `setTimeout` and user interactions.

---

---

## Explain closures with an example.

### What is a **Closure**?

A **closure** is a function that "remembers" its lexical environment, even when the function is executed outside that environment. In simpler terms, a closure allows a function to access variables from its outer (enclosing) scope, even after that outer function has finished execution.

### Key Characteristics of Closures:

1. A closure has access to its own scope (variables defined inside it).
2. It also has access to variables from the outer function's scope.
3. It has access to global variables.

### How Closures Work:

Closures are created every time a function is created in JavaScript. When an inner function is returned from an outer function, it "remembers" the variables from the outer function's scope, even after the outer function has completed execution.

### Example of a Closure:

```javascript
function outerFunction(outerVariable) {
  const outerConstant = "I am outer constant";

  // Inner function
  function innerFunction(innerVariable) {
    console.log("Outer Variable:", outerVariable);
    console.log("Outer Constant:", outerConstant);
    console.log("Inner Variable:", innerVariable);
  }

  return innerFunction;
}

const closureFunction = outerFunction("I am outer variable");
closureFunction("I am inner variable");
```

### Explanation:

1. **Outer function (`outerFunction`)**:

   - It accepts a parameter `outerVariable` and defines a constant `outerConstant`.
   - It then defines the inner function `innerFunction`, which references both the parameter `outerVariable` and the constant `outerConstant`.

2. **Returning the inner function**:

   - The outer function returns the `innerFunction`. Importantly, when this happens, the inner function becomes a **closure**, retaining access to the `outerVariable` and `outerConstant`, even though the outer function has already finished executing.

3. **Calling the closure**:

   - When `closureFunction('I am inner variable')` is called, the inner function is executed, and it has access to both the variables from the outer scope (`outerVariable` and `outerConstant`) as well as the parameter passed to it (`innerVariable`).

### Output:

```text
Outer Variable: I am outer variable
Outer Constant: I am outer constant
Inner Variable: I am inner variable
```

### Why does this work?

- When the `closureFunction` is called, it's not just executing a regular function — it's executing an inner function that has "closed over" its surrounding scope.
- This means the inner function retains references to all variables it had access to at the time it was created, even though the outer function has already finished execution.

### Use Cases for Closures:

1. **Private Variables**:
   Closures are often used to create private variables in JavaScript. This is one of the main reasons closures are powerful because they allow us to encapsulate and protect variables.

   ```javascript
   function counter() {
     let count = 0; // 'count' is a private variable

     return {
       increment: function () {
         count++;
         console.log(count);
       },
       decrement: function () {
         count--;
         console.log(count);
       },
     };
   }

   const myCounter = counter();
   myCounter.increment(); // 1
   myCounter.increment(); // 2
   myCounter.decrement(); // 1
   ```

2. **Function Factories**:
   You can create function factories using closures. These functions can remember and access parameters from their creation time.

   ```javascript
   function multiplyBy(factor) {
     return function (number) {
       return number * factor;
     };
   }

   const multiplyBy2 = multiplyBy(2);
   const multiplyBy3 = multiplyBy(3);

   console.log(multiplyBy2(5)); // 10
   console.log(multiplyBy3(5)); // 15
   ```

In this example, `multiplyBy` returns a function that "remembers" the `factor` passed to it, so when you call `multiplyBy2(5)` or `multiplyBy3(5)`, they remember the factor `2` and `3`, respectively.

### Conclusion:

A **closure** is an inner function that has access to variables from its outer (enclosing) function, even after that outer function has finished executing. Closures are a powerful tool in JavaScript, used for managing state, creating private variables, and building function factories, among other things.

---

---

## What is hoisting?

### What is **Hoisting** in JavaScript?

**Hoisting** is a JavaScript mechanism where **variables and function declarations are moved ("hoisted") to the top of their scope** (either the global scope or a function scope) during the **compilation phase**, before the code is executed.

However, **only the declarations are hoisted — not the initializations**.

---

### 🧠 In Simple Terms:

Before your code runs, JavaScript "prepares" it by moving **declarations** (not assignments) to the top of their scope. This allows you to use variables and functions **before** you define them (with some caveats).

---

### 1. **Variable Hoisting**

#### Example with `var`:

```javascript
console.log(a); // undefined
var a = 10;
```

**What happens under the hood:**

```javascript
var a; // declaration hoisted
console.log(a); // undefined
a = 10; // initialization happens later
```

So `a` is declared at the top, but its assignment happens in place.

#### `let` and `const`:

```javascript
console.log(b); // ReferenceError
let b = 20;
```

Variables declared with `let` and `const` are **not initialized** during hoisting. They are placed in a **"temporal dead zone" (TDZ)** — a state from the start of the block until the declaration is processed.

🛑 Accessing them before declaration throws a **ReferenceError**.

### 2. **Function Hoisting**

#### Function Declarations:

```javascript
greet(); // "Hello"

function greet() {
  console.log("Hello");
}
```

✅ Function declarations are **fully hoisted** — both the name and body.

#### Function Expressions:

```javascript
sayHi(); // TypeError: sayHi is not a function

var sayHi = function () {
  console.log("Hi");
};
```

Here’s why:

- The **variable** `sayHi` is hoisted (as `undefined`)
- The **assignment** (the actual function) is **not** hoisted
- So calling it before assignment gives a **TypeError**

### Summary Table:

| Declaration Type            | Hoisted?            | Initialized?      | Accessible Before Declaration? |
| --------------------------- | ------------------- | ----------------- | ------------------------------ |
| `var`                       | ✅ Yes              | ✅ As `undefined` | ✅ But `undefined`             |
| `let` / `const`             | ✅ Yes              | ❌ No             | ❌ Throws ReferenceError       |
| Function Declaration        | ✅ Yes              | ✅ Yes            | ✅                             |
| Function Expression (`var`) | ✅ (as `undefined`) | ❌ No             | ❌ TypeError or ReferenceError |

### Real-World Tip:

While hoisting is a core behavior, it's best **not to rely on it**. Declare variables and functions **before you use them** to keep your code readable and bug-free.

Let me know if you want to see how hoisting works inside a function or block scope!

---

---

## Explain this in different contexts.

Great question. The `this` keyword in JavaScript behaves differently depending on **how** and **where** it is used — its value is **determined by the execution context**, not where the function is written.

Let's walk through how `this` behaves in different contexts:

### 🧠 Summary Table: `this` in Different Contexts

| Context                           | Value of `this`                                           |
| --------------------------------- | --------------------------------------------------------- |
| Global Scope                      | Global object (`window` in browsers, `global` in Node.js) |
| Inside a Function (`non-strict`)  | Global object                                             |
| Inside a Function (`strict mode`) | `undefined`                                               |
| Object Method                     | The object that calls the method                          |
| Arrow Function                    | Inherits `this` from enclosing (lexical) scope            |
| Event Listener (`regular`)        | The DOM element that received the event                   |
| Event Listener (`arrow`)          | `this` is inherited from the enclosing scope              |
| Constructor Function              | A new instance (the object being created)                 |
| Class Method                      | The instance of the class                                 |
| `setTimeout` / `setInterval`      | Global object (or `undefined` in strict mode)             |
| `bind()`, `call()`, `apply()`     | Explicitly defined by those methods                       |

### 1. 🔁 **Global Context**

```javascript
console.log(this); // In browsers: Window, in Node.js: global
```

In the global scope:

- `this` refers to the **global object**

  - Browser: `window`
  - Node.js: `global`

### 2. 📦 **Inside a Regular Function**

#### Non-strict mode:

```javascript
function show() {
  console.log(this); // window (or global)
}
show();
```

#### Strict mode:

```javascript
"use strict";
function show() {
  console.log(this); // undefined
}
show();
```

### 3. 🧱 **Inside an Object Method**

```javascript
const obj = {
  name: "Alice",
  greet() {
    console.log(this.name); // 'Alice'
  },
};
obj.greet();
```

Here, `this` refers to the **object** that owns the method (`obj`).

### 4. 🎯 **Arrow Functions**

```javascript
const person = {
  name: "Bob",
  greet: () => {
    console.log(this.name); // undefined
  },
};
person.greet();
```

- Arrow functions **don’t have their own `this`**.
- They **inherit `this` from their lexical scope** (i.e., where they were defined).

Another example:

```javascript
function outer() {
  const arrow = () => {
    console.log(this);
  };
  arrow();
}

outer(); // 'this' will be whatever 'outer' sees — global in this case
```

### 5. 🧑‍🏭 **Constructor Function**

```javascript
function Person(name) {
  this.name = name;
}

const p1 = new Person("Charlie");
console.log(p1.name); // 'Charlie'
```

- Inside a constructor, `this` refers to the **new object** being created.

### 6. 🧪 **Class Context**

```javascript
class Car {
  constructor(make) {
    this.make = make;
  }
  showMake() {
    console.log(this.make);
  }
}

const car = new Car("Toyota");
car.showMake(); // 'Toyota'
```

- In class methods, `this` refers to the **instance**.

### 7. ⏱️ **Inside setTimeout / setInterval**

```javascript
setTimeout(function () {
  console.log(this); // In browser: window, in strict mode: undefined
}, 1000);
```

- `this` refers to the **global object** unless you're using `strict mode`.

To keep `this` referring to the outer context, use an arrow function:

```javascript
const obj = {
  name: "Timer",
  start() {
    setTimeout(() => {
      console.log(this.name); // 'Timer'
    }, 1000);
  },
};
obj.start();
```

### 8. 🎛️ **Using `bind()`, `call()`, `apply()`**

These methods allow **manual control** over what `this` refers to.

```javascript
function sayHi() {
  console.log(this.name);
}

const user = { name: "Dana" };

sayHi.call(user); // Dana
sayHi.apply(user); // Dana

const boundFunc = sayHi.bind(user);
boundFunc(); // Dana
```

### 9. 📍 **In DOM Event Handlers**

```javascript
document.querySelector("button").addEventListener("click", function () {
  console.log(this); // The button element
});
```

But with an arrow function:

```javascript
document.querySelector("button").addEventListener("click", () => {
  console.log(this); // Inherited from outer scope, likely `window`
});
```

#### ✅ Key Rule of Thumb:

- **Regular functions**: `this` is dynamic — it depends on how the function is **called**.
- **Arrow functions**: `this` is lexical — it depends on where the function is **defined**.

Would you like visual diagrams or an interactive playground-style explanation for this?

---

---

## What is the difference between call, apply, and bind?

## What are promises? Difference between .then and async/await.

## What is a polyfill? Give an example.

You're asking about **core JavaScript concepts**—excellent for mastering interviews or real-world JS development. Let’s break each one down in a **clear and practical way**:

---

## ✅ 1. **Difference Between `call`, `apply`, and `bind`**

These are **methods of Function.prototype** used to **explicitly set the `this` context** when invoking a function.

---

### 🔹 `call()`

- Calls the function **immediately**.
- Accepts arguments **one by one** after the `this` value.

```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "Alice" };

greet.call(person, "Hello", "!");
// Output: Hello, Alice!
```

---

### 🔹 `apply()`

- Like `call()`, but accepts arguments as an **array**.

```javascript
greet.apply(person, ["Hi", "..."]);
// Output: Hi, Alice...
```

---

### 🔹 `bind()`

- Returns a **new function** with `this` bound.
- **Does not call the function immediately**.

```javascript
const greetAlice = greet.bind(person, "Hey", "!!");
greetAlice();
// Output: Hey, Alice!!
```

---

### ✅ Summary Table:

| Method  | Calls function? | Pass arguments     | Returns new function? |
| ------- | --------------- | ------------------ | --------------------- |
| `call`  | ✅ Yes          | As separate values | ❌ No                 |
| `apply` | ✅ Yes          | As an array        | ❌ No                 |
| `bind`  | ❌ No           | As separate values | ✅ Yes                |

---

## ✅ 2. **What Are Promises?**

A **Promise** is an object representing the **future result** of an asynchronous operation.

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Data received");
  }, 1000);
});

promise.then((data) => console.log(data)); // Data received
```

### Promise States:

- **Pending**: Initial state.
- **Fulfilled**: Operation completed successfully (`resolve`).
- **Rejected**: Operation failed (`reject`).

---

## 🔄 `.then()` vs `async/await`

Both are used to handle **Promises**, but their syntax and readability differ.

### 🔹 `.then()`

```javascript
fetchData()
  .then((result) => {
    console.log(result);
    return process(result);
  })
  .then((final) => console.log(final))
  .catch((err) => console.error(err));
```

- Uses **chaining**.
- Can become **nested or messy** with complex flows (callback hell).

---

### 🔹 `async/await`

```javascript
async function load() {
  try {
    const result = await fetchData();
    const final = await process(result);
    console.log(final);
  } catch (err) {
    console.error(err);
  }
}

load();
```

- Cleaner, **looks synchronous**, but runs asynchronously.
- Requires functions to be marked with `async`.

---

### ✅ Comparison:

| Feature        | `.then()`                  | `async/await`               |
| -------------- | -------------------------- | --------------------------- |
| Syntax Style   | Chained `.then()` calls    | Synchronous-like            |
| Error Handling | `.catch()`                 | `try/catch` block           |
| Readability    | Can get messy with nesting | Cleaner and more readable   |
| Control Flow   | Slightly more complex      | Easier for sequential flows |

---

## ✅ 3. **What Is a Polyfill?**

A **polyfill** is a piece of code (usually JavaScript) that **implements a feature that’s not supported in older environments**, allowing developers to use modern features while ensuring compatibility.

---

### 🔹 Example: `Array.prototype.includes` Polyfill

`includes` is not available in old browsers like IE.

```javascript
if (!Array.prototype.includes) {
  Array.prototype.includes = function (element) {
    return this.indexOf(element) !== -1;
  };
}

const arr = [1, 2, 3];
console.log(arr.includes(2)); // true
```

This polyfill adds support for `.includes()` if it doesn’t already exist.

---

### 🔹 When Are Polyfills Used?

- Ensuring **backward compatibility** (e.g., for IE11).
- Using **modern APIs** like `fetch`, `Promise`, `Object.assign`, etc., in older environments.

---

### 💡 Pro Tip:

You can use tools like **Babel** or **core-js** to automatically add polyfills for unsupported features during build time.

---

## ✅ Recap:

| Concept                  | Summary                                                                          |
| ------------------------ | -------------------------------------------------------------------------------- |
| `call`/`apply`/`bind`    | Control `this`; `call`/`apply` invoke immediately, `bind` returns a new function |
| Promises                 | Handle async operations with `.then()` or `async/await`                          |
| `.then` vs `async/await` | Both handle Promises; `async/await` is more readable                             |
| Polyfill                 | Custom code to support modern features in old environments                       |

---

Let me know if you want code playground links, visuals, or live examples to test these!
