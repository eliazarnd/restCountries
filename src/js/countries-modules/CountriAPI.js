export default class CountriAPI {
  constructor(url) {
    this.url = url;
    this.data = this.getAllCountriesInformation(this.url);
  }

  async getAllCountriesInformation(url = this.url) {
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
          population: currentCountrie.population,
          region: currentCountrie.region,
          capital: currentCountrie.capital,
        };
        countrieInformation.push(countrie);
      }
    }

    return countrieInformation;
  }

  async getAllCountriesDetailsInformation(url = this.url) {
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

  async getCountriesFilterByRegion(region = "Asia") {
    const countries = await this.data;

    const filterRegion = countries.filter(
      (countrie) => countrie.region === region
    );

    return filterRegion;
  }

  async getCountrieDetailsByName(countrieName) {
    const countries = await this.getAllCountriesDetailsInformation();
    console.log(countries);
    const countrieDetails = countries.filter(
      (countrie) => countrie.name === countrieName
    );

    return countrieDetails;
  }

  async getCountrieByAlphaCode(alphaCode) {
    const countries = await this.getAllCountriesDetailsInformation();
    console.log(alphaCode);
    const countrieDetails = countries.filter(
      (countrie) => countrie.alphaCode === alphaCode
    );

    return countrieDetails;
  }

  async getNameCountrieByCode(code) {
    const countrieCode = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${code}`
    );
    const borderCountrieJson = await countrieCode.json();
    const borderCountrieName = borderCountrieJson.name;

    return borderCountrieName;
  }
}
