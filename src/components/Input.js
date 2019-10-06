import React from "react";
import Flex from "./Flex";

export default function Input({
  value,
  type = "text",
  label = "",
  onChange,
  width
}) {
  const w = width && `${width}rem`;
  return (
    <Flex className={`input-${type}`}>
      <label htmlFor={`input-${type}`}>{label}</label>
      <input
        style={{ width: w }}
        type={type}
        value={value}
        name={`input-${type}`}
        onChange={({ target: { value } }) => onChange && onChange(value)}
      />
    </Flex>
  );
}
