/** CONDITIONALS
 * Conditional Types in TS, using ternary logic IN the type definition. 
 * See the TS Docs for good info : https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
 * Also karken back to indexDune.ts where we used many Overrides and overloads eg house, houseWithID
 * etc.  TS conditionals are one way you can avoid creating thousands of Overloads and Overrides.
 * 
 * TASK HERE: A Fetch function that goes to a POKEMON API, if you give it a Callback function,
 * it will give you a void back, but if you DONT give it a callback, it will give you a Promise back.
 * Conditional, void or promise.
 * Note not the biggest fan of Fetch -- RW use Axios or crossfetch
 * 
 * POKEAPI : https://pokeapi.co/api/v2/pokemon?limit=10
 * 
 * Other off-label uses : TS and api responses
 */

/*1. Install node fetch
if might encounter common TS ERROR here -- "Could not find a declaration file
for module 'node-fetch". It is because we dont have any TYPES for node-fetch. 
to get the types you  can get a community written types for that particular package...
npm install @types/node-fetch
which will give you the types for node-fetch
*/
import fetch from "node-fetch";
//2. Define the Results from the response interface
interface PokemonResults {
    count: number;
    next?: string;
    previous?: string;
    results: {
        name: string;
        url: string;
    }[]
}

//4. This type is generic. 
// eval the type coming in (see cb?: T), seeing if it extends undefined? In that
// case we want a promise with PokemonResults[]. Otherwise return a void.
// goto 5# and add the output type
type FetchPokemonResult<T> = T extends undefined
? Promise<PokemonResults>
: void;

//3. Fetch Pokemon function, takes a url and optionally a callback
// <T extends... defines what that callback is undefined or a function
// thats given a bunch of pokemon, returning void. 
// This begs the question, what is the result of this? thats where our 
// conditional logic comes in at #4.
function fetchPokemon<T extends undefined | ((data: PokemonResults) => void)>(
    url: string, 
    cb?: T
//5. output type, where we will bring in the Type "<T>" of callback. 
//7a. unhappy here on this return signature - A function whose declared type is neither 'void' nor 'any' must return a value
// to fix this, at the end of the if and else statements, return undefined then cast as  FetchPokemonResult<T> (Error: Type 'undefined' is not
// assignable to type 'FetchPokemonResult<T>)
): FetchPokemonResult<T> {
//6a. if its a callback we want to fetch that url, get the response back, get the JSON out of that,
// then, call the callback (.then(cb))
    if (cb) {
        fetch(url)
            .then((resp) => resp.json())
            .then(cb);
//7b. Happy now?
            return undefined as FetchPokemonResult<T>;
    }
//6b. else otherwise return a fetch url with taht same JSON response 
    else {
//7c.
        return fetch(url).then(resp => resp.json()) as FetchPokemonResult<T>;
    }        
    }

//8. invocation, in this case we give it a callbackd, go through data
// and print out each name. 
// Getting errors here on results - Property 'results' does not exist on type 'PokemonResults[]'
// and Parameter 'pokemon' implicitly has an 'any' type.
// solved by going up to the type FetchPokemonResults removing the "[]"
// and the fetchPokemon function definition, removing the "[]" from PokemonResults
// -- essentially PokemonResults is not an array. 
fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10", (data) => {
    data.results.forEach((pokemon) => console.log(pokemon.name));
})
