/* tuples

- Tuples are arrays and each element in array can be named and have  different types.

*/
type ThreeDCoordinate = [x: number, y:number, z:number]; // tuple as  a type.

// Adds two 3D points together. You  could say p1 is the origin point (000) and p2 is  what to add to that.
// |addition array|add points|add dimensions|
function add3DCoordinate(c1: ThreeDCoordinate, c2: ThreeDCoordinate): ThreeDCoordinate {
    return [
        c1[0] + c2[0],
        c1[1] + c2[1],
        c1[2] + c2[2],
    ]
}

console.log(add3DCoordinate([0, 100, 0], [10, 20, 30]));

/**
React engineers deal with tuples all the time -- the useState
is a tuple. useState returns a state, and a state settder

We'll implement our own simpleStringState that  does something similar.
It takes a 'initial' value *string* and is going to return a tuple.
tuple will have first an accesssor(or getter if you like), a function taht returns a string : () => string
then a setter, which will take a string and return void -- (v: string) => void
Basically two functions within the tuple, a getter and a setter.
Next create a variable for our state and we  will give it the 'initial' value coming in.
Then Return an Array, gonna have functions in it -- the first one returns the string, and the second
element of the array takes a  string then sets the string state value (str) to  that incoming string.
This is  a CLOSURE.  We capture the initial state  of the string, trapped in there... basically a piece
of stored state.
*/

//DEF
function simpleStringState(initial: string): [() => string, (x: string) => void] {
    let str: string = initial;
    return [
        () => str,
        (x: string) => {
            str = x;
        }
    ]
}

//Invocation
/* the getter, the setter and we give it the initial value
    we console the output of  str1getter
    then use str2setter to set it.
    Output is :
     getter: hello
     setter: goodbye
Ok. Now to prove this is a UNIQUE piece of state
*/
const [str1getter, str1setter] = simpleStringState("hello");
const [str2getter, str2setter] = simpleStringState("AMFM");
console.log('getter1 init:', str1getter());
console.log('getter2 init:', str2getter());
str1setter("goodbye");
console.log('setter invoked..');
console.log('setter has updated state value of which was store in str1getter(). \n str1getter() is now :', str1getter());
console.log('getter2 now. No setting has occured:', str2getter());
