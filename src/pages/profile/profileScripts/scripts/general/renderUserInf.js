import { userInf } from "./../requests/userinf.js";

export async function renderUserInf (token){
    const userObj = await userInf(token);    

    const avatarImg = document.querySelector('#avatar');
    avatarImg.src = userObj.avatar_url;

    const username = document.querySelector('.user-inf-name');
    username.innerText = userObj.name;

    const userEmail = document.querySelector('.user-inf-email');
    userEmail.innerHTML = `<b class="emphasis">E-mail:</b> ${userObj.email}`;

    const editBtt = document.querySelector('.user-edit-inf-btt');
    editBtt.setAttribute('id', userObj.id )
}