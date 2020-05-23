const countriesContainer = document.querySelector(".countries-container");
const optionsContainer = document.querySelector(".options-container");
const searchCountrie = document.getElementById("search-countrie");
let countriesCard = document.querySelectorAll(".countries-card");
const main = document.getElementById("main");
const countrieDetailContainer = document.querySelector(".countrie-detail");
const btnBack = document.querySelector(".btn-back");

document.addEventListener("click", (e) => {
  //e.preventDefault();
  console.log(e.target);

  if (e.target.matches(".countrie-card-header > img")) {
    console.log("Has dado click en ", e.target.getAttribute("alt"));
    countrieDetailContainer.classList.add("show-details");
    renderCountriesDetails(e.target.getAttribute("alt"));
  }

  if (e.target.matches(".border-countrie")) {
    console.log(e.target.textContent);
    renderCountrieBorderDetails(e.target.textContent);
  }
});

btnBack.addEventListener("click", function () {
  console.log("back");
  countrieDetailContainer.classList.remove("show-details");
});

optionsContainer.addEventListener("click", async function (e) {
  const filterRegion = e.target.textContent;

  renderCountriesByRegion(filterRegion);
});

searchCountrie.addEventListener("input", async function (e) {
  e.preventDefault();
  const inputShearchValue = this.value;

  if (inputShearchValue === "") {
    renderAllCountries();
  }

  if (inputShearchValue !== "") {
    renderCountriesByName(inputShearchValue);
  }
});

async function getAllCountriesInformation(url) {
  const countrieInformation = [];

  const countries = await fetch(url);

  const statusCode = countries.status;
  const countriesJson = await countries.json();
  console.log(countriesJson);

  if (statusCode === 404) {
  } else {
    for (const currentCountrie of countriesJson) {
      const countrie = {
        flag: currentCountrie.flag,
        name: currentCountrie.name,
        population: currentCountrie.population,
        region: currentCountrie.region,
        capital: currentCountrie.capital,
      };
      countrieInformation.push(countrie);
    }
  }

  return countrieInformation;
}

async function getAllCountriesDetailsInformation(url) {
  const countrieInformation = [];

  const countries = await fetch(url);

  const statusCode = countries.status;
  const countriesJson = await countries.json();

  if (statusCode === 404) {
  } else {
    for (const currentCountrie of countriesJson) {
      const countrie = {
        flag: currentCountrie.flag,
        name: currentCountrie.name,
        alphaCode: currentCountrie.alpha3Code,
        nativeName: currentCountrie.nativeName,
        population: currentCountrie.population,
        region: currentCountrie.region,
        subregion: currentCountrie.subregion,
        capital: currentCountrie.capital,
        topLevelDomain: currentCountrie.topLevelDomain,
        currencies: currentCountrie.currencies[0].name,
        languages: currentCountrie.languages,
        borders: currentCountrie.borders,
      };
      countrieInformation.push(countrie);
    }
  }

  return countrieInformation;
}

async function getCountriesFilterByRegion(region = "Asia") {
  const countries = await getAllCountriesInformation(
    `https://restcountries.eu/rest/v2/all`
  );
  const filterRegion = countries.filter(
    (countrie) => countrie.region === region
  );

  return filterRegion;
}

function renderCountriesInContainer(countries) {
  const countrieFragment = document.createDocumentFragment();
  const countriesCardTemplate = document.getElementById(
    "countries-card-template"
  ).content;

  const countriesContainers = document.querySelector(".countries-container");
  const main = document.createElement("main");
  main.classList.add("countries-container");

  for (const currentCountrie of countries) {
    const { flag, name, population, region, capital } = currentCountrie;

    countriesCardTemplate
      .querySelector(".countrie-card-header > img")
      .setAttribute("src", flag);
    countriesCardTemplate
      .querySelector(".countrie-card-header > img")
      .setAttribute("alt", name);
    countriesCardTemplate.querySelector(".countrie-name").textContent = name;
    countriesCardTemplate.querySelector(
      ".countrie-population"
    ).innerHTML = `<span>Population: </span>${population}`;
    countriesCardTemplate.querySelector(
      ".countrie-region"
    ).innerHTML = `<span>Region: </span>${region}`;
    countriesCardTemplate.querySelector(
      ".countrie-capital"
    ).innerHTML = `<span>Capital: </span>${capital}`;

    const templateClone = document.importNode(countriesCardTemplate, true);

    countrieFragment.append(templateClone);
  }
  main.appendChild(countrieFragment);
  countriesContainers.replaceWith(main);
}

async function renderCountrieDetailInContainer(countrie) {
  const borderCountries = await renderBoderCountries(countrie[0].borders);

  const languages = renderCountrieLanguages(countrie[0].languages);

  const countriesDetailsTemplate = `
    <div class="countrie-container">
        <div class="countrie-flag-container">
            <img src="${countrie[0].flag}" alt="" class = "flag">
        </div>
        <div class="countrie-details-container">
            <div class="countrie-details">
                <div class = "countrie-name-container">
                    <p class="countrie-name">${countrie[0].name}</p>
                </div>
                </div>
                <div class = "countrie-main-information">
                    <p><span>Native Name: </span>${countrie[0].nativeName}</p>
                    <p class="countrie-population"><span>Population: </span> ${countrie[0].population}</p>
                    <p class="countrie-region"><span>Region: </span> ${countrie[0].population}</p>
                    <p class="countrie-sub-region"><span>Sub region: </span> ${countrie[0].subregion}</p>
                    <p class="countrie-capital"><span>Capital: </span>${countrie[0].capital}</p>
                </div>
                <div class = "countrie-sub-information">
                    <p><span>Top Level Domain: </span> ${countrie[0].topLevelDomain}</p>
                    <p><span>Currencies: </span> ${countrie[0].currencies}</p>
                    <p><span>Languages: </span> ${languages.textContent}</p>
                </div>
                <div class="countries-border">
                    <p>Border Countries</p>
                    <div class="border-countries-container">
                        ${borderCountries.innerHTML}
                    </div>
                </div>
            </div>
        </div>`;

  console.log(countriesDetailsTemplate);

  const details = document.createElement("div");
  details.classList.add("countrie-container-details");
  details.innerHTML = countriesDetailsTemplate;

  document.querySelector(".countrie-container-details").replaceWith(details);
}

async function renderAllCountries() {
  const countries = await getAllCountriesInformation(
    `https://restcountries.eu/rest/v2/all`
  );

  renderCountriesInContainer(countries);
}

async function renderCountriesByRegion(filterRegion) {
  const countriesFilterByRegion = await getCountriesFilterByRegion(
    filterRegion
  );

  renderCountriesInContainer(countriesFilterByRegion);
}

async function renderCountriesByName(name) {
  const countrie = await getAllCountriesInformation(
    `https://restcountries.eu/rest/v2/name/${name}`
  );

  if (countrie.length === 0) {
    console.log("No hay pais");

    const main = document.createElement("main");
    main.classList.add("countries-container");

    const errorMessage = document.createElement("p");
    errorMessage.textContent = "No existe ningun pais con ese nombre";
    main.appendChild(errorMessage);
    countriesContainers.replaceWith(main);
  } else {
    renderCountriesInContainer(countrie);
  }
}

async function renderBoderCountries(borders) {
  const div = document.createElement("div");

  for (const border of borders) {
    const borderLink = document.createElement("a");
    borderLink.classList.add("border-countrie");
    borderLink.textContent = await getNameCountrieByCode(border);
    div.appendChild(borderLink);
  }

  return div;
}

async function getNameCountrieByCode(code) {
  const countrieCode = await fetch(
    `https://restcountries.eu/rest/v2/alpha/${code}`
  );
  const borderCountrieJson = await countrieCode.json();
  const borderCountrieName = borderCountrieJson.name;

  return borderCountrieName;
}

function renderCountrieLanguages(languages) {
  let languageText = document.createTextNode("");
  languages.forEach((language) => {
    languageText.textContent += language.name + ", ";
  });

  return languageText;
}

async function renderCountriesDetails(countrieName) {
  const countrie = await getAllCountriesDetailsInformation(
    `https://restcountries.eu/rest/v2/name/${countrieName}`
  );

  renderCountrieDetailInContainer(countrie);
}

async function renderCountrieBorderDetails(countrieFullName) {
  const countrie = await getAllCountriesDetailsInformation(
    `https://restcountries.eu/rest/v2/name/${countrieFullName}?fullText=true`
  );

  renderCountrieDetailInContainer(countrie);
}

renderAllCountries();
