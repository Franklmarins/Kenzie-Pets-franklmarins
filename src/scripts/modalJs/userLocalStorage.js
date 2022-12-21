export const getLocalStorage = (user) => {
    const localUser = JSON.parse(localStorage.getItem(user)) || "";
    return localUser;
  };