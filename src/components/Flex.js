import React from "react";

export default function Flex({
  children,
  className,
  flex,
  flexDirection,
  alignItems,
  justifyContent,
  width,
  height,
  margin,
  padding
}) {
  const style = {
    display: "flex",
    flexDirection,
    alignItems,
    justifyContent,
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
