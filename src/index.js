import './css/styles.css';
import countriesCardTpl from './templates/countries-card.hbs'
import debounce from 'lodash.debounce'
const DEBOUNCE_DELAY = 300;

const refs = {
    countryContainer: document.querySelector(".country-info"),
    searchInput: document.querySelector("#search-box"),
}

refs.searchInput.addEventListener('input', debounce(countrySearchInputHandler, DEBOUNCE_DELAY));

function countrySearchInputHandler(e) {
    e.preventDefault();
    
    const searchQuery = e.target.value;
    

    fetchCountries(searchQuery)
        .then(renderCountryCard)
        .catch(error => console.log(error));
}
  


function fetchCountries() {
    return fetch('https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags.svg,languages')
        .then(response => {
            return response.json()
        });
}

    function renderCountryCard(country) {
    const markup = countriesCardTpl(country);
    // console.log(markup);
    refs.countryContainer.innerHTML = markup;
    }

//     function clearCountryContainer() {
//   refs.countryContainer.innerHTML = '';
// }