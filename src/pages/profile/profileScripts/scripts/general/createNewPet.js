import { registerNewPet } from "../requests/registerNewPet.js"
import { openModal } from "../../../../../scripts/modalJs/modal.js"

export function modalRegisterPet(token){
    const newPetBtt = document.querySelector('.register-new-pet-btt')

    let form = document.createElement('form');
    form.classList.add("form_create")

    let modalTitle = document.createElement('h2');
    modalTitle.innerText = 'Criar novo Pet';

    let inputName = document.createElement('input');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('placeholder', 'Nome do pet');

    let inputBreed = document.createElement('input');
    inputBreed.setAttribute('type', 'text');
    inputBreed.setAttribute('placeholder', 'Raça do pet');

    // let inputSpecies = document.createElement('input');
    // inputSpecies.setAttribute('type', 'text');
    // inputSpecies.setAttribute('placeholder', 'Espécie do pet');

    let inputSpecies = document.createElement('select');
    inputSpecies.classList.add("select_input")
    
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
    options4.innerText = 'Répteis';

    let options5 = document.createElement('option');
    options5.setAttribute('value', 'Outros');
    options5.innerText = 'Outros';

    let inputURL = document.createElement('input');
    inputURL.setAttribute('type', 'url');
    inputURL.setAttribute('placeholder', 'Fotinha do pet');

    let buttonCreate = document.createElement('button');
    buttonCreate.innerText = "Criar";
    buttonCreate.classList.add('button-create');

    inputSpecies.append(options1, options2, options3, options4, options5)

    form.append(modalTitle, inputName, inputBreed, inputSpecies, inputURL, buttonCreate)


    newPetBtt.addEventListener('click', () => {
       openModal(form);
       createNewPet(token);
    })
}


function createNewPet(token){
    const buttonCreate = document.querySelector('.button-create');

    buttonCreate.addEventListener('click', async (e) => {
        e.preventDefault();

        let newPetObj = {
            name: e.path[1].children[1].value,
            bread: e.path[1].children[2].value,
            species: e.path[1].children[3].value,
            avatar_url: e.path[1].children[4].value
        }

        await registerNewPet(newPetObj, token)
        
    })
    
}