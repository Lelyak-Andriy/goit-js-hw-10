const BASE_URL = 'https://restcountries.com/v3.1'


function fetchCountries(country) {

    return fetch(`${BASE_URL}/name/${country}?fields=name,capital,population,flags,languages`).then(response =>
        response.json(),
    );
    
}

export default {fetchCountries}