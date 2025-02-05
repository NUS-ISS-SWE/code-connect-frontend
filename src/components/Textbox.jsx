import React from "react";

const Textbox = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: "100%",
      }}
    />
  );
};

export default Textbox;
