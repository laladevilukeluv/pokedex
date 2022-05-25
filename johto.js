const pokeContainer = document.querySelector("#poke-container");
const pokemonCount = 251;
const colors = {
  fire: "#E97451",
  bug: "#C9CC3F",
  grass: "#DEFDE0",
  electric: "#FFEA00",
  water: "#DEF3FD",
  ghost: "#DA70D6",
  poison: "#E0B0FF",
  ground: "#f4e7da",
  rock: "#C2B280",
  dragon: "#97b3e6",
  ice: "#A5F2F3",
  psychic: "#FFB6C1",
  flying: "#F5F5F5",
  fighting: "#E34234",
  normal: "#F5F5F5",
  fairy: "#fceaff",
  steel: "#C0C0C0",
  dark: "#966919",
};

const mainTypes = Object.keys(colors);

const axiosPokemons = async () => {
  for (let i = 152; i <= pokemonCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    createPokemonCard(res.data);
  } catch (e) {
    console.log("ERROR", e);
  }
};

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  let name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  let tempName = "";
  if (name.includes("-") && name.length >= 12) {
    const index = name.indexOf("-");
    tempName = name.slice(0, index);
    name = tempName;
  }
  const id = pokemon.id.toString().padStart(3, "0");
  let pokeTypes = pokemon.types.map((type) => type.type.name);
  let type = mainTypes.find((element) => pokeTypes.indexOf(element) == 0);
  let mainColor = type;
  if (pokeTypes.length == 2) {
    const anotherType = pokeTypes[1];
    type = pokeTypes[0] + "/" + anotherType;
  }

  const color = colors[mainColor];

  pokemonEl.style.backgroundColor = color;
  const searchBar = document.forms["searchPokemon"].querySelector("input");
  searchBar.addEventListener("keyup", function (e) {
    const term = e.target.value;
    if (name.toLowerCase() == term.toLowerCase()) {
      console.log(pokeContainer);
      pokeContainer.innerHTML = "";
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
      pokeContainer.appendChild(pokemonEl);
    }
  });
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
  pokeContainer.appendChild(pokemonEl);
};
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

axiosPokemons();
