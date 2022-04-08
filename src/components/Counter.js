import React, { useState } from "react";
import "./Counter.css";

const Counter = ({ initialValue }) => {
  // const [value, setValue] = useState(0);
  // const [value, setValue] = useState(initialValue);
  const [value, setValue] = useState(initialValue || 0);
  return (
    <div className="counter-wapper">
      <h1>counter</h1>
      <div className="counter">
      <div className="value-wapper">
        <div className="value">
          <h2>{value}</h2>
        </div>
        </div>
        <div className="count">
        <div className="addd">
          <button onClick={(e) => setValue(value + 1)}>
            <span>+</span>
          </button>
        </div>
        
        <div className="sub">
          <button 
          onClick={(e) => setValue(value ? value - 1 : value)}>
            <span>-</span>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Counter;
