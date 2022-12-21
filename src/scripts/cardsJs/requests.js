// import { getLocalStorage } from "../modalJs/userLocalStorage.js"

const baseUrl = "https://m2-api-adot-pet.herokuapp.com";

async function getAllPets() {
  const fetchUrl = baseUrl + `/pets`;
  const userToken = JSON.parse(localStorage.getItem("user"));

  try {
    const request = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    const response = await request.json();
    return response;
  } catch (err) {
    console.log("erro:", err);
    let toastMessage = err.error;
    if (err == "TypeError: Failed to fetch") {
      toastMessage = "Falha de Conexão";
    }
    toast(toastMessage, "erro");
  }
}

async function getUserProfileId() {
  const fetchUrl = baseUrl + `/users/profile`;
  const userToken = JSON.parse(localStorage.getItem("user"));
  try {
    const request = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log("erro:", err);
    let toastMessage = err.error;
    if (err == "TypeError: Failed to fetch") {
      toastMessage = "Falha de Conexão";
    }
    toast(toastMessage, "erro");
  }
}

async function adoptionPet(body) {
  const fetchUrl = baseUrl + `/adoptions`;
  const userToken = JSON.parse(localStorage.getItem("user"));
  try {
    const request = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    return err;
  }
}

async function deleteAdoptionPet(id) {
  const fetchUrl = baseUrl + `/adoptions/delete/${id}`;
  const userToken = JSON.parse(localStorage.getItem("user"));
  try {
    const request = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    const response = await request.json();

    return response;
  } catch (err) {
    return err;
  }
}
export { getAllPets, getUserProfileId, adoptionPet, deleteAdoptionPet };
