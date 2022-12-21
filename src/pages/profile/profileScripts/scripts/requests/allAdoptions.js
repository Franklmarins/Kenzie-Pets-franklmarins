const baseURL = 'https://m2-api-adot-pet.herokuapp.com/'

export async function allAdoptions (token) {
    try {
      const request = await fetch(baseURL + 'adoptions', {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          },
      })
  
      const response = await request.json()
      return response
  

  } catch (err) {
    console.log ("erro:", err)
  }
}