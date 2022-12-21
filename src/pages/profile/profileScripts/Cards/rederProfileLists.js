import { removeSelPetFromLocalStorage } from "../../../../scripts/mainJs/localStorage.js";
import { renderMyFavorites, renderMyPets } from "./renderMyPetsLists.js";
import { deleteAdoption } from "../scripts/requests/deleteAdoption.js";
import { openModal } from "../../../../scripts/modalJs/modal.js";
import { editPet } from "../scripts/requests/editMyPet.js";

const token = JSON.parse(localStorage.getItem('user'));

export function renderCardMyFavorites (image, name, breed, petId) {
   
    const petListItem    = document.createElement("li");
    const petCardImg     = document.createElement("div");
    const petImage       = document.createElement("img");
    const petCurveDetail = document.createElement("div");
    const petFavoriteBtn = document.createElement("button");
    const petInfo        = document.createElement("div");
    const petName        = document.createElement("h3");
    const petBreed       = document.createElement("p");
  
    petListItem.classList    = "card-list-item";
    petCardImg.classList     = "card-img";
    petCurveDetail.classList = "curve-detail";
    petFavoriteBtn.classList = "btn-favorite btn-favorite-enable";
    
    petInfo.classList = "card-info";
    petImage.src = image;
    petImage.onerror = function(){petImgError(this)};
    petName.innerText = name;
    petBreed.innerText = breed;
    petFavoriteBtn.id = `favorite${petId}`;
  
    petFavoriteBtn.addEventListener("click", (event) => {
      const petCardId = event.target.id.substring(8);
     
      removeSelPetFromLocalStorage (petCardId);

      renderMyFavorites(token)
    });
  
    petInfo.append(petName, petBreed);
    petCardImg.append(petImage, petCurveDetail, petFavoriteBtn);
    petListItem.append(petCardImg, petInfo);
  
    return petListItem;
  }

export function renderCardMyPets(image, name, breed, petId, adoptId) {
  
    const petListItem = document.createElement("li");
    const petCardImg = document.createElement("div");
    const petImage = document.createElement("img");
    const petCurveDetail = document.createElement("div");
    const petInfo = document.createElement("div");
    const petName = document.createElement("h3");
    const editButton = document.createElement ("button");
    const deleteButton = document.createElement ("button");
    
  
    petListItem.classList = "card-list-item";
    petCardImg.classList = "card-img";
    petCurveDetail.classList = "curve-detail";

    editButton.classList = "card-btn-adopted"
    editButton.innerText = "Editar"

    deleteButton.classList = "card-btn-adopted"
    deleteButton.innerText = "Desistir"

    petInfo.classList = "card-info";
    petImage.src = image;
    petImage.onerror = function(){petImgError(this)};
    petImage.name = breed;
    petName.innerText = name;
    editButton.id = `pet${petId}`;
    deleteButton.id = `ado${adoptId}`;
  
    editButton.addEventListener ("click", async (event) => {
      const petCardId = event.target.id.substring(3);
      
      const form = document.createElement('form');
      form.classList.add("form_create")

      const formTitle = document.createElement('h2');
      formTitle.innerText = 'Editar pet'

      const newNameInput = document.createElement('input');
      newNameInput.classList.add('input-new-name');
      newNameInput.setAttribute('type', 'text');
      newNameInput.setAttribute('value', event.path[1].children[0].innerText);

      const newBreedInput = document.createElement('input');
      newBreedInput.classList.add('input-new-breed');
      newBreedInput.setAttribute('type', 'text');
      newBreedInput.setAttribute('value', event.path[2].children[0].children[0].name);
      
      const inputSpecies = document.createElement('select');
    
      let options1 = document.createElement('option');
      options1.setAttribute('value', 'Cachorro');
      options1.innerText = 'Cachorro';
  
      let options2 = document.createElement('option');
      options2.setAttribute('value', 'Gato');
      options2.innerText = 'Gato';
  
      let options3 = document.createElement('option');
      options3.setAttribute('value', 'Aves');
      options3.innerText = 'Aves';
  
      let options4 = document.createElement('option');
      options4.setAttribute('value', 'Repteis');
      options4.innerText = 'Repteis';
  
      let options5 = document.createElement('option');
      options5.setAttribute('value', 'Outros');
      options5.innerText = 'Outros';

      const newImgInput = document.createElement('input');
      newImgInput.classList.add('input-new-img');
      newImgInput.setAttribute('type', 'URL');
      newImgInput.setAttribute('placeholder', 'URL da fotinha do pet');

      const submitButton = document.createElement('button');
      submitButton.classList.add('submit-btt')
      submitButton.innerText = 'Atualizar';
      submitButton.setAttribute('id', petCardId)

      inputSpecies.append(options1, options2, options3, options4, options5)

      form.append(formTitle, newNameInput, newBreedInput, inputSpecies, newImgInput, submitButton)

      openModal(form)

      atualize()

    })

    deleteButton.addEventListener ("click", async (event) => {
      const petCardId = event.target.id.substring(3);
        
        const div = document.createElement('div');
        div.classList.add("div-delete")


        const message = document.createElement('h2');
        message.innerText = 'Tem certeza que deseja desistir da adoção?'

        const text=document.createElement("p")
        text.innerText="O animal será removido da sua lista.Essa ação é irreversível."

        const declineBtt = document.createElement('button');
        declineBtt.innerText = 'Melhor não';
        declineBtt.classList.add('decline-btt');
        declineBtt.classList.add("cancel")

        const confirmBtt = document.createElement('button');
        confirmBtt.innerText = 'Desistir da adoção';
        confirmBtt.classList.add('confirm-btt');
        confirmBtt.setAttribute('id', petCardId);
        confirmBtt.classList.add("confirm")

        div.append(message,text, declineBtt, confirmBtt);

        openModal(div);

        confirmDelete(token);
    })
  
    petInfo.append(petName, editButton, deleteButton);
    petCardImg.append(petImage, petCurveDetail);
    petListItem.append(petCardImg, petInfo);
  
    return petListItem;
  }

  function atualize(){
    
    const atualizeBtt = document.querySelector('.submit-btt')

    atualizeBtt.addEventListener('click', async (e) => {
      e.preventDefault()
      const petId = e.target.id;
      const editPetOjb = {
        name: e.path[1].children[1].value,
        bread: e.path[1].children[2].value,
        species: e.path[1].children[3].value,
        avatar_url: e.path[1].children[4].value,
      }

      await editPet(token, editPetOjb, petId);

      renderMyPets(token)

      e.path[3].remove()


    })
  }

  async function confirmDelete(token){
    const declineBtt = document.querySelector('.decline-btt');

    declineBtt.addEventListener('click', (e) => {   
      e.path[3].remove()
    })

    const confirmBtt = document.querySelector('.confirm-btt');

    confirmBtt.addEventListener('click', async (e) => {
      const adoptionId = e.target.id;
      
      await deleteAdoption(token, adoptionId)
      renderMyPets(token)
      e.path[3].remove()
    })

  }

  function petImgError(image) {
    image.onerror = "";
    image.src = "/src/assets/pata.png"
    return true;
  }