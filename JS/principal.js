const ul = document.querySelector('[data-js="marvel"]');
const filterImput = document.querySelector('#filter')

import { createHash } from "./geraHash.js";
const timeStamp = Date.now().toString();
let hash = createHash( timeStamp );

const getPosts = async (param) => {
    const response = await 
    fetch(
        `https://gateway.marvel.com:443/v1/public/characters?${param}
        &ts=${timeStamp}&apikey=cb6046a1e5bef834e5908b3d66fb4484&hash=${hash}`)
        return response.json();    
}

const herosFromFedd = heros => heros.data.results.map(item => `
    <li class="card ${'normal'}">
    <img class="card-image" alt=${item.name}
    src= "${item.thumbnail.path}${'.'}${item.thumbnail.extension}"/>
    <h2 class="card-title">${item.name}</h2>
    </li>
`).join('')

const herosFromSearch = heros => heros.data.results.map(item => `
    <li class="card ${'normal'}">
    <img class="card-image" alt=${item.name}
    src= "${item.thumbnail.path}${'.'}${item.thumbnail.extension}"/>
    <h2 class="card-title">${item.name}</h2>
    <h3 class="card-description">${item.description}</h3>
    </li>
`).join('')

//Exibe os herois iniciais:

const earlyFeed = async () => {
    const heros = await getPosts('orderBy=name&limit=100');
    const postsTemplate = herosFromFedd(heros)
    ul.innerHTML = postsTemplate;
}

//Exibe os herois pesquisados:
const searchPersonIntoDOM = async (search) => {

    const heros = await getPosts(`${'name='}${search}`);
    const postsTemplate = herosFromSearch(heros)
    ul.innerHTML = postsTemplate;
}

//funcão que verifica o input "pesquisar personagens"

const modifyInputValue= event => {
    const inputValue = event.target.value.toLowerCase();
    if(inputValue != '') {
        searchPersonIntoDOM(inputValue);        
    }else if (inputValue == '' || inputValue == null){
        earlyFeed();
    }
}

// Para preenchermos o feed inicial:
earlyFeed();

// Para verificar se ocorre algum input:
filterImput.addEventListener('input', modifyInputValue)