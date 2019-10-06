import React from "react";

const Link = ({ to, onClick, children, isActive }) => (
  <a
    href={to}
    onClick={e => {
      e.preventDefault();
      onClick && onClick();
    }}
    className={isActive ? "active" : null}
  >
    {children}
  </a>
);

export default Link;
