import iziToast from 'izitoast';
import { galleryCardsTemplate, lightbox } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';

const refs = {
  searchForm: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  btnLoadMore: document.querySelector('.btn-load-more'),
};

const itemsPerPage = 15;
let totalPages;
let currentPage;
let searchQuery;
let elemHeight;

function showLoader() {
  refs.loader.classList.remove('hidden');
}

function hideLoader() {
  refs.loader.classList.add('hidden');
}

const onSearchFormSubmit = async event => {
  event.preventDefault();

  currentPage = 1;
  refs.gallery.innerHTML = '';
  refs.btnLoadMore.classList.remove('is-visible');

  searchQuery = event.currentTarget.elements.search_text.value.trim();

  if (searchQuery === '') {
    iziToast.error({
      title: 'Error',
      message: 'Input cannot be empty!',
      position: 'topRight',
    });
    refs.btnLoadMore.classList.remove('is-visible');
    event.currentTarget.elements.search_text.value = '';
    return;
  }

  showLoader();
  try {
    const { images, total } = await fetchPhotosByQuery(searchQuery, currentPage);

    if (images.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      refs.searchForm.reset();
      refs.btnLoadMore.classList.remove('is-visible');
      return;
    }

    refs.gallery.innerHTML = galleryCardsTemplate(images);
    lightbox.refresh();
    currentPage += 1;

    if (images.length < itemsPerPage) {
      refs.btnLoadMore.classList.remove('is-visible');
    } else {
      refs.btnLoadMore.classList.add('is-visible');
    }

    const firstCard = document.querySelector('.gallery-wrapper');
    if (firstCard) {
      elemHeight = firstCard.getBoundingClientRect().height;
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoader();
  }
};

const onBtnLoadMoreClick = async () => {
  showLoader();
  try {
    const { images, total } = await fetchPhotosByQuery(searchQuery, currentPage);

    refs.gallery.insertAdjacentHTML('beforeend', galleryCardsTemplate(images));
    lightbox.refresh();

    window.scrollBy({
      top: elemHeight * 2,
      left: 0,
      behavior: 'smooth',
    });

    totalPages = Math.ceil(total / itemsPerPage);

    if (currentPage === totalPages || images.length < itemsPerPage) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      refs.btnLoadMore.classList.remove('is-visible');
      return;
    }

    currentPage += 1;
    refs.btnLoadMore.classList.add('is-visible');
  } catch (error) {
    iziToast.error({
      message: error.message,
      position: 'topRight',
    });
    console.log(error.message);
  } finally {
    hideLoader();
  }
};

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.btnLoadMore.addEventListener('click', onBtnLoadMoreClick);