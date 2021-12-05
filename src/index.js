import './css/styles.css';
import countriesCardTpl from './templates/countries-card.hbs'
const DEBOUNCE_DELAY = 300;

const refs = {
countryContainer: document.querySelector(".country-info")
}

fetch('https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags.svg,languages')
.then(response => {
    return response.json()
})
    .then(country => {
        console.log(country);
        const markup = countriesCardTpl(country);
        // console.log(markup);
        refs.countryContainer.innerHTML = markup;
    })
    .catch(error => {
        console.log(error);
})