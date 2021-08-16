import countryCard from '../src/templates/countrys.hbs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const ref = { containerCountry: document.querySelector('.js-countries') };

function markup(data) {
  const markupCard = countryCard(data);

  if (data.length > 10) {
    error({
      title: `Too many matches found.`,
      text: `We found ${data.length} countries. Please enter a more specific query!`,
      styling: 'brighttheme',
      delay: 1000,
    });
  }
  if (data.length >= 2 && data.length <= 10) {
    return data.forEach(
      country =>
        (ref.containerCountry.innerHTML += `<div class = "item"><li>${country.name}</li></div>`),
    );
  }
  if (data.length === 1) {
    ref.containerCountry.insertAdjacentHTML('afterbegin', markupCard);
  }
}

export default markup;
