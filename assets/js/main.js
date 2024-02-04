const pokeDescription = document.getElementById('description')
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" id="${pokemon.name}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}
function DescriptionPokemon(pokemon, i) {
    return `
        <div class="pokemon-description ${pokemon[i].type}" id="${pokemon[i].name}">
            <span class="number">#${pokemon[i].number}</span>
            <span class="name">${pokemon[i].name}</span>
            <div class="container-detail-description">
                <div class="detail-decription">
                    <ol class="type-description">
                    ${pokemon[i].types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon[i].photo}"
                        alt="${pokemon[i].name}">
                </div>
                <div class="detail-description">
                <span>XP: ${pokemon[i].experience}</span>
                <span>altura: ${pokemon[i].height}</span>
                <span>Abilidade Principal: ${pokemon[i].MainAbility}</span>
                <span>Abilidade Segundaria: ${pokemon[i].SecundaryAbility}</span>
                </div>
            </div>
        </div>
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
    pokeApi.getPokemons(0, limit)
    .then((pokemons = []) => {
        // descrição do pokemon 
        for (let i = 0; i < pokemonList.children.length; i++) {
            const element = pokemonList.children[i];
            
            element.addEventListener('click', () => {
                pokeDescription.innerHTML = DescriptionPokemon(pokemons,i);
            });
        }   
    })

}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
