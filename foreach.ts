// re-implement forEach, map and filter using reduce, and to do it in a type safe manner using Typescript.
// from NO BS TS Challenge 2 : https://www.youtube.com/watch?v=DxG17pbgsZg&list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n&index=9
/*
Generic funnction so we use a generic type <t>
Take in an array of items, a generic array (T[])
And a callback, is  going to take an item ((v:)) and return void
And the whole function will return void.
At invocation below, you pass the array as p1, and lambda fn() as p2.
*/

function myForEach<T>(items: T[], forEachFunc: (v: T) => void): void {
    // accumulator as p1, a value as p2
    // within this call the forEachFunc with the value 'v'
    // return undefined and start with undefined
    items.reduce((a, v) => {
        // console.log(v);
        forEachFunc(v);
        return undefined;
    }, undefined);
}

//|INVOCATIONS|
myForEach(['a', 'b', 'c'], (v) => console.log(`foreach ${v}`)); // strings OK
myForEach([1 , 2, 3], (v) => console.log(`foreach ${v}`));  // numbers OK
myForEach([1 , 2, 3], (v) => console.log(v * 5)); // inline expression OK

//When expanding lambda function to multi-line use braces {}
const arraySparse = [1, 3, /* empty */, 7];
let numCallbackRuns = 0;
myForEach(arraySparse, (v) => {
    console.log(v);
    numCallbackRuns++;
}
);
console.log('numCallbackRuns', numCallbackRuns);

// Foreach Push to a new array example.
const arrayNums = [1, 2, 3, 4, 5]
let arrayEmpty: number[] = [];
const multiplyByTensReturnResult = myForEach(arrayNums, (v) => {
    let result = 10 * v;
    arrayEmpty.push(result);
}
);
console.log('multiply by  10 and return result', arrayEmpty);

// foreach over an array of objects.
 interface Monster {
     name: string;
     hp: number;
 }

// the array  list of objects
const monsters: Monster[] = [
    {
        name: "Gnoll",
        hp: 20,
    },
    {
        name: "Ork",
        hp: 15,
    },
    {
        name: "Goblin",
        hp: 5,
    },
]

myForEach(monsters, (v) => console.log(`${v.name}, ${v.hp}`)); // inline expression OK

// multline OK
myForEach(monsters, (v) => {
    if (v.hp > 5) {
        console.log(`${v.name} is a formidable foe.`)
    }
});

// Update a property of one of  the objects in the  array of objects.
// Buff the little guy. Foreach to update one of the property values --  If  hp is 5 or below, multiply its hp by 20.
myForEach(monsters, (v) => {
    if(v.hp <= 5) {
        v.hp = v.hp * 20;
        console.log(v.hp);
    }
});

console.log(monsters);

// MINIMALLY w/o reduce, non-generics
let fruitsArr2: string[] = ["Apple","Banana", "Mango"]
fruitsArr2.forEach(fruit => console.log("I am eating", fruit));
