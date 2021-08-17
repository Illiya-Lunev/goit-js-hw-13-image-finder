import ApiService from '../src/apiService';
import templates from '../src/templates/temlates.hbs';

const ref = {
  formSearch: document.querySelector('.js-search-form'),
  markupGallery: document.querySelector('.js-gallery'),
  btnLoadMore: document.querySelector('[data-action="load-more"]'),
};
const apiService = new ApiService();

ref.formSearch.addEventListener('submit', onSearch);
ref.btnLoadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;
  apiService.resetPage();
  apiService.fetchArticles();
}

function onLoadMore() {
  apiService.fetchArticles();
}
