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

  clearGallery();
  apiService.query = e.currentTarget.elements.query.value;
  apiService.resetPage();
  apiService.fetchArticles().then(onGalleryMarkup);
}

function onLoadMore() {
  apiService.fetchArticles().then(onGalleryMarkup);
}

function onGalleryMarkup(hits) {
  ref.markupGallery.insertAdjacentHTML('beforeend', templates(hits));
}

function clearGallery() {
  ref.markupGallery.innerHTML = '';
}
