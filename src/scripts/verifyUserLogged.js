import { getLocalStorage } from "../scripts/modalJs/userLocalStorage.js";

export const verifyUserLogged = () => {
  const user = getLocalStorage("user");

  if (user === "") {
    window.location.replace("/index.html");
  }
};
verifyUserLogged();
