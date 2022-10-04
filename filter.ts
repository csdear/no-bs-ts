/*
TS FILTER
Type Safe FILTER-like using reduce
Utilizing a generic type <T>
Return an array of those generic types
*/

/*
line-by-line :
    function myFilter<T> //Utilizing a generic type <T>
    ((items:  T[], // Our first input being an array of those types
    filterFunc: (v: T) => boolean) // our second param the filter  fn(), or "predicate" if you prefer. Returns a boolean to say whether we are in or out
    : T[] // Return an array of those generic types
    {
        return items.reduce((a: T[], v) // rtn items and reduce. a is accumulator as T[]
        => filterFunc(v)// and run our filterFunction and run it on each of those v's.
        ? //We get back true or false.
        [...a, v] //In true case,  we  take the existing array  and add on the current value
        : a, [])// otherwise return the existing array.
    }*/

function myFilter<T>(items: T[], filterFunc: (v: T) => boolean): T[] {
   return items.reduce((a: T[], v) => (filterFunc(v) ? [...a, v] : a), []);
}

// INV
// only even numbers - the filtering criteria is expressed in the invocation e.g, v modulus 2 === 0 if true is an even number.
console.log(myFilter([1, 2, 3, 4, 5, 6, 7, 8], (v) => v % 2 === 0));

// Starts with F filter, direct output
const cars: string[] = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];
console.log(myFilter(cars, (v) => v.startsWith('F')))

// Starts with  b filter, store filtered results in a  new variable 'bOnly' and console log it out.
const fruits = ["apple", "banana", "cantaloupe", "blueberries", "grapefruit"];
const bOnly: string[] = myFilter(fruits, (v) => v.startsWith('b'));



const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
// old way : const result = words.filter(word => word.length > 6);
const result: string[] = myFilter(words, (v) => v.length > 6);
console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]


console.log(bOnly);
