import { renderPets } from "../cardsJs/renderCard.js";
import { getUserProfileId } from "../cardsJs/requests.js";
import { verifyUserLogged } from "../verifyUserLogged.js";
import { addUserIdToLocalStorage } from "./localStorage.js";

let btns_header = [...document.querySelectorAll("[data-btn-header]")];
let btn_menu = document.querySelector(".btn_menu");
let div_btns_header = document.querySelector(".btns_header");
let dropdown_hide = document.querySelector(".fa-xmark");
let dropdown_appear = document.querySelector(".fa-bars");

verifyUserLogged();

btns_header.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (btn.getAttribute("data-btn-header") == "logout") {
        localStorage.setItem('user', JSON.stringify(''))
        window.location.reload()
    }else{
        window.location.replace('./profile/index.html')
    }
  })
);

btn_menu.addEventListener("click", function () {
  div_btns_header.classList.toggle("appear");
  dropdown_hide.classList.toggle("appear");
  dropdown_appear.classList.toggle("hide");
});

const userLogedIn = await getUserProfileId();
addUserIdToLocalStorage(userLogedIn.id);
renderPets("all");
