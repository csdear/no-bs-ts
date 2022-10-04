/*
TS MAP
The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
Type safe map, emulating map() by using reduce.
*/

/* line-by-line
function myMap<T, K>(items: T[], mapFunc: (v: T) => K): K[] {  //Output K, a new array of k. I fn() takes a generic type as input 'T', say a number. And returns a string "K"
    return items.reduce((a, v) => [...a, mapFunc(v)], // mapFunc applied to incoming value (...a). mapFunc works on the incoming value 'v'
     [] as K[]); // ts doesnt know what '[]' is, so we define it as an array of k[]
}
*/

function myMap<T, K>(items: T[], mapFunc: (v: T) => K): K[] {
    return items.reduce((a, v) => [...a, mapFunc(v)], [] as K[]);
}

// multiply it by ten then turn it into  a string
console.log(myMap([1, 2, 3, 4, 5, 6, 7, 8], (v) => (v * 10).toString()));
// Expected Output : npx ts-nnode map.ts
/*
    [
    '10', '20', '30',
    '40', '50', '60',
    '70', '80'
    ]
*/

// map() a array of objects.. eg from array experience_types we only want the
// experience id -- value -- we use map and put it in a new array.
interface Experience_type {
    value: number;
    name: string;
}

let experience_types: Experience_type[] = [
    {
        "value": 4,
        "name": "Arts & Culture"
    },
    {
        "value": 6,
        "name": "Music"
    },
    {
        "value": 2,
        "name": "Beaches"
    },
    {
        "value": 8,
        "name": "Outdoors"
    }
];

// say we just want the values... the experience type IDs
// old way : let experiences_ids = experience_types.map(x => x.value);
let experience_ids: number[] = myMap(experience_types, (v) => v.value);
console.log(experience_ids)


let fruitsArr: string[] = ["Apple","Banana", "Mango"];
console.log(fruitsArr.filter(fruit => fruit === "Apple"));
