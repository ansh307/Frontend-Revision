# React

## Difference between functional and class components.

## What are hooks? Why were they introduced?

### Difference Between Functional and Class Components

In React, there are two types of components: **functional components** and **class components**. Here's how they differ:

#### 1. **Syntax**

- **Functional Components**: These are simpler, stateless components that are written as JavaScript functions.

  Example:

  ```jsx
  function Hello() {
    return <h1>Hello, World!</h1>;
  }
  ```

- **Class Components**: These are more complex components that are written as ES6 classes and require a `render` method to return JSX.

  Example:

  ```jsx
  class Hello extends React.Component {
    render() {
      return <h1>Hello, World!</h1>;
    }
  }
  ```

#### 2. **State and Lifecycle Methods**

- **Functional Components**: Initially, functional components were stateless and didn’t have access to lifecycle methods. However, with the introduction of **Hooks**, they can now manage state and perform side effects.

- **Class Components**: Class components can manage state natively using the `this.state` object and can access lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

#### 3. **Performance**

- **Functional Components**: Generally, functional components are more lightweight, as they are simpler to write and do not require the overhead of a class.

- **Class Components**: They tend to be more heavy-duty because they involve extra boilerplate (e.g., `constructor`, `this.state`, `this.setState`, `render`).

#### 4. **Use of `this` Keyword**

- **Functional Components**: Do not use the `this` keyword, which makes them easier to understand and less prone to errors.

- **Class Components**: Use the `this` keyword to refer to the component instance, making them more prone to errors (e.g., binding methods to `this`).

#### 5. **Readability & Conciseness**

- **Functional Components**: More concise, easier to read, and less boilerplate code.

- **Class Components**: More verbose due to the need for methods and binding.

---

---

### Hooks in React

#### What Are Hooks?

**Hooks** are JavaScript functions that allow functional components to "hook into" React features like state and lifecycle methods. They allow functional components to manage state, perform side effects, context, and more.

#### Why Were Hooks Introduced?

Hooks were introduced in **React 16.8** to:

1. **Simplify Code**: Prior to hooks, managing state and side effects in functional components was not possible, so developers had to use class components. Hooks allow functional components to do the same things, but with less boilerplate and more flexibility.
2. **Encourage Reusability**: Hooks enable the reuse of stateful logic between components without the need for higher-order components or render props.
3. **Better Composability**: Hooks make it easier to compose logic and extract it into reusable functions.

#### Commonly Used Hooks

- **useState**: Allows functional components to use state.

  Example:

  ```jsx
  const [count, setCount] = useState(0);
  ```

- **useEffect**: Performs side effects (e.g., fetching data, subscribing to events, etc.).

  Example:

  ```jsx
  useEffect(() => {
    console.log("Component Mounted");
  }, []);
  ```

- **useContext**: Allows access to context in functional components.

  Example:

  ```jsx
  const value = useContext(MyContext);
  ```

- **useReducer**: A more advanced version of `useState`, used for managing complex state logic.

- **useRef**: Allows you to persist values across renders without causing a re-render.

In short, **Hooks** were introduced to enable functional components to handle more complex functionality like managing state and lifecycle methods, without the need to resort to class components. This promotes cleaner, more maintainable, and reusable code.

---

---

### 🔁 `useEffect` Dependencies in React

The `useEffect` Hook is used to run **side effects** in functional components — things like data fetching, subscriptions, DOM manipulations, etc.

```js
useEffect(() => {
  // side effect logic
}, [dependencies]);
```

#### ✅ What Are Dependencies in `useEffect`?

The **dependency array** (second argument to `useEffect`) tells React **when to run the effect**.

---

#### 📌 Scenarios Based on Dependencies:

| Dependency Array        | Behavior                                                               |
| ----------------------- | ---------------------------------------------------------------------- |
| `[]`                    | Runs **once** after the initial render (componentDidMount equivalent). |
| `[var1, var2]`          | Runs on mount + **whenever `var1` or `var2` change**.                  |
| _(no dependency array)_ | Runs **after every render**, including updates.                        |

---

#### ⚠️ Important Notes:

- Dependencies must include **all variables** used inside the `useEffect` **that come from the component’s scope** (like props, state, or context).
- You can **disable lint warnings**, but it’s better to fix dependencies properly to avoid bugs.

---

---

### 🎯 Preventing Unnecessary Re-renders in React

Unnecessary re-renders hurt performance, especially in large applications. Here are techniques to avoid them:

---

#### 1. **Properly Use `useEffect` Dependencies**

Only include the **necessary** variables in the dependency array to avoid triggering effects on unrelated updates.

---

#### 2. **Memoize Expensive Computations with `useMemo`**

```js
const computedValue = useMemo(() => expensiveCalc(input), [input]);
```

This avoids recalculating `expensiveCalc()` unless `input` changes.

---

#### 3. **Stabilize Functions with `useCallback`**

```js
const memoizedHandler = useCallback(() => {
  // logic
}, [dependency]);
```

Prevents re-creating functions on every render — useful when passing callbacks to child components.

---

#### 4. **Use `React.memo` for Functional Components**

```js
const MyComponent = React.memo(function MyComponent(props) {
  // ...
});
```

Prevents a component from re-rendering unless its **props** change.

---

#### 5. **Avoid Inline Functions and Objects in JSX**

Every render creates new function/object references.

Bad:

```js
<MyComponent onClick={() => doSomething()} />
```

Better:

```js
const handleClick = useCallback(() => doSomething(), []);
<MyComponent onClick={handleClick} />;
```

---

#### 6. **Split Large Components**

Break large components into smaller ones to reduce the surface area of what triggers a re-render.

---

### ✅ Summary

- **`useEffect` dependencies** determine when side effects run. Keep the array accurate to avoid bugs or unnecessary calls.
- To **prevent re-renders**, focus on stabilizing values and props using `useMemo`, `useCallback`, and `React.memo`.

Let me know if you want real examples or code demos.

---

---

Great set of questions — these are essential concepts for anyone working with React.

---

## 🔄 **Context API vs Redux vs Zustand**

All three are **state management** solutions in React — but they differ in purpose, complexity, and scalability.

### ⚛️ **Context API**

- Built-in React feature for **prop drilling avoidance**.
- Best for **lightweight**, **global data** like theme, auth, language, etc.
- Introduced in React 16.3.

#### ✅ Pros:

- No extra libraries.
- Simple API: `createContext`, `Provider`, `useContext`.

#### ❌ Cons:

- Not optimized for frequent updates (causes **re-renders** of all consumers).
- Can get messy for complex state logic.

#### Use Case:

- Theme toggles, authentication status, user preferences.

---

### 🛠️ **Redux**

- **External library** for **centralized state management**.
- Uses **actions**, **reducers**, and a **single store**.

#### ✅ Pros:

- Predictable state management.
- Great dev tools (Redux DevTools).
- Scales well for large apps.

#### ❌ Cons:

- Verbose boilerplate.
- Requires setup (store, reducers, actions, etc.).
- Overkill for small projects.

#### Use Case:

- Complex, large-scale applications with many shared state concerns.

---

### ⚡ **Zustand**

- Lightweight **alternative to Redux**, built by the creators of Jotai and React Spring.
- **Minimal API**, no boilerplate — just hooks.

#### ✅ Pros:

- Simple: `create` a store, use it with hooks.
- Local & global state in one place.
- Supports **selector-based subscriptions** → fewer re-renders.
- Built-in **middleware support** (e.g., dev tools, persistence).

#### ❌ Cons:

- Smaller ecosystem.
- Less opinionated (good or bad depending on your team).

#### Use Case:

- Apps needing global state with less complexity than Redux.

---

### 🔍 Summary Table

| Feature       | Context API        | Redux                      | Zustand              |
| ------------- | ------------------ | -------------------------- | -------------------- |
| Built-in      | ✅ Yes             | ❌ No                      | ❌ No                |
| Boilerplate   | ❌ Minimal         | ❌ High                    | ✅ Minimal           |
| Performance   | ❌ Can re-render   | ✅ Optimized               | ✅ Highly optimized  |
| DevTools      | ❌ No              | ✅ Yes                     | ✅ Yes               |
| Async Support | ❌ Manual          | ✅ Middleware (thunk/saga) | ✅ Native            |
| Best for      | Small global state | Large app state            | Medium to large apps |

---

---

## 🧠 Reconciliation & Virtual DOM

These are **core concepts** behind how React updates the UI efficiently.

---

### 🪞 **Virtual DOM**

- React **does not directly manipulate the DOM**.
- Instead, it uses a **virtual DOM** — a lightweight copy of the actual DOM stored in memory.

#### Workflow:

1. You call `setState` → React updates the **virtual DOM**.
2. React compares the **new virtual DOM** with the **previous one**.
3. Finds the **difference (diff)**.
4. Applies only the **minimal set of changes** to the real DOM.

This is faster than manipulating the actual DOM directly, which is expensive.

---

### 🔁 **Reconciliation**

- Reconciliation is the **process of comparing** the previous virtual DOM with the new one and **figuring out what changed**.
- Uses a **diffing algorithm** to:

  - Match old elements to new ones.
  - Reuse nodes when possible.
  - Replace only the parts that changed.

#### Key Concepts in Reconciliation:

- **Keys** help identify which items have changed, especially in lists.
- React assumes **elements with different keys are different**.

---

### Example:

```jsx
<ul>
  <li key="a">A</li>
  <li key="b">B</li>
</ul>
```

If we update the list to:

```jsx
<ul>
  <li key="b">B</li>
  <li key="a">A</li>
</ul>
```

With correct `key` usage, React will **reorder** the nodes instead of deleting and re-creating them.

---

### ✅ Summary

| Term           | Meaning                                                              |
| -------------- | -------------------------------------------------------------------- |
| Virtual DOM    | In-memory representation of the real DOM                             |
| Reconciliation | The process of comparing virtual DOM trees and updating the real DOM |

---

Let me know if you’d like visuals, code examples, or performance comparisons!

---

---

### ✅ **Controlled vs Uncontrolled Components in React**

These terms describe **how form elements (like `<input>`, `<textarea>`, `<select>`) are managed** in a React component.

---

## 1. 🎮 **Controlled Components**

> The form element’s **value is controlled by React state**.

### 📌 Characteristics:

- The value is tied to a **state variable** via `useState` or other state management.
- You control the input using `value` and `onChange`.

### 🧠 Example:

```jsx
function ControlledInput() {
  const [name, setName] = useState("");

  return (
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
  );
}
```

### ✅ Pros:

- Easier to **validate**, **format**, or **condition** the input.
- Data is always in sync with the component state.
- Enables features like real-time validation or conditional logic.

### ❌ Cons:

- Slightly more boilerplate.
- Re-renders on every keystroke (not usually a performance issue).

---

## 2. 🎯 **Uncontrolled Components**

> The form element **manages its own internal state** — React doesn’t control the value directly.

### 📌 Characteristics:

- Use **refs** to access the value.
- No `value` or `onChange` handler in the JSX.

### 🧠 Example:

```jsx
function UncontrolledInput() {
  const inputRef = useRef();

  const handleSubmit = () => {
    alert(inputRef.current.value);
  };

  return (
    <>
      <input type="text" ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
```

### ✅ Pros:

- Simpler for **quick forms** or when you don't need to track input changes.
- **Fewer re-renders**, since React doesn’t manage the value.

### ❌ Cons:

- Harder to implement validation or logic based on the input value.
- Less predictable, harder to debug.

---

## 🔍 Key Differences Table

| Feature                 | Controlled Component      | Uncontrolled Component     |
| ----------------------- | ------------------------- | -------------------------- |
| Value source            | React state (`useState`)  | DOM (`useRef`)             |
| Input updates           | Via `onChange`            | Direct user input          |
| React control           | Full                      | Minimal                    |
| Use case                | Complex forms, validation | Simple forms, quick inputs |
| Validation & formatting | Easy                      | Harder                     |
| Boilerplate code        | More                      | Less                       |

---

## ✅ When to Use What?

| Use Case                          | Recommendation              |
| --------------------------------- | --------------------------- |
| You need validation or formatting | **Controlled**              |
| You need real-time input tracking | **Controlled**              |
| Basic form without state handling | **Uncontrolled**            |
| Working with 3rd-party DOM libs   | **Uncontrolled** might help |

---

Let me know if you want a comparison in a live demo or project setup.
