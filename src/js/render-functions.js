import SimpleLightbox from 'simplelightbox';

const createGalleryCardTemplate = ({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `
    <div class="gallery-wrapper">
      <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}">
        <ul class="gallery-info-list">
          <li class="gallery-info-item">
            <p class="gallery-info-title">Likes</p>
            <p class="gallery-info-value">${likes}</p>
          </li>
          <li class="gallery-info-item">
            <p class="gallery-info-title">Views</p>
            <p class="gallery-info-value">${views}</p>
          </li>
          <li class="gallery-info-item">
            <p class="gallery-info-title">Comments</p>
            <p class="gallery-info-value">${comments}</p>
          </li>
          <li class="gallery-info-item">
            <p class="gallery-info-title">Downloads</p>
            <p class="gallery-info-value">${downloads}</p>
          </li>
        </ul>
      </a>
    </div>
  `;
};

export const galleryCardsTemplate = items =>
  items.map(item => createGalleryCardTemplate(item)).join('');

export const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionDelay: 250,
  captionsData: 'alt',
});

// DOM elemanlarını seç
const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.btn-load-more');

export function renderGallery(items) {
  galleryContainer.insertAdjacentHTML('beforeend', galleryCardsTemplate(items));
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  if (loader) loader.classList.remove('hidden');
}

export function hideLoader() {
  if (loader) loader.classList.add('hidden');
}

export function showLoadMoreBtn() {
  if (loadMoreBtn) loadMoreBtn.classList.add('is-visible');
}

export function hideLoadMoreBtn() {
  if (loadMoreBtn) loadMoreBtn.classList.remove('is-visible');
}