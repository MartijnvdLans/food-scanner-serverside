export function loadingState() {
    const loadMarkup = `
            <figure class="mockup">
            </figure>
            <h2 class="mockup"></h2>
            <ul>
               <li class="mockup">Kcal:  </li>
               <li class="mockup">Koolhydraten  </li>
               <li class="mockup">Vetten  </li>
               <li class="mockup">Eiwitten  </li>
               <li class="mockup">Vezels  </li>
             </ul>
    `;

    const content = document.querySelector('#content');
    content.innerHTML = loadMarkup;
}