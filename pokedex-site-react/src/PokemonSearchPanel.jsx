import { useState, useEffect } from 'react';
import PokemonSearchList from './PokemonSearchList';
import PokemonInfoWindow from './PokemonInfoWindow';
import { fetchPokemons } from './pokemonData';

import './css/pokemonSearchPanel.css';

export default function PokemonSearchPanel( {onPokemonChange} ) {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetchPokemons(0, 5).then(result => setPokemons(result));
    }, []);

    function handleInputChange(e) {
        setSearchPhrase(e.target.value);
    }

    function handleSearch(e) {
    }

    function handlePokemonSelect(e, key) {
        const idx = pokemons.findIndex(p => key === p.id);
        setSelectedIdx(idx);
    }

    const optionalPokemon = selectedIdx + 1 > pokemons.length ? null : pokemons[selectedIdx];

    return (
        <div className="pokemon-search-panel-container">
            <div className="search-bar">
                <label for="pokemonName">
                    <input onChange={handleInputChange} type="text" placeholder="Type pokemon name..."></input>
                </label>
                    <button onClick={handleSearch} type="button">Search</button>
            </div>
            <div className="pokemon-list-container">
                <PokemonSearchList listItems={pokemons} handlePokemonSelect={handlePokemonSelect}/>
            </div>
            <div className="pokemon-info-window-container">
                <PokemonInfoWindow pokemon={optionalPokemon}/>
            </div>
        </div>
    )
}