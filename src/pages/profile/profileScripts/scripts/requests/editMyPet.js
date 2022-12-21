const baseURL = 'https://m2-api-adot-pet.herokuapp.com/'

async function editPet(token, body, id){
    try {
         const request = await fetch(baseURL + 'pets/' + id, {
              method: "PATCH",
              headers: {

                   "Content-Type": "application/json",
                   Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(body)
         })
         const toast = document.querySelector(".toast");
         const toastTitle = document.querySelector(".title-toast");
         const toastMessage = document.querySelector(".message-toast");
         if (request.ok){
          toast.classList.add("appear");
          toastTitle.innerText = "Pet editado!";
          toastMessage.innerText =
          "Seu pet agora consta com novas informaçoes!";
          setTimeout(() => {
          toast.classList.remove("appear");
      }, 3000);
         }else {
          const div = document.querySelector(".header_toast");
          const divImg = document.querySelector(".check");
          divImg.innerHTML = "";
          toast.classList.add("appear");

          toastTitle.innerText = "Oops!";

          divImg.insertAdjacentHTML("beforeend", `<p style="color:white;">X</p>`);

          div.classList.add("header_toast_alert");

          toastMessage.innerText = "Verifique se todos os campos estão preenchidos.";

          setTimeout(() => {
          divImg.innerHTML = "";
          divImg.insertAdjacentHTML(
            "beforeend",
            `<i class="fa-solid fa-check"></i>`
          );
          div.classList.remove("header_toast_alert");
          toast.classList.remove("appear");
        }, 3000);

         }
        
    } catch (err) {
         console.log(err);
    }
}

export {editPet}