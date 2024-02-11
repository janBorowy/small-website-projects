import './css/pokemonInfoWindow.css'

export default function PokemonInfoWindow({pokemon}) {

    if (pokemon === null) {
        return <p>Choose your pokemon</p>;
    }

    return ( 
        <div className="pokemon-info-window">
            <h2>{pokemon.name}</h2>
            <img src={pokemon.avatarUrl} alt={`${pokemon.name} pitcture`} />
            <div className="attributes-container">
                <ul className="pokemon-stats">
                    {pokemon.stats.map(stat => 
                        <li>
                            {stat.name}: {stat.base_stat}
                        </li>)}
                </ul>
            </div>
        </div>
    );
}