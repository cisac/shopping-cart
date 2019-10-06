import React, { Fragment } from "react";

import { useStore } from "./models";

import { NotFound } from "./pages";
import { NavBar } from "./containers";
import { routes } from "./router";

const Content = ({ viewStore }) => {
  const view = useStore(viewStore);

  const { name, ...rest } = view;

  const Component = (routes[name] && routes[name].component) || NotFound;

  return <Component {...rest} />;
};

const RouteRenderer = ({ viewStore }) => (
  <Fragment>
    <NavBar viewStore={viewStore} />
    <Content viewStore={viewStore} />
  </Fragment>
);

export default RouteRenderer;
