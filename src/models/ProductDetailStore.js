import Observable from "./Observable";
import { Gateway } from "../gateways";

export function ProductDetailStore(gateway = Gateway("/products")) {
  const observable = new Observable({
    product: {},
    loading: false,
    error: null
  });

  function updateLocalState({ data, loading = false, error = null }) {
    observable.map(() => ({
      data,
      loading,
      error
    }));
  }

  async function fetch(productId) {
    updateLocalState({ data: {}, loading: true });
    try {
      const data = await gateway.getById(productId);
      updateLocalState({ data });
    } catch (error) {
      updateLocalState({ error });
    }
  }

  return {
    fetch,
    data: observable.data,
    addListener: observable.addListener,
    removeListener: observable.removeListener
  };
}
