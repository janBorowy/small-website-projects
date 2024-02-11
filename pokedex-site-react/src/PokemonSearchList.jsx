import './css/pokemonSearchList.css';

export default function PokemonSearchList({listItems, handlePokemonSelect}) {
    return (
        <ol className="pokemon-search-list">
            {listItems.map((p) => {
                const key = p.id;
                return <li key={key} onClick={e => handlePokemonSelect(e, key)}>
                    <img src={p.avatarUrl} /><p>{p.name}</p>
                </li>
            }
            )}
        </ol>
    )
}