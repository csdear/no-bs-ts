/*
Generics with keyof.
 Pluck function allows us to pull from a list/array of objects
 data by key and return an array. Such as an array of all the dog's ages or names.
 a very good typescript alternative to a basic es6 map().
 Inputs : p1: the data array to be plucked over
         p2: the key you are focusing on.
Returns: an array keyed off the key you entered for p2!
 Pluck. Pluck takes a list of items of unknown
 and it grabs whatever the given key is from all those items.
 it expects an array of objects, they all have the same keys,
 but you are expected one key inn particular
 and you want that returned as an array.
 you neeed a key that is going to be a string and its going
 to return that key...

 first we change the unknown[]s to something, so we create data type
 pass it as a <generic> . we use DataType.
 we also replace string with generic type (T) called KeyType
 and also add KeyType to the <> genrics
 (-) function pluck(items: unknown[], key: string): unknown[] {
 we say the KeyType EXTENDS a keyof data type
 keytype has to be one of the keys within DataType
 update return type to be ):DataType[].. data type dereferenced by key type
 in the body we are just gonna return a map .. taking the items, then mapping them.
 we take its key (item => item[key]),
*/

function pluck<DataType, KeyType extends keyof DataType>(
    items: DataType[],
    key: KeyType
    ): DataType[KeyType][] {
        return items.map(item => item[key])
}

//lets make some dogs...

const dogs = [
    { name: "Roscoe", age: 12 },
    { name: "Augie", age: 13}
]
/*
IDE neato here on invocation after the comma
 pluck(items: { name: string; age: number; }[], key: "name" | "age"): (string | number)[]
 IDE neat when you enter quotation marks "" past the comma...
 ... it hints you that your two options are name or age.
*/
console.log(pluck(dogs, "age"));
console.log(pluck(dogs, "name"));
/*
.EXE : npx ts-node generics-with-keyof.ts
 < [ 12, 13 ]
 < [ 'Roscoe', 'Augie' ]
*/