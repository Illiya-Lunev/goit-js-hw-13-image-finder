import ApiService from '../src/apiService';
import templates from '../src/templates/temlates.hbs';
import LoadMoreBtn from '../src/load-more-btn';
// Плагин модалки
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';

import { notice, defaults, defaultModules, error } from '@pnotify/core';
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
  gallery: document.querySelector('.gallery'),
};

const loadBtnmore = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const apiService = new ApiService();

ref.gallery.addEventListener('click', openImg);
ref.formSearch.addEventListener('submit', onSearch);
loadBtnmore.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  clearGallery();
  apiService.query = e.currentTarget.elements.query.value;
  loadBtnmore.show();
  apiService.resetPage();
  apiService.fetchArticles().then(onGalleryMarkup);
}
function onLoadMore() {
  loadBtnmore.disable();
  apiService.fetchArticles().then(hits => {
    if (hits.length === 0) {
      error({
        title: 'There is no picture with this name',
        text: 'Please,try again.',
      });
      return;
    }
    onGalleryMarkup(hits);
  });
  loadBtnmore.enable();
  scrollAfterLoad();

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

function scrollAfterLoad() {
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
      block: 'end',
    });
  }, 500);
}

// Функция добавлению модалки
function openImg(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  basicLightbox
    .create(
      `<img class="lightbox__image" src=${e.target.dataset.source} alt="">`,
    )
    .show();
}
