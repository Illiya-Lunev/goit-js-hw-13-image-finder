import ApiService from '../src/apiService';
import templates from '../src/templates/temlates.hbs';

import { notice, defaults, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';

import * as PNotifyFontAwesome5Fix from '@pnotify/font-awesome5-fix';
import * as PNotifyFontAwesome5 from '@pnotify/font-awesome5';
defaultModules.set(PNotifyFontAwesome5Fix, {});
defaultModules.set(PNotifyFontAwesome5, {});
defaults.width = '300px';

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

  ref.formSearch.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });

  if (apiService.query) {
    onNotice();
  }
}

function onGalleryMarkup(hits) {
  ref.markupGallery.insertAdjacentHTML('beforeend', templates(hits));
}

function clearGallery() {
  ref.markupGallery.innerHTML = '';
}

function onNotice() {
  notice({
    title: `Loading... Please wait!`,
    delay: 500,
  });
}
