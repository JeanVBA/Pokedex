const pokemonList = document.getElementById("pokemonList");
const cardPokemon = document.getElementById("cardPokemon");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}" onclick="fetchPokemonData(${
    pokemon.number
  })">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}
function infoCardPokemon(pokemon) {
  return `
          <body>
    <div id="cardPokemon">
      <div id="backcardName">
        <h3 id="Ola">${pokemon.number}</h3>
        <h4>Numero</h4>
      </div>
      <div id="backcardImage">
        <img src="${pokemon.photo}" alt="" />
      </div>
      <div id="backcardAbilites">
        <h3>Habilidades</h3>
        <div>
          <h4>Habilidade 1</h4>
          <h4>Habilidade 1</h4>
          <h4>Habilidade 1</h4>
        </div>
      </div>
    </div>
  `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}
function cardPokedex(id) {
  getPokemon(id).then((pokemons = []) => {
    const newHtml = pokemons.map(infoCardPokemon).join("");
    cardPokemon.innerHTML += newHtml;
  });
}
loadPokemonItens(offset, limit);

function getPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
}

function CreateCard() {}

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

function fetchPokemonData(id) {
  // URL da API do PokeAPI para o Pokémon 1 (Bulbasaur)
  var apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  // Faz a requisição à API usando o método fetch
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Atualiza o nome do Pokémon na página
      var pokemonName = data.name;
      var pokemonNumber = data.id;
      var pokemonImg = data.sprites.front_default;
      var pokemonHabilidades = data.abilities;
      for (var i = 0; i < pokemonHabilidades.length; i++) {
        if (pokemonHabilidades.lengh == 1) pokemonHabilidade2 = "";
        if (i == 0) var pokemonHabilidade1 = pokemonHabilidades[0].ability.name;
        if (i == 1) var pokemonHabilidade2 = pokemonHabilidades[1].ability.name;
      }
      var pokemonStats = data.stats;
      console.log(pokemonStats);
      console.log(pokemonStats[0].base_stat);
      console.log(pokemonStats[0].stat.name);
      document.getElementById("pokemon-name").textContent = pokemonName;
      document.getElementById("pokemon-number").textContent = pokemonNumber;
      document.getElementById("pokemon-number").textContent = pokemonNumber;
      document.getElementById("Abilites_1").textContent = pokemonHabilidade1;
      document.getElementById("Abilites_2").textContent = pokemonHabilidade2;
      document.getElementById("Stats_1").textContent =
        pokemonStats[0].stat.name + " - " + pokemonStats[0].base_stat;
      document.getElementById("Stats_2").textContent =
        pokemonStats[1].stat.name + " - " + pokemonStats[1].base_stat;
      document.getElementById("Stats_3").textContent =
        pokemonStats[2].stat.name + " - " + pokemonStats[2].base_stat;
      document.getElementById("Stats_4").textContent =
        pokemonStats[3].stat.name + " - " + pokemonStats[3].base_stat;
      document.getElementById("Stats_5").textContent =
        pokemonStats[4].stat.name + " - " + pokemonStats[4].base_stat;
      var imgElement = document.getElementById("pokemon-img");
      imgElement.setAttribute("src", pokemonImg);
      MostrarAbilites();
    })
    .catch((error) => {
      console.log("Ocorreu um erro: " + error);
    });
}

// Adiciona um evento de clique ao botão
document
  .getElementById("get-pokemon-button")
  .addEventListener("click", fetchPokemonData);

function MostrarAbilites() {
  document.getElementById("Abilites_1").style.display = "block";
  document.getElementById("Abilites_2").style.display = "block";
  document.getElementById("Stats_1").style.display = "none";
  document.getElementById("Stats_2").style.display = "none";
  document.getElementById("Stats_3").style.display = "none";
  document.getElementById("Stats_4").style.display = "none";
  document.getElementById("Stats_5").style.display = "none";
}
function MostrarStats() {
  document.getElementById("Abilites_1").style.display = "none";
  document.getElementById("Abilites_2").style.display = "none";
  document.getElementById("Stats_1").style.display = "block";
  document.getElementById("Stats_2").style.display = "block";
  document.getElementById("Stats_3").style.display = "block";
  document.getElementById("Stats_4").style.display = "block";
  document.getElementById("Stats_5").style.display = "block";
}
