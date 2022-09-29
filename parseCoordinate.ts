/* #4 - Function overloading in typescript.
 ToDo: a Fn(), that parses coodinates, but can do so many different
 input variants, whether coords passed in as  a number, an object or a  string.
 */

 // Define our interface for a coordinate
 interface Coordinate {
     x: number;
     y: number;
 }

 // For instance, The following two functions are normal, non-overloaded functions
 // that can only handle one type an object (FromObject) or handles numbers (FromNumbers)
 // In the first fn(), to process coord from obj, that obj passed in is of type
 // coord, and it will return a coordinate into a new object via
 // spread. return-spread-object.
 function parseCoordinateFromObject(obj: Coordinate): Coordinate {
     return {
         ...obj,
     }
 }
 console.log('\nNon-Overloaded parseCoordinateFromObject : ');
 console.log(parseCoordinateFromObject({x: 10, y: 20}));

 // Then a second function, but this, instead of taking  the coords from an
 // obj, takes them from direct x and y numbers.
 // Takes a x and why *number* and returns a *Coordinate*
 function parseCoordinateFromNumbers(x: number, y: number): Coordinate {
     return {
         x,
         y,
     }
 }
 console.log('\nNon-Overloaded parseCoordinate(numbers)');
 console.log(parseCoordinate(10, 20));

 // BUT, in JS we'd normally have a parseCoordinateFunction, which
 // would look at the arguments coming in, and make a descision about how
 // to  handle the inputs whether they are objects, numbers or a string. ie that
 // if I get an object, I will parse it and make return an object, but if I
 // get it as numbers, i'll do something different.
 // We can do this via FUNCTION OVERLOADING. This will make our function more robust,
 // more elegantly engineered and we wont need multiple variants of the function to handle
 // each input nuance, we can do it all in ONE function.


// First we  define the variants that we want to process... a variant for Object(s), Numbers
// and Strings.  Then we create a implementation function to handle the logic, casting and coercing.
// eg variant1 we copy from above(params & return type) :  (obj: Coordinate): Coordinate
// And variant2 also copied from  above : (x: number, y: number): Coordinate
// and we just define it -- no implementation ie  no statement body yet.
// Then define a 4th (implementation)  function that will contain the implmentation
// which will cast and coerce the values that come in
// we  define two params, arg1 and arg2 as type *unknown* because
// we dont what we will be getting. But we do know, we wannt a return
// type of Coordinate.
// What is "unknown" -- basically ANY, but you have to cast it before you
// use it. Like a Safe ANY.
// Error: This overload signature is not compatible with its implementation signature
// Which means fn()1 has one param, fn()2 has one params, fn()3 has two params and ImplFn()3 has two params.
// so to solve this we need to specify that one of our implementation fn()'s param is
// OPTIONAL, with a question mark.  arg2?: unknown. Now it can handle signatures with only one param
// or signatures with two params.

// Next in impl block, we'll take a look at the type of arg1, and given that,
// we'll decide which mechanism we want to use.
// Here before we refactored, we were concentrating on the typeof "object"
// (now is under "else if")
// if typeof arg1 is an argument we set the coord to what was passed in
// via arg1. But TS  wont be happy about this because arg1 is still of type
// Unknown. To fix this, will use a TS "AS" keyword which will promote it to a type.
// This is casting in typescript |ts cast|cast ts|
// Handling the number in the else condition -- again we define coord as a number
// to be return and again use the AS keyword to promote arg1 and arg2 to the  *number*
// type.
// We lastly in this video added yet another variant for for string.
// Then in implementation we add another typecheck for string
// we add another if statement, arg1 as string, and add a split on
// comma which will make an array  of two elements for x:12, y:22
// then we can forEach that array. forEach element  we need to split
// again on ":", we use key, value. This will give us X then 12, then y and 22.
// then coord[key], but ts  dont like...  we dont know what "key" is,
// because it is not defined in our type, so we will coerce key as  "x"
// OR "y"
function parseCoordinate(str: string): Coordinate;  // variant3
function parseCoordinate(obj: Coordinate): Coordinate;  // variant1
function parseCoordinate(x: number, y: number): Coordinate;  //variant2
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate { //implementation
    let coord: Coordinate = {
        x: 0,
        y: 0,
    };

    if  (typeof arg1 === "string") {
         (arg1 as string).split(',').forEach((str) => {
             const [key, value] = str.split(":");
             coord[key as "x" | "y"] = parseInt(value, 10);
         });
    } else if (typeof arg1 === "object") {
        coord = {
            ...(arg1 as Coordinate),
        };
    } else {
      coord = {
        x: arg1 as number,
        y: arg2 as number
      };
    }

    return coord;
}

// INV
// notice on hover has +1 overload or 1/2 meaning it has two diff signatures that you can choose from,
// as an object or as  an x and y.
// Exe : npx ts-node parseCoordinate.ts
console.log('-----------------------------------')
console.log('Overloaded Function demo. Can handle input variants for numbers, object or string');
console.log('\nNumbers Variant. input (10, 20).');
console.log(parseCoordinate(10, 20));  // numbers variant
console.log('\nObject Variant. input ({ x: 52, y: 35})');
console.log(parseCoordinate({ x: 52, y: 35}));  //object variant
console.log('\nString Variant. input ("x:12, y:22")');
console.log(parseCoordinate("x:12,y:22"));  //string variant
console.log('-----------------------------------')
// OUTPUT:
    // { x: 10, y: 20 }
    // { x: 52, y: 35 }
    // { x: 12, y: 22 }

// ROBUST! One function that can handle multiple input variants in typescript.
