import React from "react";
import Flex from "./Flex";

export default function Checkbox({ value, label, onChange }) {
  return (
    <Flex className="checkbox">
      <label htmlFor={label}>{label}</label>
      <input
        type="checkbox"
        id={label}
        name={label}
        value={value}
        checked={value}
        onChange={({ target: { checked } }) => onChange(checked)}
      />
    </Flex>
  );
}
