
import { modalRegisterPet } from "./profileScripts/scripts/general/createNewPet.js"
import {modalEditUser, modalDeleteUser} from "./profileScripts/scripts/general/editAndDeleteUser.js"
import { renderUserInf } from "./profileScripts/scripts/general/renderUserInf.js"
import { renderMyPets, renderMyFavorites } from "./profileScripts/Cards/renderMyPetsLists.js";
import { verifyUserLogged } from "./../../scripts/verifyUserLogged.js";

verifyUserLogged()

const token = JSON.parse(localStorage.getItem('user'));
let img=document.querySelector(".div-img")
let userInfo=document.querySelector(".user-inf")

img.addEventListener("mouseover",function(){
    userInfo.classList.add("appear")
})

img.addEventListener("mouseout",function(){
    userInfo.classList.remove("appear")
})

function headerButtons(){
    let btns_header = [...document.querySelectorAll("[data-btn-header]")]
    let btn_menu = document.querySelector(".btn_menu")
    let div_btns_header = document.querySelector(".btns_header")
    let dropdown_hide = document.querySelector(".fa-xmark")
    let dropdown_appear = document.querySelector(".fa-bars")


    btns_header.forEach(btn => btn.addEventListener("click", function () {
        if (btn.getAttribute("data-btn-header") == "logout") {
            localStorage.setItem('user', JSON.stringify(''))
            window.location.reload()
        }
        else {
            window.location.replace('../mainPage.html')
        }
    }))


    btn_menu.addEventListener("click", function () {
        div_btns_header.classList.toggle("appear")
        dropdown_hide.classList.toggle("appear")
        dropdown_appear.classList.toggle("hide")

    })
}
headerButtons();

renderUserInf(token);
modalRegisterPet(token);
modalEditUser(token);
modalDeleteUser(token);

renderMyPets(token);
renderMyFavorites(token);

