const poke_container = document.getElementById("poke-container");
const pokemon_count = 251;
const colors = {
  rock: "#C2B280",
  dark: "#C4A484",
  fire: "#E97451",
  bug: "#C9CC3F",
  water: "#DEF3FD",
  grass: "#DEFDE0",
  electric: "#FFEA00",
  ghost: "#DA70D6",
  poison: "#E0B0FF",
  steel: "#D3D3D3",
  ground: "#f4e7da",
  dragon: "#97b3e6",
  ice: "#A5F2F3",
  psychic: "#FFB6C1",
  flying: "#F5F5F5",
  fighting: "#E34234",
  normal: "#F5F5F5",
  fairy: "#fceaff",
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 152; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  let name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  let tempName = "";
  if (name.includes("-") && name.length >= 12) {
    const index = name.indexOf("-");
    tempName = name.slice(0, index);
    console.log(tempName);
    name = tempName;
  }
  const id = pokemon.id.toString().padStart(3, "0");

  let poke_types = pokemon.types.map((type) => type.type.name);
  console.log(poke_types);
  let type = main_types.find((element) => poke_types.indexOf(element) == 0);
  let mainColor = type;
  if (poke_types.length == 2) {
    const anotherType = poke_types[1];
    type = poke_types[0] + "/" + anotherType;
  }

  const color = colors[mainColor];

  pokemonEl.style.backgroundColor = color;

  const pokemonInnerHTML = `
    <div class="img-container">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
    </div>
    `;

  pokemonEl.innerHTML = pokemonInnerHTML;

  poke_container.appendChild(pokemonEl);
};
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

fetchPokemons();
