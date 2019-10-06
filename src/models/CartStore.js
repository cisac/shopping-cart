import Observable from "./Observable";

export function CartStore() {
  const observable = new Observable({ data: [] });

  function add(item) {
    observable.map(({ data }) => {
      const idx = data.findIndex(d => d.id === item.id);
      if (idx !== -1) {
        data[idx].count = data[idx].count + 1;
      } else {
        data.push({ ...item, count: 1 });
      }
      return { data };
    });
  }

  function remove({ id }) {
    observable.map(({ data }) => ({ data: data.filter(d => d.id !== id) }));
  }

  function updateProductQty(product, qty) {
    if (qty === 0) {
      remove(product);
      return;
    }
    observable.map(({ data }) => {
      const idx = data.findIndex(d => d.id === product.id);
      if (idx !== -1) {
        data[idx].count = qty;
      } else {
        data.push({ ...product, count: qty });
      }
      return { data };
    });
  }

  return {
    add,
    remove,
    updateProductQty,
    data: observable.data,
    addListener: observable.addListener,
    removeListener: observable.removeListener
  };
}
