import React from "react";

import { startRouter } from "./router";
import { ViewStore } from "./models";
import RouteRenderer from "./RouteRenderer";
import { Box } from "./components";

const viewStore = ViewStore();

window.viewStore = viewStore;

startRouter(viewStore);

function App() {
  return (
    <Box className="App">
      <RouteRenderer viewStore={viewStore} />
    </Box>
  );
}

export default App;
