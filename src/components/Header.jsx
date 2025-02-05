import React from "react";

const Header = ({text}) => {
  return (
    <header style={{ background: "#333", color: "#fff", padding: "10px" }}>
      <h1>{text}</h1>
    </header>
  );
};

export default Header;

