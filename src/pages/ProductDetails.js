import React from "react";

import { Box, Flex, Button, ShoppingCartIcon } from "../components";
import { useStore } from "../models";

function ProductDetails({ stores, actions: { addToCart } }) {
  const { data: product, loading, error } = useStore(
    stores.currentProduct,
    "details"
  );

  if (loading) {
    return "Loading...";
  }
  if (error) {
    return `Error: ${error}`;
  }

  if (product == null) {
    return null;
  }

  return (
    <Flex className="product" flexDirection="column">
      <Box className="name">{product.name}</Box>
      <Box>{product.description}</Box>
      <Box className="price">price: {product.price}</Box>
      <Box>
        <Button onClick={addToCart(product)}>
          <ShoppingCartIcon />
          Add to cart
        </Button>
      </Box>
    </Flex>
  );
}

export default ProductDetails;
