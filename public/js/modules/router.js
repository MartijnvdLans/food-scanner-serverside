import './vendor/routie.min.js';
import { getCamera } from './barcodeDetector.js';
import { loadingState } from './loadingState.js';
import { getData } from './fetchData.js';
import { showData } from './render.js';

export function handleRoutes() { 
    routie({
        'scanning': () => {
            getCamera()
        },
        'product/:barcode': barcode => {
            loadingState();
            getData(barcode)
            .then(data => showData(data))
        }
    })
};