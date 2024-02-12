import { useState, useEffect, useMemo } from 'react';
import PokemonSearchList from './PokemonSearchList';
import PokemonInfoWindow from './PokemonInfoWindow';
import { fetchAllShallowData, fetchPokemons, fetchPokemonsByUrls } from './pokemonData';

import rightArrow from './resource/right.svg';

import './css/pokemonSearchPanel.css';

export default function PokemonSearchPanel( {pokemonPerPage} ) {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [pokemonCount, setPokemonCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pokemons, setPokemons] = useState([]);
    const [pokemonShallowDataList, setPokemonShallowDataList] = useState([]);

    const maxPageNumber = Math.floor(pokemonCount / pokemonPerPage);

    useEffect(() => {
        let ignore = false;
        fetchPokemonsByUrls(pokemonShallowDataList
            .filter((data) => data.name.includes(searchPhrase))
            .slice((pageNumber - 1) * pokemonPerPage, pageNumber * pokemonPerPage)
            .map((data) => data.url)).then(result => {
                if(!ignore) {
                    setPokemons(result);
                    setSelectedIdx(0);
                }
        });
        return () => {ignore = true;};
    }, [pageNumber, pokemonPerPage, pokemonShallowDataList, searchPhrase]);

    useEffect(() => {
        fetchAllShallowData().then(data => {
            setPokemonCount(data.count);
            setPokemonShallowDataList(data.pokemonShallowDataList);
        });
    }, []);

    function handleInputChange(e) {
        setSearchPhrase(e.target.value);
        const newCount = pokemonShallowDataList.filter((data) => data.name.includes(e.target.value)).length;
        setPokemonCount(newCount);
        setPageNumber(newCount === 0 ? 0 : 1);
    }

    function handlePokemonSelect(e, key) {
        const idx = pokemons.findIndex(p => key === p.id);
        setSelectedIdx(idx);
    }

    function handlePreviousPage(e) {
        if(pageNumber === 1) {
            return;
        }
        setPageNumber(pageNumber - 1);
    }

    function handleNextPage(e) {
        if(pageNumber === maxPageNumber) {
            return;
        }
        setPageNumber(pageNumber + 1);
    }

    const optionalPokemon = selectedIdx + 1 > pokemons.length ? null : pokemons[selectedIdx];

    return (
        <div className="pokemon-search-panel-container">
            <div className="search-bar">
                <label for="pokemonName">
                    <input onChange={handleInputChange} type="text" placeholder="Search"></input>
                </label>
            </div>
            <div className="pokemon-list-container">
                <PokemonSearchList listItems={pokemons} handlePokemonSelect={handlePokemonSelect}/>
            </div>
            <div className="pokemon-info-window-container">
                <PokemonInfoWindow pokemon={optionalPokemon}/>
            </div>
            <div className="pokemon-search-page-buttons">
                <button onClick={handlePreviousPage}><img src={rightArrow} style={{ transform: "rotate(0.5turn)" }}></img></button>
                    <span className="page-number">{pageNumber} / {maxPageNumber}</span>
                <button onClick={handleNextPage}><img src={rightArrow} ></img></button>
            </div>
        </div>
    )
}