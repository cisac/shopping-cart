import React from "react";

import { Checkbox, ListContainer } from "../components";
import { useStore } from "../models";

function Category({ category, actions: { filterProducts } }) {
  return (
    <li className="category">
      <Checkbox
        onChange={filterProducts(category)}
        label={category.name}
        value={category.selected}
      />
    </li>
  );
}

function Categories({ stores, actions }) {
  const { data, loading, error } = useStore(stores.categories, "categories");

  if (loading) {
    return "Loading...";
  }
  if (error) {
    return `Error: ${error}`;
  }
  return (
    <ListContainer className="categories">
      {data.map(category => (
        <Category key={category.id} category={category} actions={actions} />
      ))}
    </ListContainer>
  );
}

export default Categories;
