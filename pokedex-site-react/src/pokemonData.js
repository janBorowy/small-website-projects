const baseUrl = 'https://pokeapi.co/api/v2';
const pokemonEndpoint = `${baseUrl}/pokemon`;

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

async function fetchOne(id) {
    const raw = fetch(`${pokemonEndpoint}/${id}`).then(response => response.json());
    return parseRaw(await raw);
}

export async function fetchPokemons(offset, limit) {
    const pokemons = [];
    for(let i = offset; i < offset + limit; ++i) {
        pokemons.push(await fetchOne(i + 1));
    }
    return pokemons;
}