import fetch from 'node-fetch'

export default function getProductData(barcode) {
    const baseURL = 'https://world.openfoodfacts.org/api/v0/product/'

    return fetch(baseURL + barcode)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject(response)
            }
        })
        .then((data) => {
            if (data.status) {
                return productData(data)
            } else {
                return Promise.reject('no-info')
            }
        })
}

function productData(data) {
    // Check middels spread en && operator of de voedingswaarde in de database aanwezig is, zo niet, zet deze niet in het object https://stackoverflow.com/questions/11704267/in-javascript-how-to-conditionally-add-a-member-to-an-object

    const productData = {
        name: data['product']['product_name_nl'] || data['product']['product_name'],
        img: data['product']['image_front_url'] || Object.values(data['product']['selected_images']['front']['display'])[0],
        nutriments: {
            ...(data['product']['nutriments']['energy-kcal_100g'] && {
                kcal: {
                    name: 'Calorieën',
                    value: data['product']['nutriments']['energy-kcal_100g'],
                    unit: data['product']['nutriments']['energy-kcal_unit'],
                },
            }),
            ...(data['product']['nutriments']['carbohydrates_100g'] && {
                carbs: {
                    name: 'Koolhydraten',
                    value: data['product']['nutriments']['carbohydrates_100g'],
                    unit: data['product']['nutriments']['carbohydrates_unit'],
                },
            }),
            ...(data['product']['nutriments']['fat_100g'] && {
                fat: {
                    name: 'Vetten',
                    value: data['product']['nutriments']['fat_100g'],
                    unit: data['product']['nutriments']['fat_unit'],
                },
            }),
            ...(data['product']['nutriments']['fiber_100g'] && {
                fiber: {
                    name: 'Vezels',
                    value: data['product']['nutriments']['fiber_100g'],
                    unit: data['product']['nutriments']['fiber_unit'],
                },
            }),
            ...(data['product']['nutriments']['proteins_100g'] && {
                protein: {
                    name: 'Eiwitten',
                    value: data['product']['nutriments']['proteins_100g'],
                    unit: data['product']['nutriments']['proteins_unit'],
                },
            }),
        },
        ingredients: data['product']['ingredients_text'],
    }
    return productData
}