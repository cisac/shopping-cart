import React from "react";
import { ReactComponent as CartSvg } from "../icons/shopping-cart.svg";

export default function ShoppingCartIcon({ size = 20 }) {
  return <CartSvg width={size} height={size} />;
}
