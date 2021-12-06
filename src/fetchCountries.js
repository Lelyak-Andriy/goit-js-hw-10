import { Notify } from "notiflix";

const BASE_URL = 'https://restcountries.com/v3.1'


function fetchCountries(country) {

    return fetch(`${BASE_URL}/name/${country}?fields=name,capital,population,flags,languages`)
        .then(response => {
            return response.json();
       }) 
        .then(data => {
      if (data.length > 10) {
          Notiflix.Notify.failure('Too many matches found. Please enter a more specific name.');
      } else if (data.length >=2 || data.length <= 10) {
         renderCountriesListMarkup(country);
      } else if (data.length === 1) {
            renderCountryCard(country)}
    })
    
}

export default {fetchCountries}