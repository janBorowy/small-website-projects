import './css/pokemonSearchPanel.css'

function PokemonSearchPanel(props) {

    return (
        <div className="pokemon-search-container">
            <input type="text" placeholder="Type pokemon name..."/>
            <button type="button" onClick={() => {}}>Search</button>
        </ div>
    );
}

export default PokemonSearchPanel;