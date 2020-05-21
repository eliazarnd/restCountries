const countriesContainer = document.querySelector(".countries-container");
const optionsContainer = document.querySelector(".options-container");
console.log(optionsContainer);

optionsContainer.addEventListener("click", async function(e){

    const filterRegion = e.target.textContent;
    
    renderCountriesByRegion(filterRegion);
    

});



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


async function getCountriesFilterByRegion(region = "Asia"){
    
    const countries = await getAllCountriesInformation(`https://restcountries.eu/rest/v2/all`);
    const filterRegion = countries.filter(countrie => countrie.region === region);
   
    return filterRegion;

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

async function renderCountriesByRegion(filterRegion){
    
    const countriesFilterByRegion = await getCountriesFilterByRegion(filterRegion);
    
    const countrieFragment = document.createDocumentFragment();
    const countriesCardTemplate = document.getElementById("countries-card-template").content;

    const countriesContainers = document.querySelector(".countries-container");

        const main = document.createElement("main");
        main.classList.add("countries-container");
    

    for (const currentCountrie of countriesFilterByRegion) {
        
        const {flag, name, population, region, capital} = currentCountrie;
       
        countriesCardTemplate.querySelector(".countrie-card-header > img").setAttribute("src", flag);
        countriesCardTemplate.querySelector(".countrie-name").textContent = name;
        countriesCardTemplate.querySelector(".countrie-population").innerHTML = `<span>Population: </span>${population}`;
        countriesCardTemplate.querySelector(".countrie-region").innerHTML = `<span>Region: </span>${region}`;
        countriesCardTemplate.querySelector(".countrie-capital").innerHTML = `<span>Capital: </span>${capital}`;
        
        const templateClone = document.importNode(countriesCardTemplate, true);

        countrieFragment.append(templateClone);    
        
    }   
        main.appendChild(countrieFragment);
        countriesContainers.replaceWith(main);
        
        
}

renderAllCountries("USAN");
