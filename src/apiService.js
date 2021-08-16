const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22951340-683a641f2fde08e18261bbe3d';

fetch(
  `${BASE_URL}/?image_type=photo&orientation=horizontal&q=cat&page=1&per_page=12&key=${API_KEY}`,
).then(res => res.json());
