"use client";

import { useState } from "react";

export default function CounterProduct() {
  const [counter, setCounter] = useState(1);

  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const decrement = () => {
    setCounter((prevCounter) => Math.max(prevCounter - 1, 1)); // جلوگیری از کاهش به زیر 1
  };

  return (
    <>
      <div>
        <button onClick={increment}>+</button>
        <span>{counter}</span>
        <button onClick={decrement}>-</button>
      </div>
    </>
  );
}
