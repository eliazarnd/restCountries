const countriesContainer = document.querySelector(".countries-container");


async function getAllCountriesInformation(url){

    const countries = await fetch(url);
    const countriesJson = await countries.json();

    const countrieInformation = [];
    
    for (const currentCountrie of countriesJson) {
        const countrie = {
            flag: currentCountrie.flag,
            name: currentCountrie.name,
            population: currentCountrie.population,
            region: currentCountrie.region,
            capital: currentCountrie.capital
        };        
        countrieInformation.push(countrie);
    }
    
    return countrieInformation;
}

async function renderAllCountries(){

    const countries = await getAllCountriesInformation(`https://restcountries.eu/rest/v2/all`);
    
    const countrieFragment = document.createDocumentFragment();
    const countriesCardTemplate = document.getElementById("countries-card-template").content;
    
    for (const currentCountrie of countries) {
        
        const {flag, name, population, region, capital} = currentCountrie;
       
        countriesCardTemplate.querySelector(".countrie-card-header > img").setAttribute("src", flag);
        countriesCardTemplate.querySelector(".countrie-name").textContent = name;
        countriesCardTemplate.querySelector(".countrie-population").innerHTML = `<span>Population: </span>${population}`;
        countriesCardTemplate.querySelector(".countrie-region").innerHTML = `<span>Region: </span>${region}`;
        countriesCardTemplate.querySelector(".countrie-capital").innerHTML = `<span>Capital: </span>${capital}`;
        
        const templateClone = document.importNode(countriesCardTemplate, true);

        countrieFragment.append(templateClone);    
        
    }   
        
        countriesContainer.appendChild(countrieFragment);
}

renderAllCountries("USAN");
