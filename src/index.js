import './css/styles.css';
import countriesCardTpl from './templates/countries-card.hbs';
import countriesListTpl from './templates/countries-list.hbs'
import API  from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const refs = {
    countryContainer: document.querySelector(".country-info"),
    searchInput: document.querySelector("#search-box"),
    countryList: document.querySelector(".country-list"),
}

refs.searchInput.addEventListener('input', debounce(countrySearchInputHandler, DEBOUNCE_DELAY));

function countrySearchInputHandler(e) {
    e.preventDefault();
    
const country = refs.searchInput.value.trim();  

API.fetchCountries(country)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(clearSearchInput);

}
  
function renderCountryCard(country) {
    let markup = countriesCardTpl(country);
    let markupList = countriesListTpl(country);
    if (country.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
    }
    console.log(country.length)
     if (country.length > 1) { return refs.countryList.innerHTML = markupList }
    console.log(country.length)
    if (country.length === 1) { return refs.countryList.innerHTML = markup }
    console.log(country.length)

}


function onFetchError(error) {
Notiflix.Notify.failure('Oops, there is no country with that name');
}

    function clearSearchInput() {
    refs.searchInput.innerHTML = '';
}