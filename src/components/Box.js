import React from "react";

export default function Box({
  children,
  className,
  display,
  flex,
  width,
  height,
  margin,
  padding
}) {
  const style = {
    display,
    flex,
    width,
    height,
    margin,
    padding
  };
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
