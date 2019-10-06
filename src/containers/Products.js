import React from "react";

import { Button, Box, Flex, Link, ListContainer } from "../components";
import { useStore } from "../models";

function Product({ product, actions: { showProduct, addToCart } }) {
  return (
    <Flex className="product" flexDirection="column" flex="0 0 45%">
      <Box>
        <Link
          to={`/product-details/${product.id}`}
          onClick={showProduct(product.id)}
        >
          <Box className="name">{product.name}</Box>
        </Link>
        <Box className="price">{`${product.price}$`}</Box>
      </Box>
      <Box>
        <Button onClick={addToCart(product)}>Add to cart</Button>
      </Box>
    </Flex>
  );
}

function Products({ stores, actions }) {
  const { data, loading, error } = useStore(stores.products, "products");

  if (loading) {
    return "Loading...";
  }
  if (error) {
    return `Error: ${error}`;
  }
  return (
    <ListContainer className="product-list">
      {data.map(product => (
        <Product key={product.id} product={product} actions={actions} />
      ))}
    </ListContainer>
  );
}

export default Products;
