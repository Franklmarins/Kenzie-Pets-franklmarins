import { getAllPets, adoptionPet } from "./requests.js";
import {
  getUsersSelectededPets,
  addUserSelectedPets,
  removeSelPetFromLocalStorage,
} from "../../scripts/mainJs/localStorage.js";
import { removeSpinner } from "../homeJs/home.js";

async function renderPetsInHome(specie) {
  const cardList = document.querySelector(".pets-rendered-home");
  cardList.innerHTML = "";
  const allPets = await getAllPets();
  let petsToRender = allPets;
  let count = 0;

  if (specie == "Others") {
    petsToRender = allPets.filter((pet) => {
      if (count < 5 && pet.species != "Cachorro" && pet.species != "Gato") {
        count++;
        return pet;
      }
    });
  } else if (specie == "All") {
    petsToRender = allPets.filter((pet) => {
      if (count < 5) {
        count++;
        return pet;
      }
    });
  } else if (specie != "all") {
    petsToRender = allPets.filter((pet) => {
      if (count < 5 && pet.species == specie) {
        count++;
        return pet;
      }
    });
  }

  petsToRender.forEach((pet) => {
    setTimeout(() => {
      const cardListItem = renderCard(pet.avatar_url, pet.name, pet.bread);
      cardList.appendChild(cardListItem);
      removeSpinner();
    }, 500);
  });
}

async function renderPets(specie) {

  const cardList = document.getElementById("card__List");
  const allPets = await getAllPets();
  let petsToRender = allPets;
  if (specie != "all") {
    petsToRender = allPets.filter((pet) => pet.species == specie);
  }
  searchAndRender(petsToRender);
}


function searchAndRender(petList) {
  const cardList = document.getElementById("card__List");
  const inputSearch = document.getElementById("searchInput");

  inputSearch.addEventListener("keyup", (e) => {
    const searched = e.target.value;
    cardList.innerHTML = "";
    const petsFound = petsFilterInSearch(petList, searched);

    if (petsFound.length > 0) {
      petsFound.forEach((pet) => {
        const cardListItem = renderCard(
          pet.avatar_url,
          pet.name,
          pet.bread,
          pet.available_for_adoption,
          pet.id
        );
        cardList.appendChild(cardListItem);
      });
    } else {
      cardList.innerHTML = "<li class='msg_error'>Nenhum pet encontrado</li>"
    }
  });

  petList.forEach((pet) => {
    const cardListItem = renderCard(
      pet.avatar_url,
      pet.name,
      pet.bread,
      pet.available_for_adoption,
      pet.id
    );
    cardList.appendChild(cardListItem);
  });
}

function petsFilterInSearch(petsList, searched) {
  return petsList.filter((pet) => {
    return (
      pet.name.toLowerCase().includes(searched.toLowerCase()) ||
      pet.species.toLowerCase().includes(searched.toLowerCase()) ||
      pet.bread.toLowerCase().includes(searched.toLowerCase())
    );
  });
}

function renderCard(image, name, breed, notAdopted, petId) {

  const petListItem = document.createElement("li");
  const petCardImg = document.createElement("div");
  const petImage = document.createElement("img");
  const petCurveDetail = document.createElement("div");
  const petFavoriteBtn = document.createElement("button");
  const petInfo = document.createElement("div");
  const petName = document.createElement("h3");
  const petBreed = document.createElement("p");
  const adoptionButton = document.createElement ("button")

  petListItem.classList = "card-list-item";
  petCardImg.classList = "card-img";
  petCurveDetail.classList = "curve-detail";

  if (!notAdopted) {
    adoptionButton.classList = "card-btn-adopted"
    adoptionButton.innerText = "Já adotado"
    adoptionButton.disabled = true
  } else {
    adoptionButton.classList = "card-btn-to-adopt"
    adoptionButton.innerText = "Adotar"
  }

  if (petId) {
    petFavoriteBtn.classList = "btn-favorite";
  } else {
    adoptionButton.classList = "hidden"
    petFavoriteBtn.classList = "btn-favorite hidden";
  }


  const favoritePets = getUsersSelectededPets();
  let idIndex = favoritePets.indexOf(petId);
  if (idIndex >= 0) {
    petFavoriteBtn.classList.add("btn-favorite-enable");
  }

  petInfo.classList = "card-info";
  petImage.src = image;
  petImage.onerror = function(){petImgError(this)};
  petName.innerText = name;
  petBreed.innerText = breed;
  petFavoriteBtn.id = `favorite${petId}`;
  adoptionButton.id = `adopt${petId}`;

  petFavoriteBtn.addEventListener("click", (event) => {
    const petCardId = event.target.id.substring(8);
    petFavoriteBtn.classList.toggle("btn-favorite-enable");
    if (petFavoriteBtn.classList.contains("btn-favorite-enable")) {
      addUserSelectedPets(petId);
    } else {
      removeSelPetFromLocalStorage();
    }
  });

  adoptionButton.addEventListener ("click", (event) => {
    const petCardId = event.target.id.substring(5);
    adoptionButton.classList = "card-btn-adopted"
    adoptionButton.innerText = "Já adotado"
    adoptionButton.disabled = true
    const body = {}
    body.pet_id = petCardId
    adoptionPet(body)
  })


  if (petId) {
    petInfo.append(petName, petBreed, adoptionButton);
  } else {
    petInfo.append(petName, petBreed);
  }

  petCardImg.append(petImage, petCurveDetail, petFavoriteBtn);
  petListItem.append(petCardImg, petInfo);

  return petListItem;
}

function petImgError(image) {
  image.onerror = "";
  image.src = "/src/assets/pata.png"
  return true;
}


export { renderPets, renderPetsInHome };
