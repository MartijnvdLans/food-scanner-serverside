export function showData(product) {
    const productMarkup = `
    <figure>
                   <img src=${product.img}>
                </figure>
                <h2>${product.name}</h2>
                <ul>
                    <li>Kcal:  ${product.energy}</li>
                    <li>Koolhydraten  ${product.carbo}</li>
                    <li>Vetten  ${product.fat}</li>
                    <li>Eiwitten  ${product.proteins}</li>
                    <li>Vezels  ${product.fiber}</li>
                </ul>
                <a id="scanbutton" class="display" href="#scan">Scan nog een product</a>
    `;
    
    const content = document.querySelector('#content');
    content.innerHTML = productMarkup;
}