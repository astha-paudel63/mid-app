import React, { useState } from "react";
import "./Counter.css";
import logo from '../pic/hello.gif';

const Counter = ({ initialValue, onChange }) => {
  // const [value, setValue] = useState(0);
  // const [value, setValue] = useState(initialValue);
  // const [value, setValue] = useState(initialValue || 0);
  return (
    <div className="counter-wapper">
<img src={logo} alt="loading..." />
    </div>
  );
};
export default Counter;
