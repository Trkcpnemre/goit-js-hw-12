import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchPhotosByQuery = async (q, currentPage) => {
  try {
    const searchParams = {
      q,
      page: currentPage,
      key: '50407836-8adbdb7013dbe19a53a013547',
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