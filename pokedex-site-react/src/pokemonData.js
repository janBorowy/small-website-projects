const baseUrl = 'https://pokeapi.co/api/v2';
const pokemonEndpoint = `${baseUrl}/pokemon`;

const MAX_LIMIT = 9999;

function getAvatar(sprites) {
    if (sprites === undefined){
        return ''
    } else if (sprites['front_default']) {
        return sprites['front_default'];
    } else if (sprites['front_shiny']) {
        return sprites['front_shiny'];
    } else if (sprites['front_female']) {
        return sprites['front_female'];
    } else if (sprites['front_shiny_female']) {
        return sprites['front_shiny_female'];
    }
    return '';
}

function getStats(stats) {
    if(stats === undefined) {
        return [];
    }
    return stats.map((stat) => {
        return {"name": stat["stat"]["name"], "base_stat": stat["base_stat"]};
    });
}

function parseRaw(raw) {
    return {
        id: raw["id"],
        name: raw["name"],
        avatarUrl: getAvatar(raw["sprites"]),
        stats: getStats(raw["stats"])
    }
}

async function fetchOneById(id) {
    return parseRaw(await fetch(`${pokemonEndpoint}/${id}`).then(response => response.json()));
}

async function fetchOneByUrl(url) {
    return parseRaw(await fetch(url).then(response => response.json()));
}

export async function fetchPokemons(offset, limit) {
    const pokemons = [];
    for(let i = offset; i < offset + limit; ++i) {
        pokemons.push(await fetchOneById(i + 1));
    }
    return pokemons;
}

export async function fetchPokemonsByUrls(urls) {
    const pokemons = [];
    for(const u of urls) {
        pokemons.push(await fetchOneByUrl(u));
    }
    return pokemons;
}

export async function fetchAllShallowData() {
    const outputData = {};
    await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_LIMIT}`)
        .then(response => response.json())
        .then(data => {
            outputData.count = data['count'];
            outputData.pokemonShallowDataList = data['results'];
        }
    )
    return outputData;
}