
// Later if I figure this out, could reduce alot of redundency
// Dead code for now.

// // |Preamble| Not a very useful function it just returns back whatever we send.
// //But let's start from this and see how to use generics.
// const func = <T>(arg: T) => arg
// // We pass type declarations '<number>' as well as our normal params '12'.
// console.log(func<number>(12));

// //|Sample Problem to be solved.. many redundant types/interfaces|
// //Imagine data from an API, or multiple APIS response. Game and UserGame are types we expect from different API
// // responses and notice they all have the same shape. Only the first type -- item: Game, items: Game[] etc vary.
// // CSD> reminds me of my types file in next garbage.. could I make better with generics?
// // note these were all prepended with export..

// /*
// type AsyncGame = {
//     item: Game
//     fulfilled?: boolean
//     loading?: boolean
//     error?: boolean
//   }
//   type AsyncGames = {
//     items: Game[]
//     fulfilled?: boolean
//     loading?: boolean
//     error?: boolean
//   }
//   type AsyncUserGame = {
//     item: UserGame
//     fulfilled?: boolean
//     loading?: boolean
//     error?: boolean
//   }
//   type AsyncUserGames = {
//     items: UserGame[]
//     fulfilled?: boolean
//     loading?: boolean
//     error?: boolean
//   }
//   */

//   // |Solution is a Generic Type|
//   // data T replaces UserGame, UserGame[], Game[] etc.
//   interface Game<Game>{
//     item: RankItem;
//     rank: number;
// }

//   type AsyncData<T> = {
//     data: T
//     fulfilled?: boolean
//     loading?: boolean
//     error?: boolean
//   }

//   // Now, we can create any number of types that wraps other types along with the network statuses.
//         type AsyncGames = AsyncData<Game[]>
//         type AsyncGame = AsyncData<Game | null>
//         type AsyncUser = AsyncData<User | null>
//         type AsyncUserGames = AsyncData<UserGame[]>
//         type AsyncBrowseGames = AsyncData<BrowseGame[]>


export type AsyncData<T> = {
    data: T
    fulfilled?: boolean
    loading?: boolean
    error?: boolean
  }

  interface Game<GameItem>{
    item: GameItem;
}

export type AsyncGames = AsyncData<Game[]>
export type AsyncGame = AsyncData<Game | null>
export type AsyncUser = AsyncData<User | null>
export type AsyncUserGames = AsyncData<UserGame[]>
export type AsyncBrowseGames = AsyncData<BrowseGame[]>