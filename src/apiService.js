export default class ApiService {
  constructor() {
    this.querySearch = '';
    this.page = 1;
  }
  fetchArticles() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '22951340-683a641f2fde08e18261bbe3d';

    return fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.querySearch}&page=${this.page}&per_page=12&key=${API_KEY}`,
    ).then(res =>
      res.json().then(data => {
        this.page += 1;
        return data.hits;
      }),
    );
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.querySearch;
  }

  set query(newQuery) {
    this.querySearch = newQuery;
  }
}
