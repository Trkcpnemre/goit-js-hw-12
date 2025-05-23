import iziToast from 'izitoast';

import { galleryCardsTemplate, lightbox } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';

const refs = {
  searchForm: document.querySelector('.form'),
  gallery: document.querySelector('.js-gallery'),
  loader: document.querySelector('.loader'),
  btnLoadMore: document.querySelector('.btn-load-more'),
};

const itemsPerPage = 15;
let totalPages;
let currentPage;
let searchQuery;
let elemHeight;

refs.loader.style.display = 'none';

function showLoader() {
  refs.loader.style.display = 'block';
}

function hideLoader() {
  refs.loader.style.display = 'none';
}

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();

    currentPage = 1;
    refs.gallery.innerHTML = '';
    refs.btnLoadMore.classList.remove('is-visible');

    searchQuery = event.currentTarget.elements.search_text.value.trim();

    if (searchQuery === '') {
      iziToast.error({
        title: 'Error',
        message: `Input cannot be empty!`,
        position: 'topRight',
      });

      refs.btnLoadMore.classList.remove('is-visible');
      event.currentTarget.elements.search_text.value = '';

      return;
    }

    showLoader();
    const {
      data: { hits: images },
    } = await fetchPhotosByQuery(searchQuery, currentPage);

    if (images.length === 0) {
      iziToast.error({
        title: 'Error',
        message: `Sorry, there are no images matching your search query. Please try again!`,
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

    elemHeight = document
      .querySelector('.gallery-wrapper')
      .getBoundingClientRect().height;
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoader();
  }
};

const onBtnLoadMoreClick = async () => {
  try {
    showLoader();
    const {
      data: { totalHits, hits: images },
    } = await fetchPhotosByQuery(searchQuery, currentPage);

    refs.gallery.insertAdjacentHTML('beforeend', galleryCardsTemplate(images));
    lightbox.refresh();

    window.scrollBy({
      top: elemHeight * 2,
      left: 0,
      behavior: 'smooth',
    });

    totalPages = Math.ceil(totalHits / itemsPerPage);

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