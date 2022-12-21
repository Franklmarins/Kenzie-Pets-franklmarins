const baseURL = 'https://m2-api-adot-pet.herokuapp.com/'

async function deleteUser(token){
    try {
         const request = await fetch(baseURL + 'users/profile', {
              method: "DELETE",
              headers: {

                   "Content-Type": "application/json",
                   Authorization: `Bearer ${token}`
              },
         })

         if (request.ok) {
          localStorage.removeItem('user');
          window.location.reload()
         }

    } catch (err) {
         console.log(err);

    }
}

export {deleteUser}