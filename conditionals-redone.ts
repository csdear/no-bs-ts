/*
Note was getting error trying to run because using node-fetch, and there is some hiccup in require
vs import

PROBLEM : 
Error [ERR_REQUIRE_ESM]: require() of ES Module G:\Repos\no-bs-ts\ts-basics\node_modules\node-fetch\src\index.js from G:\Repos\no-bs-ts\ts-basics\conditionals-redone.ts not supported.
Instead change the require of index.js in G:\Repos\no-bs-ts\ts-basics\conditionals-redone.ts to a dynamic import() which is available in all CommonJS modules.
    at require.extensions.<computed> [as .js] (G:\Repos\no-bs-ts\ts-basics\node_modules\ts-node\dist\index.js:851:20)
    at Object.<anonymous> (G:\Repos\no-bs-ts\ts-basics\conditionals-redone.ts:15:38)
    at m._compile (G:\Repos\no-bs-ts\ts-basics\node_modules\ts-node\dist\index.js:857:29)
    at require.extensions.<computed> [as .ts] (G:\Repos\no-bs-ts\ts-basics\node_modules\ts-node\dist\index.js:859:16)
    at phase4 (G:\Repos\no-bs-ts\ts-basics\node_modules\ts-node\dist\bin.js:466:20)
    at bootstrap (G:\Repos\no-bs-ts\ts-basics\node_modules\ts-node\dist\bin.js:54:12)
    at main (G:\Repos\no-bs-ts\ts-basics\node_modules\ts-node\dist\bin.js:33:12)
    at Object.<anonymous> (G:\Repos\no-bs-ts\ts-basics\node_modules\ts-node\dist\bin.js:579:5) {
  code: 'ERR_REQUIRE_ESM'

SOLUTION 
-  (It was complicated and followed every try on stack overflow)
- ref : Hoziefa Alhassan : https://stackoverflow.com/questions/62096269/cant-run-my-node-js-typescript-project-typeerror-err-unknown-file-extension

1. add to package.json
    "type": "module",

2.  tsconfig.json
  {
  "compilerOptions": {
    [...]
    "module": "ESNext",
    "moduleResolution": "Node",
    [...]
    },
  "ts-node": {
    "esm": true
  }

3. npx ts-node conditionals-redone.ts
<<< successful list of pokemons...



*/

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

type fetchURLReturn<T> = T extends undefined ? Promise<PokemonResults> : void;
// getting error on data var : Argument of type 'unknown' is not assignable to parameter of type 'PokemonResults'
// fixed with cast to any -- cb(data as any)
function fetchPokemon<T extends undefined | ((data: PokemonResults) => void)>(
  url: string,
  cb?: T
): fetchURLReturn<T> {
  if (cb) {
    fetch(url)
      .then((data) => data.json())
      .then((data) => cb(data as any));
    return undefined as fetchURLReturn<T>;
  } else {
    return fetch(url).then((data) => data.json()) as fetchURLReturn<T>;
  }
}

// fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10", (data) => {
//   data.results.forEach(({ name }) => console.log(name));
// });

(async function () {
  const data = (
    await fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10")
  ) as PokemonResults;
  data.results.forEach(({ name }) => console.log(name));
})();