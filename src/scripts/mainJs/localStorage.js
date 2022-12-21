import { getUserProfileId } from "../cardsJs/requests.js";
function getUsersSelectededPets() {
  let userId = getUserIdFromLocalStorage();
  const localStorageKey = `kenziepets:selectedPets${userId}`;
  let userLocalStorage = localStorage.getItem(localStorageKey);
  let userSelectedPets = JSON.parse(userLocalStorage);
  if (userSelectedPets == null) {
    userSelectedPets = [];
  }
  return userSelectedPets;
}

function addUserSelectedPets(petId) {
  let selectedPets = getUsersSelectededPets();
  let userId = getUserIdFromLocalStorage();
  selectedPets.push(petId);
  const localStorageKey = `kenziepets:selectedPets${userId}`;
  const updatedSelectedPets = JSON.stringify(selectedPets);
  localStorage.setItem(localStorageKey, updatedSelectedPets);
}

function removeSelPetFromLocalStorage(petId) {
  let selectedPets = getUsersSelectededPets();
  const petIdIndex = selectedPets.findIndex((element) => element === petId);
  if (selectedPets.length > 1) {
    selectedPets.splice(petIdIndex, 1);
  } else {
    selectedPets.pop();
  }
  let userId = getUserIdFromLocalStorage();
  const localStorageKey = `kenziepets:selectedPets${userId}`;
  const selectedPetsJson = JSON.stringify(selectedPets);
  localStorage.setItem(localStorageKey, selectedPetsJson);
  return selectedPets.length;
}

function addUserIdToLocalStorage(userId) {
  const userLocalStorageId = JSON.stringify(userId);
  localStorage.setItem("kenziepets:user", userLocalStorageId);
}

function getUserIdFromLocalStorage() {
  let userLocalStorage = JSON.parse(localStorage.getItem("kenziepets:user"));
  return userLocalStorage;
}

export {
  getUsersSelectededPets,
  addUserSelectedPets,
  removeSelPetFromLocalStorage,
  addUserIdToLocalStorage,
};
