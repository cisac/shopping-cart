import Observable from "./Observable";
import { Gateway } from "../gateways";

export function ProductsStore(gateway = Gateway("/products")) {
  const observable = new Observable({
    data: [],
    allData: [],
    loading: false,
    error: null
  });

  let selectedCategoryIds = [];

  function updateLocalState({ data, allData, loading = false, error = null }) {
    observable.map(() => ({
      data,
      allData,
      loading,
      error
    }));
  }

  async function fetch() {
    updateLocalState({ data: [], allData: [], loading: true });
    try {
      const allData = await gateway.get();

      const filteredItems = internalCategoriesFilter(allData);
      updateLocalState({ data: filteredItems, allData });
    } catch (error) {
      updateLocalState({ error });
    }
  }

  function getProduct(productId) {
    const { allData } = observable.data;
    return allData.find(product => product.id === productId);
  }

  function internalCategoriesFilter(data) {
    return (data || []).filter(
      p =>
        selectedCategoryIds.includes(p.category) ||
        selectedCategoryIds.length === 0
    );
  }

  function filterByCategories(data) {
    selectedCategoryIds = (data.data || [])
      .filter(cat => cat.selected)
      .map(cat => cat.id);

    const filteredItems = internalCategoriesFilter(observable.data.allData);
    updateLocalState({ data: filteredItems, allData: observable.data.allData });
  }

  return {
    fetch,
    getProduct,
    filterByCategories,
    data: observable.data,
    addListener: observable.addListener,
    removeListener: observable.removeListener
  };
}
