import { requestLogin, requestRegister } from "./modalRequest.js";

export function formRegister() {
  const form = document.createElement("form");
  form.classList = "flex flex-col gap items-center";

  const h2 = document.createElement("h2");
  h2.innerText = "Cadastre-se agora!";
  h2.classList = "modal-title";

  const inputUsername = document.createElement("input");
  inputUsername.placeholder = "Insira seu usuário...";
  inputUsername.classList = "modal-inputs";
  inputUsername.required = "true";

  const inputEmail = document.createElement("input");
  inputEmail.placeholder = "Insira seu email...";
  inputEmail.type = "email";
  inputEmail.classList = "modal-inputs";
  inputEmail.required = "true";

  const inputAvatarUrl = document.createElement("input");
  inputAvatarUrl.placeholder = "Insira o link do seu avatar";
  inputAvatarUrl.classList = "modal-inputs";
  inputAvatarUrl.required = "true";

  const inputPassword = document.createElement("input");
  inputPassword.placeholder = "Insira sua senha...";
  inputPassword.type = "password";
  inputPassword.classList = "modal-inputs";
  inputPassword.required = "true";

  const buttonRegister = document.createElement("button");
  buttonRegister.innerText = "Registrar";
  buttonRegister.type = "submit";
  buttonRegister.classList = "modal-btn";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const body = {
      name: inputUsername.value,
      email: inputEmail.value,
      password: inputPassword.value,
      avatar_url: inputAvatarUrl.value,
    };
    requestRegister(body);
  });

  form.append(
    h2,
    inputUsername,
    inputEmail,
    inputAvatarUrl,
    inputPassword,
    buttonRegister
  );

  return form;
}

export function formLogin() {
  const form = document.createElement("form");
  form.classList = "modal-login flex flex-col gap items-center justify-between";

  const h2 = document.createElement("h2");
  h2.innerText = "Login";
  h2.classList = "modal-title";

  const inputEmail = document.createElement("input");
  inputEmail.placeholder = "Insira seu email...";
  inputEmail.type = "email";
  inputEmail.classList = "modal-inputs";
  inputEmail.required = "true";

  const inputPassword = document.createElement("input");
  inputPassword.placeholder = "Insira sua senha...";
  inputPassword.type = "password";
  inputPassword.classList = "modal-inputs";
  inputPassword.required = "true";

  const buttonLogin = document.createElement("button");
  buttonLogin.innerText = "Entrar";
  buttonLogin.type = "submit";
  buttonLogin.classList = "modal-btn";

  const pError = document.createElement("p");
  pError.innerText = "Oops! Verifique se o email ou senha estão corretos...";
  pError.classList = "error-message";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const body = {
      email: inputEmail.value,
      password: inputPassword.value,
    };

    requestLogin(body, pError, buttonLogin);
  });

  form.append(h2, inputEmail, inputPassword, pError, buttonLogin);

  return form;
}
