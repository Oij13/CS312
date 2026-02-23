import { useState } from "react";

export default function Sample() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Hello, World!");

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleMessageToggle = () => {
    setMessage(
      message === "Hello, World!" ? "Goodbye, World!" : "Hello, World!",
    );
  };

  return (
    <div>
      <h1 onClick={handleMessageToggle}>{message}</h1>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
