export function errorState() {
    const errMarkup = `
    <figure class="error">
    </figure>
    <h2 class="error">NIET GEVONDEN</h2>
    <p>Het product dat u probeerd te scannen staat niet in onze database</p>
    <a id="scanbutton" class="display" href="#scan">Scan nog een product</a>
    `;

    const content = document.querySelector('#content');
    content.innerHTML = errMarkup;
}