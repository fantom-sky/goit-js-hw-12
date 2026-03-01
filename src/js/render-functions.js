import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const galleryListEl = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export const btnLoadMore = document.querySelector('.js-load-more');


const gallery = new SimpleLightbox('.gallery a', {
   captionsData: 'alt',
   captionDelay: 250,   
});

export function createGallery(images) { 
    const imgGallery = images
        .map(
            ({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads,
            }) => `
            <li class="gallery-item">
                <a class="gallery-link" href="${largeImageURL}">
                <img
                    class="gallery-image"
                    src="${webformatURL}"
                    alt="${tags}"
                    />
                </a>
                <ul class="gallery-stat-list">
                    <li class="gallery-stat-item">
                        <p><b>Likes</b></p>
                        <p>${likes}</p>
                    </li>
                    <li class="gallery-stat-item">
                        <p><b>Views</b></p>
                        <p>${views}</p>
                    </li>
                    <li class="gallery-stat-item">
                        <p><b>Comments</b></p>
                        <p>${comments}</p>
                    </li>
                    <li class="gallery-stat-item">
                        <p><b>Downloads</b></p>
                        <p>${downloads}</p>
                    </li>
                </ul>
            </li>
            `)
        .join("");
    
    galleryListEl.insertAdjacentHTML("beforeend", imgGallery);
    gallery.refresh();
}


export function clearGallery() {
    galleryListEl.innerHTML = '';
}

export function showLoader() {
    loader.classList.add('loader');
}

export function hideLoader() {
    loader.classList.remove('loader');
}

export function showLoadMoreButton() {
  btnLoadMore.classList.remove('visually-hidden');
}

export function hideLoadMoreButton() {
  btnLoadMore.classList.add('visually-hidden');
}
