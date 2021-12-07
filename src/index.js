import './css/styles.css';
import countriesCardTpl from './templates/countries-card.hbs';
import countriesListTpl from './templates/countries-list.hbs'
import API  from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");


searchInput.addEventListener('input', debounce(countrySearchInputHandler, DEBOUNCE_DELAY));

function countrySearchInputHandler(e) {
    e.preventDefault();
    
    const country = searchInput.value.trim();

API.fetchCountries(country)
    .then(renderCountryCard)
    .catch(onFetchError) 
}
  
function onFetchError(error) {
    if (error) {countryList.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name')
    }
}


function renderCountryCard(country) {
    const markupList = countriesListTpl(country);
    const markup = countriesCardTpl(country);
    if (country.length >= 10) {Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');}
    if (country.length >= 2) {countryList.innerHTML = markupList}
    if (country.length === 1) {countryList.innerHTML = markup}
   
}





    