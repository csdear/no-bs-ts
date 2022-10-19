/* Yet another Cleaner variant -- the video is different from the github
This version uses |function overloading| variants for fetchPokemon() functions
with a final -- implementation -- function that does all the hard work.

fetchPokemon() - variant I. takes a url and a cb. void return. aka the callback version.
fetchPokemon() - variant II. Only takes a url, no cb. promise returned to get you some PokemonResults. aka the  promise version.
fetchPokemon() - Implementation. Do Work

*/

//1. First the code from conditionals.ts  is imported.
//2. we removed the type FetchPokemonResult<T>

import fetch from "node-fetch";

interface PokemonResults {
    count: number;
    next?: string;
    previous?: string;
    results: {
        name: string;
        url: string;
    }[];
}
//3.  |Variant 1| : fetchPokemon no-generic (remove <T extends undef...)
// cb, remove generic T, and now  its just a function that takes data.
function fetchPokemon( url: string, cb: (data: PokemonResults) => void): void;
//4. |Variant 2| : takes url and returns a promise intead of void
function fetchPokemon( url: string): Promise<PokemonResults>;
//5. Last the |Implementation| function that actually does the work
// cb an optional here.
function fetchPokemon(
    url: string,
    cb?: (data: PokemonResults) => void
): unknown {
    if (cb) {
        fetch(url)
            .then((resp) => resp.json())
            .then(cb as any);
            return undefined;
    }
    else {

        return fetch(url).then(resp => resp.json());
    }
    }

//6.  Invocation 1 - matches signature of variant 1, the callback version - npx ts-node conditionals-redonePokestyle.ts
        // fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10", (data) => {
        //      data.results.forEach((pokemon) => console.log(pokemon.name));
        //  })
// Output Invocation 1 successful:
/*
bulbasaur
ivysaur
venusaur
charmander
charmeleon
charizard
squirtle
wartortle
blastoise
caterpie
*/

//7. Invocation 2 - matches signature of variant 2 - npx ts-node conditionals-redonePokestyle.ts
(async function () {
    const data = await fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10");
    data.results.forEach((pokemon) => console.log(pokemon.name));
})();

