
const baseUrl = "https://m2-api-adot-pet.herokuapp.com";

export async function requestRegister(body) {
  try {
    const request = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await request.json();
    const toast = document.querySelector(".toast");
    const toastTitle = document.querySelector(".title-toast");
    const toastMessage = document.querySelector(".message-toast");
    const bgModal = document.querySelector('.modal-background')
    if (request.ok) {
      toast.classList.add("appear");
      toastTitle.innerText = "Sua conta foi criada com sucesso!";
      toastMessage.innerText =
        "Agora você pode acessar os conteúdos utilizando seu usuário e senha!";
      setTimeout(() => {
        bgModal.remove()
        toast.classList.remove("appear");
      }, 3000);
    } else {
      const div = document.querySelector(".header_toast");
      const divImg = document.querySelector(".check");
      divImg.innerHTML = "";
      toast.classList.add("appear");

      toastTitle.innerText = "Erro!";

      if (response.message === "please inform a valid image link") {
        divImg.insertAdjacentHTML("beforeend", `<p style="color:white;">X</p>`);

        div.classList.add("header_toast_alert");

        toastMessage.innerText = "informe um link de imagem válido";

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
      if (response.message === "Email already in use") {
        divImg.insertAdjacentHTML("beforeend", `<p style="color:white;">X</p>`);

        div.classList.add("header_toast_alert");

        toastMessage.innerText = "Email já está em uso";

        setTimeout(() => {
          divImg.innerHTML = "";
          divImg.insertAdjacentHTML(
            "beforeend",
            `<i class="fa-solid fa-check"></i>`
          );
          div.classList.remove("header_toast_alert");
            btn.appendChild(img);
            setTimeout(() => {
                img.remove()
                btn.innerText = "Cadastrar"
                toast.classList.add('appear')
            }, 3000)
            setTimeout(() => {
                toast.classList.remove("appear")
            const bgModal = document.querySelector('.modal-background')
            bgModal.remove()
        }, 6000)

          toast.classList.remove("appear");
        }, 3000);
      }

    }
  } catch (err) {
    console.error(err);
  }
}

export async function requestLogin(body, p, btn) {
  try {
    const request = await fetch(`${baseUrl}/session/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    if (request.ok) {
      localStorage.setItem("user", JSON.stringify(response.token));

      btn.innerHTML = "";

      const img = document.createElement("img");
      img.src = "./src/assets/spinner.png";
      img.alt = "spinner";
      img.classList.add("loading");

      btn.appendChild(img);
      setTimeout(() => {
        window.location.replace("/src/pages/mainPage.html");
      }, 3000);
    } else {
      p.classList.add("error-block");
    }
  } catch (err) {}
}
