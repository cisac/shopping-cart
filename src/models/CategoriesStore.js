import Observable from "./Observable";
import { Gateway } from "../gateways";

export function CategoriesStore(gateway = Gateway("/categories")) {
  const observable = new Observable({ data: [], loading: false, error: null });
  let dataFetched = false;

  function selectCategory(category, selected, categories) {
    return categories.map(cat => {
      if (cat.name === category.name) {
        return { ...cat, selected };
      }
      return cat;
    });
  }

  function updateLocalState({ data, loading = false, error = null }) {
    observable.map(() => ({
      data,
      loading,
      error
    }));
  }

  async function fetch() {
    if (dataFetched) {
      return;
    }
    updateLocalState({ data: [], loading: true });
    try {
      const data = (await gateway.get()).map(cat => ({
        ...cat,
        selected: false
      }));
      updateLocalState({ data });
      dataFetched = true;
    } catch (error) {
      updateLocalState({ error });
    }
  }

  function addFilter(category, add) {
    const categories = selectCategory(category, add, observable.data.data);
    updateLocalState({ data: categories });
  }

  return {
    fetch,
    addFilter,
    data: observable.data,
    addListener: observable.addListener,
    removeListener: observable.removeListener
  };
}
