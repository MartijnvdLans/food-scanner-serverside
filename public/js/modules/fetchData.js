import { errorState } from "./errorState.js";

export function getData(barcode) {
    const URL = 'https://world.openfoodfacts.org/api/v0/product/'

    return fetch(URL + barcode)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    })
    .then((data) => {
        if (data.status) {
            const product = {
                name: data.product.product_name,
                energy: data.product.nutriments['energy-kcal_100g'],
                carbo: data.product['nutriments'].carbohydrates_100g,
                fat: data.product['nutriments'].fat_100g,
                fiber: data.product['nutriments'].fiber_100g,
                proteins: data.product['nutriments'].proteins_100g,
                img: data.product.image_front_url
            }
            return product;
        } else {
            errorState()
        }
    })
    .catch((err) => { 
        console.warn(err);
    });
}