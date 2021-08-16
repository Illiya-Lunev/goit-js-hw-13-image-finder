import { debounce } from 'debounce';
import fetchCountries from '../src/fetchCountries';
import markup from '../src/markup';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';

const ref = {
  input: document.querySelector('.js-input'),
  containerCountry: document.querySelector('.js-countries'),
};

const onInput = e => {
  e.preventDefault();
  ref.containerCountry.innerHTML = '';

  const inputValue = e.target.value;

  if (inputValue) {
    fetchCountries(inputValue)
      .then(data => markup(data))
      .catch(error => console.log('error'));
  }
};
ref.input.addEventListener('input', debounce(onInput, 500));
