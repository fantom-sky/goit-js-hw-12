import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


import { getImagesByQuery, pageLimit, } from './js/pixabay-api';
import * as userRender from './js/render-functions';
// import {
//     btnLoadMore, 
//     clearGallery,
//     createGallery,
//     hideLoader,
//     showLoader,
//     hideLoadMoreButton,
//     showLoadMoreButton,
// } from './js/render-functions';


// userRender.hideLoadMoreButton();
userRender.hideLoader();


const searchForm = document.querySelector('.form');

let currentPage = 1;
let searchQuery = '';

searchForm.addEventListener('submit', handleSubmit);
userRender.btnLoadMore.addEventListener('click', onLoadMore);


async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    searchQuery = form.elements['search-text'].value.trim();
    // console.log('searchQuery :' , searchQuery);    

    if (!searchQuery.length) {
        return iziToast.warning({
            title: 'Caution',
            message: 'Please enter your query!',
            position: 'topRight',
            timeout: 7000,
        });
    }

    currentPage = 1;
    userRender.clearGallery();
    
    userRender.hideLoadMoreButton();
    userRender.showLoader();
    

    try {
        const data = await getImagesByQuery(searchQuery, currentPage);

        if (data.hits.length > 0) {
            userRender.createGallery(data.hits);
            // userRender.showLoadMoreButton();
            userRender.hideLoader();
            const totalPages = Math.ceil(data.totalHits / pageLimit);

            if (currentPage >= totalPages) {
                userRender.hideLoadMoreButton();
                return iziToast.info({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'bottomRight',
                    messageColor: "#4e75ff",
                    backgroundColor: "#F6FF00",
                    timeout: 7000,
                });
            } else {
                userRender.showLoadMoreButton();
            }
        } else {
            userRender.hideLoader();
            return iziToast.info({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'center',
                messageColor: "#F6FF00",
                backgroundColor: "#4e75ff",
                timeout: 7000,
            });
        }
    } catch (error) {
        iziToast.error({
            message: 'Something went wrong! Please try new query!',
            position: 'center',
            timeout: 7000,
        });
        console.error('Error 2!!!', error);
    } finally {
        userRender.hideLoader();
        form.reset();
    }
}



async function onLoadMore(event) {
    currentPage++;
    
    userRender.hideLoadMoreButton();
    userRender.showLoader();
    userRender.btnLoadMore.disabled = true;

    try {
        const dataNextPage = await getImagesByQuery(searchQuery, currentPage);
        userRender.createGallery(dataNextPage.hits);

        userRender.hideLoader();
        smoothScroll();

        const totalPages = Math.ceil(dataNextPage.totalHits / pageLimit);

        if (currentPage >= totalPages) {
            userRender.hideLoadMoreButton();
            return iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'bottomRight',
                messageColor: "#4e75ff",
                backgroundColor: "#F6FF00",
                timeout: 7000,
            });
        } else {
            userRender.showLoadMoreButton();
            userRender.btnLoadMore.disabled = false;
        }
    } catch (error) {
        userRender.hideLoader();
        iziToast.error({
            message: 'Something went wrong while loading more images!',
            position: 'center',
            timeout: 7000,
        });
        console.error('Error 1!!!', error);
    } finally{
        userRender.hideLoader();       
    }
}

function smoothScroll() {
    const galleryItem = document.querySelector('.gallery-stat-item');
    if (galleryItem) {
    // getBoundingClientRect() возвращает объект с размерами элемента
    const itemHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({
        top: itemHeight * 2,
        behavior: 'smooth',
    });
  }
}

