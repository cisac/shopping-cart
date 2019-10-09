import Observable from "./Observable";

import { ProductsStore } from "./ProductsStore";
import { ProductDetailStore } from "./ProductDetailStore";
import { CartStore } from "./CartStore";
import { CategoriesStore } from "./CategoriesStore";
import { UserStore } from "./UserStore";

const cartStore = CartStore();
const productsStore = ProductsStore();
const productDetailStore = ProductDetailStore();
const categoriesStore = CategoriesStore();
const userStore = UserStore();

if (process.env.NODE_ENV === "development") {
  window.productsStore = productsStore;
  window.cartStore = cartStore;
  window.productDetailStore = productDetailStore;
  window.categoriesStore = categoriesStore;
  window.userStore = userStore;
}

const stores = {
  products: {
    data: productsStore.data,
    addListener: productsStore.addListener,
    removeListener: productsStore.removeListener
  },
  shoppingCart: {
    data: cartStore.data,
    addListener: cartStore.addListener,
    removeListener: cartStore.removeListener
  },
  currentProduct: {
    data: productDetailStore.data,
    addListener: productDetailStore.addListener,
    removeListener: productDetailStore.removeListener
  },
  categories: {
    data: categoriesStore.data,
    addListener: categoriesStore.addListener,
    removeListener: categoriesStore.removeListener
  },
  user: {
    data: userStore.data,
    addListener: userStore.addListener,
    removeListener: userStore.removeListener
  }
};

const homeView = viewStore => ({
  name: "home",
  stores,
  actions: {
    showProduct: productId => () => viewStore.showProduct(productId),
    addToCart: product => () => cartStore.add(product),
    filterProducts: category => add => categoriesStore.addFilter(category, add)
  }
});

const shoppingCartView = viewStore => ({
  name: "shopping-cart",
  stores,
  actions: {
    removeFromCart: product => () => cartStore.remove(product),
    setQuantity: (product, qty) => cartStore.updateProductQty(product, qty),
    checkout: () => viewStore.showCheckout()
  }
});

const productDetailView = (product, productId) => ({
  name: "product-details",
  params: { productId },
  stores,
  actions: {
    addToCart: product => () => cartStore.add(product)
  }
});

const loginView = viewStore => ({
  name: "login",
  stores,
  hideNavBar: true,
  actions: {
    login: (user, password) => viewStore.performLogin(user, password)
  }
});

const checkoutView = viewStore => ({
  name: "checkout",
  stores,
  actions: {}
});

function ViewStore() {
  let currentView = { name: "init" };
  const observable = new Observable(currentView);

  (function init() {
    categoriesStore.addListener(data => {
      productsStore.filterByCategories(data);
    });
  })();

  function shouldUpdateView(view) {
    // TODO: deep strict equal for view.params
    if (currentView.name !== view.name || currentView.params !== view.params) {
      return true;
    }
    return false;
  }

  const updateView = view => {
    if (shouldUpdateView(view)) {
      currentView = view;
      observable.map(() => view);
      return true;
    }
    return false;
  };

  function showHome() {
    if (updateView(homeView(this))) {
      productsStore.fetch();
      categoriesStore.fetch();
    }
  }

  function showProduct(productId) {
    const product = {};

    if (updateView(productDetailView(product, productId))) {
      productDetailStore.fetch(productId);
    }
  }

  function showCart() {
    updateView(shoppingCartView(this));
  }

  function showCheckout() {
    if (isAuthenticated()) {
      updateView(checkoutView(this));
    } else {
      this.nextView = "checkout";
      this.showLogin();
    }
  }

  function showLogin() {
    updateView(loginView(this));
  }

  function performLogin(user, password) {
    if (user === "john" && password === "doe") {
      userStore.setUser(user);
      if (this.nextView === "checkout") {
        this.showCheckout();
      } else {
        this.showHome();
      }
    }
  }

  function performLogout() {
    userStore.setUser(null);
    this.showHome();
  }

  function isAuthenticated() {
    return userStore.isAuthenticated();
  }

  return {
    stores,
    showHome,
    showCart,
    showProduct,
    showCheckout,
    showLogin,
    performLogin,
    performLogout,
    isAuthenticated,
    data: observable.data,
    addListener: observable.addListener,
    removeListener: observable.removeListener
  };
}

export default ViewStore;
