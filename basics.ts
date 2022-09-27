
// npx ts-node basics.ts
// Weldon Wainwright Aloysius Germaine Wycislo
// [ 'Weldon', 'Wainwright', 'Aloysius', 'Germaine', 'Wycislo' ]

// ts type string
let userName: string = "Weldon";
// ts type boolean
let hasLoggedIn: boolean = true;

userName += " Wainwright Aloysius Germaine Wycislo";
console.log(userName);

// ts type number
let myNumber: number = 10;

// ts type RegExp (Regular Expression)
// hover for type hint: CMD K, CMD I
let myRegex: RegExp = /foo/;

// ts type array
// make userName an array
// CMD K, CMD I reveals string[]
const names: string[] = userName.split(" ");
console.log(names);
//ts type array generic type
// ts test try putting in a string "asdf" -- you get error
    // const myValues: Array<number> = [1,2,3, "asdf"];
const myValues: Array<number> = [1, 2, 3,];

// what if I have a api that provides an array with numbers and a string?
// You can, a tuple could be used, covered later.

// ts type objects
// again, use CMD K, CMD I
const myPerson: {
    first: string;
    last: string;
    } = {
    first: "Benson",
    last: "Hedges"
}

/* ts interfaces
Though that type definition above doesnt look like we want to have to
copy and paste if  everywhere.
Better to  define it once and when you make changes to it, it  will be
changed everywhere... what to use...
INTERFACES!
*/

interface Person {
    first: string;
    last: string;
    }

const myPerson2: Person = {
    first: "Benson",
    last: "Hedges"
}

// ts maps and Record utility type
// With Record can define the keytype and the value type -- number and string
const ids: Record<number, string> = {
    10: "a",
    20: "b"
}
ids[30] = "c";  // Note this was not allowed by TS until we added Record<> utility type

//ts has no problems with  these constructs...
//for loop
for (let i = 0; i < 10; i++) {
    console.log(i);
}
//foreach
[1,2,3].forEach((v) => console.log(v));
//map
const out = [4, 5, 6].map((v) => v * 10);