const apiEndpoint = 'https://pokeapi.co/api/v2'

const findPokemonByName =
    async (name) => {
  const response = await fetch(`${apiEndpoint}/pokemon/${name}`)
  if (!response.ok) {
    throw Error('Pokemon not found!');
  }
  return response.json();
}

const pokemonNotFoundHandler =
    (reason) => {
      console.log('Pokemon could not be found!');
    }

const submitSearch =
    async (form) => {
  const data = findPokemonByName(form.searchPhrase.value.toLowerCase());
  data.catch(pokemonNotFoundHandler);
  data.then((data) => {
    const pokemon = parseData(data);
    updatePokemonInfo(pokemon);
  })
}

const parseData =
    (data) => {
      const pokemon = {};
      pokemon['name'] = data['name'];
      pokemon['sprite'] = data['sprites']['front_default'];
      pokemon['stats'] = [];
      console.log(`data stats: ${data['stats']}`)
      for (statData of data['stats']) {
        const stat = {
          name: statData['stat']['name'],
          base_stat: statData['base_stat']
        };
        pokemon['stats'].push(stat)
      }
      return pokemon;
    }

const updatePokemonInfo = (pokemon) => {
  const main = document.querySelector('main');
  const pokemonInfo = document.querySelector('#pokemon-info');

  if (main.hidden) {
    main.hidden = false;
  }

  const headline = document.querySelector('#pokemon-info .headline');
  const image = document.querySelector('#pokemon-info .avatar');
  const statsList = document.querySelector('#pokemon-info .stats-list');
  headline.textContent = pokemon.name;
  image.src = pokemon.sprite;

  while (statsList.hasChildNodes()) {
    statsList.removeChild(statsList.firstChild);
  }

  for (stat of pokemon['stats']) {
    const listItem = document.createElement('li');
    listItem.textContent = `${stat.name}: ${stat.base_stat}`
    statsList.appendChild(listItem);
  }
}