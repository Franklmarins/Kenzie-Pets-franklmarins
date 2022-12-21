const baseURL = 'https://m2-api-adot-pet.herokuapp.com/'

export async function myPets(token){
    try {
         const request = await fetch(baseURL + 'adoptions/myAdoptions', {
              method: "GET",
              headers: {

                   "Content-Type": "application/json",
                   Authorization: `Bearer ${token}`
              },
         })
        
         return await request.json()

    } catch (err) {
         console.log(err);
    }
}