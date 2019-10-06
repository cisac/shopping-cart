import { Home, ProductDetails, ShoppingCart, Login } from "../pages";

export const routesArray = [
  { name: "home", path: "/", component: Home },
  {
    name: "product-details",
    path: "/product-details/:productId",
    component: ProductDetails
  },
  { name: "shopping-cart", path: "/shopping-cart", component: ShoppingCart },
  { name: "login", path: "/login", component: Login }
];

export const routes = routesArray.reduce((acc, v) => {
  acc[v.name] = v;
  return acc;
}, {});
