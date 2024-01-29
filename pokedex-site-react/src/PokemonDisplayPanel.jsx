import './css/pokemonDisplayPanel.css'

function PokemonDisplayPanel({pokemon}) {
    return <div className="pokemon-display-container">
        <h2>{pokemon.name}</h2>
        <img src={pokemon.avatar} alt={`${pokemon.name} picture`}></img>
        <ul className="stats-list">
            <li>xd</li>
        </ul>
    </div>;
}

export default PokemonDisplayPanel;