import { openModal } from "../modalJs/modal.js";
import { formLogin, formRegister } from "../modalJs/forms.js";
import { renderPetsInHome } from "../cardsJs/renderCard.js";

let btns_header = [...document.querySelectorAll("[data-btn-header]")];
let btn_menu = document.querySelector(".btn_menu");
let div_btns_header = document.querySelector(".btns_header");
let dropdown_hide = document.querySelector(".fa-xmark");
let dropdown_appear = document.querySelector(".fa-bars");
let linkLogin = document.querySelector(".link_login");
let btn_signup_info = document.querySelector(".btn-signup-info");
let dogdiv = document.querySelector(".dog-div");
let catdiv = document.querySelector(".cat-div");
let othersdiv = document.querySelector(".others-div");
let spinner = document.querySelector(".spinner");

if (linkLogin === null) {
} else {
  linkLogin.addEventListener("click", function () {
    openModal(formLogin());
  });

  btn_signup_info.addEventListener("click", function () {
    openModal(formRegister());
  });

  dogdiv.addEventListener("click", function () {
    spinner.classList.add("appear");
    renderPetsInHome("Cachorro");
  });

  catdiv.addEventListener("click", function () {
    spinner.classList.add("appear");
    renderPetsInHome("Gato");
  });

  othersdiv.addEventListener("click", function () {
    spinner.classList.add("appear");
    renderPetsInHome("Others");
  });
  spinner.classList.add("appear");
  renderPetsInHome("All");
}
btns_header.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (btn.getAttribute("data-btn-header") == "login") {
      openModal(formLogin());
    } else {
      openModal(formRegister());
    }
  })
);

btn_menu.addEventListener("click", function () {
  div_btns_header.classList.toggle("appear");
  dropdown_hide.classList.toggle("appear");
  dropdown_appear.classList.toggle("hide");
});

function removeSpinner() {
  spinner.classList.remove("appear");
}

export { removeSpinner };
