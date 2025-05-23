import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

// .env'den gelen API key
const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

export const fetchPhotosByQuery = async (q, currentPage) => {
  try {
    const searchParams = {
      q,
      page: currentPage,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
    };

    return await axios.get('', { params: searchParams });
  } catch (error) {
    console.log(error.message);
  }
};