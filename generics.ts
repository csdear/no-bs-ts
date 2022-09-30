
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