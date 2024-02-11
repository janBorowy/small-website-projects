import { useState } from 'react';
import './css/main.css'

import PokemonSearchPanel from './PokemonSearchPanel';

function Main(props) {
    return (
        <main>
            <article>
                <PokemonSearchPanel/>
            </article>
        </main>
    );
}

export default Main;