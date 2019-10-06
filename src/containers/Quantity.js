import React from "react";
import { Button, Flex, Input } from "../components";

export default function Quantity({ value, onChange }) {
  return (
    <Flex className="quantity-widget">
      <Input type="number" value={value} width={3} onChange={onChange} />
      <Button onClick={() => onChange(Number(value) + 1)}>+</Button>
      <Button onClick={() => onChange(Number(value) - 1)}>-</Button>
    </Flex>
  );
}
