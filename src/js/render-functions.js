// src/js/render-functions.js
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.js-gallery');

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
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
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

const galleryCardsTemplate = items =>
  items.map(item => createGalleryCardTemplate(item)).join('');

const lightbox = new SimpleLightbox('.js-gallery a', {
  captions: true,
  captionDelay: 250,
  captionsData: 'alt',
});

export { galleryCardsTemplate, lightbox };