const BASE_URL = 'https://restcountries.com/v3.1'


function fetchCountries(country) {

    return fetch(`${BASE_URL}/name/${country}?fields=name,capital,population,flags,languages`).then(response => {
    if (response.status === 404) {
          console.log(response)
          throw new Error(response.status);
        }
        return response.json()
    }
    )
}

export default {fetchCountries}