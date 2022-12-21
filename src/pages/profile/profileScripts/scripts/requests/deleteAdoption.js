const baseURL = 'https://m2-api-adot-pet.herokuapp.com/'

async function deleteAdoption(token, id){
    try {
         const request = await fetch(baseURL + 'adoptions/delete/' + id, {
              method: "DELETE",
              headers: {

                   "Content-Type": "application/json",
                   Authorization: `Bearer ${token}`
              },
         })

         if (request.ok){
            
         }

    } catch (err) {
         console.log(err);

    }
}

export {deleteAdoption}