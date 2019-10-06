import React from "react";

import ShoppingCart from "./ShoppingCart";
import { Link } from "../components";
import { useStore } from "../models";

function NavBar({ viewStore }) {
  const { stores } = viewStore;
  const { data } = useStore(stores.shoppingCart, "navbar");
  const { name, hideNavBar } = useStore(viewStore);
  if (hideNavBar) {
    return null;
  }

  const shoppingCartLen = data.length;

  return (
    <nav>
      <ul>
        <li>
          <Link
            to="/"
            onClick={() => viewStore.showHome()}
            isActive={name === "home"}
          >
            A Shopping Cart
          </Link>
        </li>
        <li className="right">
          <Link
            to="/login"
            onClick={() => viewStore.login()}
            isActive={name === "login"}
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/shopping-cart"
            onClick={() => viewStore.showCart()}
            isActive={name === "shopping-cart"}
          >
            <ShoppingCart items={shoppingCartLen} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
