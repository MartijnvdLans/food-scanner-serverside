import express from 'express';
import ejs from 'ejs';
import getProductData from './controllers/fetchData.js'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


// set templating engine
app.set('view engine', 'ejs');
//where the templates are stored
app.set('views', 'views');

// public folder location
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
// Routing

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/scan', (req, res) => {
    res.render('scanning')
})

app.get('/scan#scanning', (req, res) => {
    res.render('scanning')
})

app.get('/product/:barcode', (req, res) => {
    getProductData(req.params.barcode)
        .then((productData) => res.render('product', { productData }))
        .catch((status) => res.render('error', { error: status }))
})

// http://localhost:3000/#product/9002490100070

function server() {
    console.log('The server is running succesfully! at http://localhost:3000/');
}

app.listen(port, server)