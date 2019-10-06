function Observable(data) {
  let _data = data;
  const _observers = [];

  function addListener(listener) {
    const index = _observers.findIndex(obs => obs === listener);
    if (index === -1) {
      _observers.push(listener);
      if (_data) {
        listener(_data);
      }
    }
  }

  function removeListener(listener) {
    const index = _observers.findIndex(obs => obs === listener);
    if (index !== -1) {
      _observers.splice(index, 1);
    }
  }

  function notify(data) {
    _observers.forEach(observer => observer(data));
  }

  function map(f) {
    _data = f(_data);
    notify(_data);
  }

  const observable = {
    map,
    addListener,
    removeListener
  };

  Object.defineProperty(observable, "data", {
    get() {
      return _data;
    }
  });

  return observable;
}

export default Observable;
