import React from "react";
import { ReactComponent as CartSvg } from "../icons/shopping-cart.svg";
import { Box, Flex } from "../components";

export default function ShoppingCart({ items }) {
  return (
    <Flex
      className="shopping-cart-widget"
      alignItems="center"
      justifyContent="center"
    >
      <CartSvg width={20} height={20} />
      <Box display="inline-block">{items}</Box>
    </Flex>
  );
}
