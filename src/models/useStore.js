import { useState, useEffect } from "react";

export default function useStore(store) {
  const [data, setData] = useState(store.data);

  useEffect(() => {
    function setStore(s) {
      setData(s);
    }
    store.addListener(setStore);

    return function cleanup() {
      store.removeListener(setStore);
    };
  }, [store]);

  return data;
}
