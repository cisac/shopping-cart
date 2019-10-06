import React from "react";

export default function ListContainer({ children, className = "" }) {
  return <ul className={`list-container ${className}`}>{children}</ul>;
}
