
//GENERICS
/* OVERIDINNG INFERRED GENERIC TYPES
We copy the prior invocation
create a  second state, state2*
and init will null instead of 10
and in the setter we pass a string -- state2setter("str")
But  we get ERROR :
Argument of type '"str"' is not assignable to parameter of type 'null'.
Problem is  that when we pass null into simpleState(), all the "T"s
become null, that the only acceptable type is *null*. We tried to
pass and pass a string "str" and it said nuh-uh.
So we need to OVERRIDE T. we do this at simpleState's instantiation,
const [state2getter, state2setter] = simpleState<string | null>(null)
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

    const [state2getter, state2setter] = simpleState<string | null>(null)
    console.log(state2getter());
    state2setter("str"); // Argument of type '"str"' is not assignable to parameter of type 'null'.
    console.log(state2getter());

    //RANKER
    /* Takes a bunch unknown of items, each item will have rank*number*
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
    */

    function ranker<RankItem>(items: RankItem[], rank: (v: RankItem) => number ): RankItem[] {

        interface Rank{
            item: RankItem;
            rank: number;
        }

        // map all the items, return an array with 2 length, for item and rank
        const ranks = items.map((item) => ({
            item,
            rank: rank(item)
        }));

        ranks.sort((a, b) => a.rank - b.rank)
    }