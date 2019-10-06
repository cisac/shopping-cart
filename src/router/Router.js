import createRouter from "router5";
import loggerPlugin from "router5-plugin-logger";
import browserPlugin from "router5-plugin-browser";

import { routesArray } from "./routes";

function observeRouter(router, viewStore) {
  router.subscribe(({ route, previousRoute }) => {
    const { name, params } = route;
    const { name: previousName } = previousRoute || { name: null };
    if (name === previousName) {
      return;
    }
    switch (name) {
      case "home":
        viewStore.showHome();
        break;
      case "categories":
        viewStore.showCategories();
        break;
      case "product-details":
        viewStore.showProduct(params.productId);
        break;
      case "shopping-cart":
        viewStore.showCart();
        break;
      default:
    }
  });
}

export function startRouter(viewStore, updateEvent) {
  const router = createRouter(routesArray);

  router.usePlugin(browserPlugin());
  if (process.env.NODE_ENV === "development") {
    router.usePlugin(loggerPlugin);
  }

  observeRouter(router, viewStore);

  router.start();

  viewStore.addListener(view => {
    if (!router.isActive(view.name, view.params)) {
      router.navigate(view.name, view.params);
    }
  });

  return router;
}
