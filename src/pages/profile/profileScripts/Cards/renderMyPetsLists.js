import { myPets } from "../scripts/requests/myPets.js";
import {getUsersSelectededPets} from "../../../../scripts/mainJs/localStorage.js"
import {allPets} from "../scripts/requests/allpets.js"
import {renderCardMyFavorites, renderCardMyPets} from "../Cards/rederProfileLists.js"


async function renderMyPets(token) {
  const myPetsList = document.querySelector(".user-pet-list");
  myPetsList.innerHTML = "";

  const arrPets = await myPets(token);

  arrPets.forEach(item => {
    myPetsList.appendChild((renderCardMyPets(item.pet.avatar_url, item.pet.name, item.pet.bread, item.pet.id, item.id)))

  })
}

async function renderMyFavorites(token){

  const allPetsArr = await allPets(token)
  const favArr = getUsersSelectededPets();

  let newArr = [];

  favArr.forEach(item => newArr.push(allPetsArr.find(el => el.id === item)))

  const ulFav = document.querySelector('.user-favorite-pet-list');
  ulFav.innerHTML = "";

  newArr.forEach(item => {
     
      ulFav.appendChild((renderCardMyFavorites (item.avatar_url, item.name, item.bread, item.id,)))   

  })

}

export { renderMyPets, renderMyFavorites };
