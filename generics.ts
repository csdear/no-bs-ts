
//GENERICS
/*
We copied this function from the prior tuples lesson.
This functionn is heavy on type STRING (FIVE INSTANCES)
*/
            /*
            function simpleStringState(initial: string): [() => string, (x: string) => void] {
                let str: string = initial;
                return [
                    () => str,
                    (x: string) => {
                        str = x;
                    }
                ]
            }
            */
/*
|?|WHAT if we could on the fly replace STRING with SOME OTHER TYPE??? ANY TYPE?|?|
---------------------------------------------------------------------------------
We can with generics.
ALT+CLICK after each instance of 'string' and replace with 'T'
and add a <T> before the params list
"T" will be replaced with whatever is in initial state param
side note we changed fn() name to simpleState and str to val since we are more
generic now.
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
// Note when you type simpleState( and HOVER you see  type is UNKNOWN :
    //simpleState(initial: unknown): [() => unknown, (x: unknown) => void]
// BUT type a number -- simpleState(1) and watch it magically change to type NUMBER :
    // simpleState(initial: number): [() => number, (x: number) => void]
    const [state1getter, state1setter] = simpleState(10)
    console.log(state1getter());
    state1setter(62);
    console.log(state1getter());
// npx ts-node generics.ts