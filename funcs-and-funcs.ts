// function parameters

// fn() that supports a callback (ie function  as a parameter)
// p1 text string. p2 callback fn() void.
// typing p2, it LOOKS  like a fn() but its actually a type specification!
// () => void
// in body, print text, then call the callback.
// This is  a example of a ts function with a cb fn() as a param but
// does not return anything -- void call.
export function printToFile(text: string, callback: () => void):  void {
    console.log(text);
    callback();
}

// array mutation function that takes an  array of numbers
// Example of a function with a cb fn() as a param with a return of type number[] array.
// p1 the numbers  array, p2 the cb fn() that is given each number and
// returns a new  number array.  We gonna call the cb fn() mutate.
// return with map, giving it the mutate function
// We then Created a type, just copy the "(v: number) => number" to it.
// Using a type reads better rahter than what you see in (Old.)
// Notice you can export the type as well (we prepended 'export' too)
// So That when someone creates a  new mutation function they
// can use the same type

// New. Added Type. Reads better. Exported also for reuse elewhere.
export type MutatationFunction = (v: number) => number

export function arrayMutate(
    numbers: number[],
    mutate: MutatationFunction
): number[] {
   return numbers.map(mutate)
}

// Old. Prior version Hard to read.
// export function arrayMutate(
//     numbers: number[],
//     mutate: (v: number) => number  //<-- this moved to a type.
// ): number[] {
//    return numbers.map(mutate)
// }

// eg. elsewhere type MutationFunction could be reused like...
// const myNewMuntateFunc: MutationFunction = (v: number) => v * 100;

// invocation
// hinted here we  need  an array of numbers for  p1, a function  for p2
// and that this will ultimately returnn an number array.
console.log(arrayMutate([1,2,3], (v) =>  v * 10 ));
// execute in console using : npx ts-node funcs-and-funcs.ts
// OUTPUT : [ 10, 20, 30 ]

/*|RETURNING FUNCTIONS|
 Functions that return functions
 Create classic JS closure
 It takes a number as p1 "num"
 And returns a new function
 Which takes a number as well "val"
 Then takes the original number "num"
 and adds it to the number bering  brought in
*/

export function createAdder(num: number) {
    return (val: number) => num + val;
}

//INV
// addOne is a new function, we initializeded with a "num" of 1
const addOne = createAdder(1);
// Then we can invoke the new addOne function
console.log(addOne(55));
//OUPUT : 56
// TAG : SUM function. initialize a starting value then add on top of that.