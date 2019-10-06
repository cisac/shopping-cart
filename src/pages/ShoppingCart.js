import React from "react";

import { Button, Box, Flex, ListContainer } from "../components";
import { Quantity } from "../containers";
import { useStore } from "../models";

function Checkout({ data, actions: { checkout } }) {
  const total = data.reduce(
    (acc, product) => acc + product.price * product.count,
    0
  );
  return (
    <Box className="total">
      <Box>Total {total}</Box>
      <Button onClick={checkout()}>Checkout</Button>
    </Box>
  );
}

function ShoppingCartItem({
  product,
  actions: { removeFromCart, setQuantity }
}) {
  return (
    <li key={product.id} className="shopping-cart-item">
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Box className="name" padding="5px">
          {product.name}
        </Box>
        <Flex padding="5px">
          <Quantity
            value={product.count}
            onChange={v => setQuantity(product, v)}
          />
          <Box className="price">{`${product.count * product.price}$`}</Box>
        </Flex>
        <Button onClick={removeFromCart(product)}>Remove</Button>
      </Flex>
    </li>
  );
}

export default function ShoppingCart({ stores, actions }) {
  const { data } = useStore(stores.shoppingCart, "shoppingCart");

  return (
    <React.Fragment>
      <ListContainer>
        {data.map(product => (
          <ShoppingCartItem
            key={product.id}
            product={product}
            actions={actions}
          />
        ))}
      </ListContainer>
      <Checkout data={data} actions={actions} />
    </React.Fragment>
  );
}
