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
}

refs.searchInput.addEventListener('input', debounce(countrySearchInputHandler, DEBOUNCE_DELAY));

function countrySearchInputHandler(e) {
    e.preventDefault();
    
const country = refs.searchInput.value.trim();
    

    API.fetchCountries(country)
        .then(renderCountryCard, renderCountriesListMarkup)
        .catch(onFetchError)
        // .finally(() => country.reset());
}
  


    function renderCountryCard(country) {
    const markup = countriesCardTpl(country);
    // console.log(markup);
    refs.countryContainer.innerHTML = markup;
    }

    function renderCountriesListMarkup(country) {
    const markup = countriesListTpl(country);
    refs.countryContainer.insertAdjacentHTML('afterbegin', markup)
    }

    function onFetchError(error) {
    Notiflix.Notify.error("Oops, there is no country with that name");
    }