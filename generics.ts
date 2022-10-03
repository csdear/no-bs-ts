

/* - GENERICS - I. OVERIDINNG INFERRED GENERIC TYPES
To demonstrate, we copy the simpleState() fn
We copy the prior invocation as state2
create a  second state, state2*
and init will null instead of 10...
And in the setter we pass a string -- state2setter("str")
But  we get ERROR :
    Argument of type '"str"' is not assignable to parameter of type 'null'.

Problem is  that when we pass null into simpleState(), all the "T"s
become null, that the only acceptable type is *null*. We tried to
pass and pass a string "str" and it said nuh-uh.

So we need to OVERRIDE T. We do this at simpleState's instantiation,
    const [state2getter, state2setter] = simpleState<string | null>(null)
    Now T can be of type null or string.
*/

function simpleState<T>(initial: T): [() => T, (x: T) => void] {
    let val: T = initial;
    return [
        () => val,
        (x: T) => {
            val = x;
        }
    ]
}

    const [state1getter, state1setter] = simpleState(10)
    console.log(state1getter());
    state1setter(62);
    console.log(state1getter());

    // Demo generics
    const [state2getter, state2setter] = simpleState<string | null>(null)
    console.log(state2getter());
    state2setter("str"); // Argument of type '"str"' is not assignable to parameter of type 'null'.
    console.log(state2getter());

    //II. RANKER
    /* This Fn() Takes a bunch unknown of items, each item will have rank*number*
    Generic, later we'll use with a list  of pokemons,  but this could be used for
    a list of anything.

    We dont like *unknown* as a type, so we change it to RankItem, then declare it
    a generic -- ranker<RankItem>
    Then we create a new array, ranks.  We'll iterate through all the  items  using map.
    for each (i)tem, we will create a new  structure, where we have the (i)tem, then its rank.
    We set the value of the rank: property by calling fn() input param 'rank' on the (i)tem
    So this ranks via this map function is going to be an array  with two items in it
    Next we are going to sort that.
    Lastly, return ranks.map (we want to return an array) and peel off the rank.item, now
    an array sorted by item name.
    Back up a few links, what is the TYPE of this guy -- const ranks
    We cursor on it, CMD K, CMD I, and our Hover context window shows :
                const ranks: {
                    item: RankItem;
                    rank: number;
                }[]
    item is a *RankItem* and rank is a *number*
    With that knowledge, we can define the interface.
    From the CMD K, CMD I window, copy from brack to bracket
    and place the interface avoce const ranks.
    Define the interface in the singular as 'Rank'
    CSD> POWER MOVE - Interface naming convention : I noticed that when you have an ARRAY ( and probably same thing goes
        for objects) that  you need  a interface or type for, FIRST you name the interface in the  SINGULAR.  e.g.
        const ranks becomes interface Rank, const pizzas becomes interface Pizza, const people becomes interface Person,
        const cows becomes interface Cow etc etc.  @SFL this knowledge to the ts interfaces section.
        SECOND to apply the type, you type  annotate it to the  right as usual, add the interface name and a BRACKET. This
        denotes that  this is an  ARRAY, having many items, of said type. For example,  const ranks: Rank[] - const cows: Cow[]
        const people: Person[], const pizzas: Pizza[] etc etc.  @SFL in your notes include this ranker function so we  can have
        CONTEXT.

        MAKE A GENERIC INTERFACE for  an Array
        1. On the const, let etc variable, CMD-K,CMK-I and copy from the context window the types :
                const ranks: {
                    item: RankItem;
                    rank: number;
                }[]
        2. Add a interface within the function  near the top. make the interface name TitleCased
           and Singular. eg from "ranks" to "Rank". Then copy the type object you got from the prior
           context window.

        3. Then type the original const/let/var, with the interface name followed by '[]'
            e.g., const ranks: Rank[]

        **4.** FURTHER AND BETTER - Place interface outside so other functions can use the interface
              and to  meet interface-on-the-outside convention.  Below I've copied and pasted the
              interface before the function and commented out the internal implementation.

          5. Notice though RankItem is in the RED. Cannot find name RankItem.  To fix this this
            rank item needs to  be passed in as a <GENERIC> too using the <> syntax

          6. Lastly update the array const with the  new interace definition. (dont forget the trailing '[]')
                    (-) const ranks: Rank[]
                    (+) const ranks: Rank<RankItem>[]
            */

    interface Rank<RankItem>{
        item: RankItem;
        rank: number;
    }

    function ranker<RankItem>(
        items: RankItem[],
        rank: (v: RankItem) => number
    ): RankItem[] {

        // interface Rank{
        //     item: RankItem;
        //     rank: number;
        // }

        // map all the items, return an array with 2 length, for item and rank
        const ranks: Rank<RankItem>[] = items.map((item) => ({
            item,
            rank: rank(item)
        }));

        // OUTPUT:
        // console.log(ranks);
        // [
        //     { item: { name: 'Bulbasaur', hp: 20 }, rank: 20 },
        //     { item: { name: 'Charzar', hp: 5 }, rank: 5 }
        // ]
        ranks.sort((a, b) => a.rank - b.rank)

        // return ranks mapped, peeling off the item, rank score not needed.
        return ranks.map((rank) => rank.item);

    }

    // To test  ranker out, we need a list of pokemon.
    // first make a Pokemon interface
    // @SFL as ts list, ts array of objects
    interface Pokemon {
        name: string;
        hp: number;
    }

    const pokemon: Pokemon[] = [
        {
            name: "Bulbasaur",
            hp: 20,
        },
        {
            name: "Charzar",
            hp: 5,
        },
    ]

    /* Next invoke ranker fn(), pass in pokemon list, and a function as p2,
    Hint at start when  typing ranker()
       ranker(items: unknown[], rank: (v: unknown) => number): unknown[]
    ... meaning it takes 'items' but of unknown ARRAY type.. well we want to process a
    list of pokemon here, so we pass for p1 the pokemon list of type Pokemon[]
    Next, ranker fn() hint says :  ranker(items: Pokemon[], rank: (v: Pokemon) => number): Pokemon[]
    How to Read this : that the second parameter is a fn() -- the  'rank' function, and that it takes
    a SINGLE pokemon and returns a number ((v: Pokemon) => number)
    for this example we want hitpoints out of each pokemon and will return pokemon.
    as long as the field is  a number it can be ranked.
    note this is a map destructure
    */
    const ranks = ranker(pokemon, ({ hp }) => hp);
    console.log(ranks);
    // OUTPUT :  output sorted from hp low to high.
    // [ { name: 'Charzar', hp: 5 }, { name: 'Bulbasaur', hp: 20 } ]