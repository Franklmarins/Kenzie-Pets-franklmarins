const baseURL = 'https://m2-api-adot-pet.herokuapp.com/'

async function editUserInf(body, token){
    try {
         const request = await fetch(baseURL + 'users/profile', {
              method: "PATCH",
              headers: {

                   "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(body)
         })


         if (request.ok) {
               window.location.reload()
         }

    } catch (err) {
         console.log(err);

    }
}

export {editUserInf}