
import { openModal } from "../../../../../scripts/modalJs/modal.js"
import { editUserInf } from "../requests/EditUserInf.js";
import { deleteUser } from "../requests/deleteUser.js";

export function modalEditUser(token){
    const editBtt = document.querySelector('.user-edit-inf-btt')

    let form = document.createElement('form');
    form.classList.add("form_create")

    let modalTitle = document.createElement('h2');
    modalTitle.innerText = 'Atualizar perfil';

    let inputName = document.createElement('input');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('placeholder', 'Nome');

    let inputAvatar = document.createElement('input');
    inputAvatar.setAttribute('type', 'url');
    inputAvatar.setAttribute('placeholder', 'URL avatar');

    let buttonEdit = document.createElement('button');
    buttonEdit.innerText = "Atualizar";
    buttonEdit.classList.add('button-edit')

    form.append(modalTitle, inputName, inputAvatar, buttonEdit)


    editBtt.addEventListener('click', () => {
        const divInf = document.querySelector('.user-inf');

        divInf.remove();
       
        openModal(form);
        editUser(token)
       
    })
}

function editUser(token){
    const editBtt = document.querySelector('.button-edit');

    editBtt.addEventListener('click', (e) => {
        e.preventDefault();

        let editUserObj = {
            avatar_url: e.path[1].children[2].value,
            name: e.path[1].children[1].value      
        }

        editUserInf(editUserObj, token)

    })
}

export function modalDeleteUser(token){
    const deleteBtt = document.querySelector('.user-delete-btt');

    deleteBtt.addEventListener('click', (e) => {
        e.preventDefault();

        let divAlert = document.createElement('div')
        divAlert.classList.add("div-delete")

        let alert = document.createElement('h2');
        alert.innerText = 'Tem certeza que deseja deletar o seu perfil?';

        let text=document.createElement("p")
        text.innerHTML="Todas as suas informações seram apagadas e <span>não poderão ser recuperadas.</span>"

        let bttConfirm = document.createElement('button');
        bttConfirm.setAttribute('id', 'confirm')
        bttConfirm.innerText = 'Sim';
        bttConfirm.classList.add("confirm")

        let bttDecline = document.createElement('button');
        bttDecline.innerText = 'Não';
        bttDecline.classList.add("cancel")

        divAlert.append(alert,text,bttConfirm, bttDecline);

        const divInf = document.querySelector('.user-inf');

        divInf.remove();

        openModal(divAlert);

        confirmDelete(token)
    })
    
}

function confirmDelete(token){
    const confirm = document.querySelector('#confirm');

    confirm.addEventListener('click', async (e) => {
        await deleteUser(token)
        
        e.path[3].remove()
    })
}
