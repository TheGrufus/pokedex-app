const nameDisplay = document.getElementById("pokemon-name");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const pokeId = document.getElementById("pokemon-id");
const healthPoints = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const searchBtn = document.getElementById("search-button");
const type = document.getElementById("types");
const searchContainer = document.getElementById("search-container");
const imgElement = document.getElementById("sprite");
const searchInput = document.getElementById("search-input");

searchBtn.addEventListener("click", fetchData);


async function fetchData() {

  if (searchInput.value === '') {
    alert("Enter a pokemon name or ID");
    return;
  }

    try {

      const pokemonName = document.getElementById("search-input").value.toLowerCase();

      const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonName}`);

      if(!response.ok) {
        throw new Error("Could not fetch resource");
      }

      while (type.firstChild) {
        type.firstChild.remove();
      }

      const data = await response.json();

      imgElement.style.display = "block";

      const pokemonSprite = data.sprites.front_default;

      imgElement.src = pokemonSprite;


      nameDisplay.innerText = data.name.toUpperCase();
      pokeId.innerText = data.id;
      weight.innerText = data.weight;
      height.innerText = data.height;
      healthPoints.innerText = data.stats[0].base_stat;
      attack.innerText = data.stats[1].base_stat;
      defense.innerText = data.stats[2].base_stat;
      specialAttack.innerText = data.stats[3].base_stat;
      specialDefense.innerText = data.stats[4].base_stat;
      speed.innerText = data.stats[5].base_stat;

      const pokemonType = data.types.forEach((i) => {
        let pokeType = document.createElement("span");
        pokeType.innerText = i.type.name.toUpperCase();
        pokeType.classList.add(i.type.name);
        pokeType.classList.add("type-display");
        type.append(pokeType);
      });
    

    }
    catch(error) {
      resetDisplay();
      imgElement.style.display = "none";
      alert('Pokémon not found')
      console.error(`Pokémon not found: ${error}`);
    }

}

const resetDisplay = () => {

  // reset stats
  nameDisplay.innerText = 'Name: '
  type.innerHTML = '';
  healthPoints.textContent = '';
  speed.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  weight.textContent = '';
  height.textContent = '';
  pokeId.textContent = '';

};

searchInput.addEventListener('keydown', e => {
  if (e.code === "Enter") {
    fetchData();
    e.preventDefault();
  } 
  return;
});