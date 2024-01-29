import PokemonSearchPanel from "./PokemonSearchPanel";
import PokemonDisplayPanel from "./PokemonDisplayPanel";

import './css/main.css'

function Main(props) {

    return (
        <main>
            <article>
                <PokemonSearchPanel />
                <PokemonDisplayPanel pokemon={{
                    name: "charizard",
                    avatar: "https://przemysl.pl/download//3651/jan_pawel_ii.jpeg"
                }}/>
            </article>
        </main>
    );
}

export default Main;