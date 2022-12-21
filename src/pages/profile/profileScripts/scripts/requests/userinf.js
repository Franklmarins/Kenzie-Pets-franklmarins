const baseURL = 'https://m2-api-adot-pet.herokuapp.com/'

async function userInf(token){
     
    try {
         const request = await fetch(baseURL + 'users/profile', {
              method: "GET",
              headers: {
                    "Content-Type": "application/json",               
                    Authorization: `Bearer ${token}`
              },
         })

         const response = await request.json();
         
         return response;
    } catch (err) {
         console.log(err);

    }
}

export {userInf}