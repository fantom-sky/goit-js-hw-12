import axios from 'axios';

const keyAPI = "54842065-4aabfdb1463b75fbfdf76b66f";
const urlAPI = "https://pixabay.com/api/";

export const pageLimit = 15;

export async function getImagesByQuery(query, page = 1) {
    const response = await axios.get(urlAPI, {
        params: {
            "key": keyAPI,
            "q": `${query}`,
            "image_type": "photo",
            "orientation": "horizontal",
            "safesearch": true,
            page,
            per_page: pageLimit,
        }
    });

    return response.data;
}

