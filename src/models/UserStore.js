import Observable from "./Observable";

export function UserStore() {
  const observable = new Observable({
    user: null
  });

  function updateLocalState({ user }) {
    observable.map(() => ({
      user,
      isAuthenticated: user != null
    }));
  }

  function setUser(user) {
    updateLocalState({user});
  }

  function isAuthenticated() {
    const { isAuthenticated } = observable.data;
    return isAuthenticated;
  }

  function getUser() {
    const { user } = observable.data;
    return user;
  }

  return {
    setUser,
    getUser,
    isAuthenticated,
    data: observable.data,
    addListener: observable.addListener,
    removeListener: observable.removeListener
  };
}
