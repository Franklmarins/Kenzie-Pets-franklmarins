const baseURL = 'https://m2-api-adot-pet.herokuapp.com/'

async function registerNewPet(body, token){
    try {
         const request = await fetch(baseURL + 'pets', {
              method: "POST",
              headers: {

                   "Content-Type": "application/json",
                   Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(body)
         })    

         const toast = document.querySelector(".toast");
         const toastTitle = document.querySelector(".title-toast");
         const toastMessage = document.querySelector(".message-toast");
         const bgModal = document.querySelector('.modal-background')
         if (request.ok){
          toast.classList.add("appear");
          toastTitle.innerText = "Uhuul!";
          toastMessage.innerText =
          "Seu pet já está pronto para ser adotado!";
          setTimeout(() => {
               bgModal.remove()
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

          toastMessage.innerText = "Algo deu errado! Tente novamente.";

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

export {registerNewPet}