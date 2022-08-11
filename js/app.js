const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImg = document.querySelector('.pokemonImg');

const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const getPokemon = async (pokemon) => {
    let apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(apiResponse.status === 200){
        const data = await apiResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Searching...';
    pokemonNumber.innerHTML = '';
    let data = await getPokemon(pokemon);
    if(data && parseInt(data.id) <= 649) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        searchPokemon = data.id;
        pokemonImg.style.display = 'block';
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    } else {
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = 'Not found D:';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let cleanInput = input.value.toLowerCase();
    renderPokemon(cleanInput);
    input.value = '';
})

btnPrev.addEventListener('click', () => {
    if(searchPokemon >= 2){
        searchPokemon--;
        renderPokemon(searchPokemon);
    } else {
        searchPokemon = 649;
        renderPokemon(searchPokemon);
    }
})

btnNext.addEventListener('click', () => {
    if(searchPokemon <= 648){
        searchPokemon++;
        renderPokemon(searchPokemon);
    } else {
        searchPokemon = 1;
        renderPokemon(searchPokemon);
    }
})

renderPokemon(searchPokemon.toString());