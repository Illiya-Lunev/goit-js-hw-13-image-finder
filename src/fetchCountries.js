const fetchCountries = searchQuery => {
  const urlApi = 'https://restcountries.eu/rest/v2/name/';
  let url = `${urlApi}${searchQuery}`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.log('error'));
};
export default fetchCountries;
