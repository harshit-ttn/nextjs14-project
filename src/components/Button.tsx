import React from "react";

const Button: React.FC<any> = ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
);

export default Button;
