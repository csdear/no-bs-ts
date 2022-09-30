// ref no bs ts #5 challenge
// gist : https://gist.github.com/jherr/cd442b46070b39e99dd8bedc9eecff5c

/* DUNE
This function handles JSON input variance coming in regarding 'planets'
which can either be a string for a single planet  or an array of strings
if the dune house has prescence on multiple houses.
This is also an example of extending interfaces.  HouseWithId extends
from House and thus  gets inherited types.
*/

// You can convert the .json to .ts to make it better for us ts dudes.
// import houses from './houses.json';
import houses from './houses';
/* 1. define our House and HouseWithId interfaces, the same, cept for HouseWithID has an id as number.
 2. findHouses(). add a findHouses IMPLEMENTATION. Copy last variant as a  skeleton. update houses param with
 a  union type -- house: string | House[]. For the filter, add a question mark.
 3. Next, get the houses from the string if theres a string, or from the array.
    still in implementation, change param houses to  "input"
 4. Create a local -- const houses -- which type is array of houses -- House[]
    then look at the input with typeof to see if it is a string or not.
    If it is a string, JSON parse it, OR with the : ternary false side (right) we will just  take the input,
    which will be an array of houses.
  5. Next check to see if we have a filter or not.  if there is a filter -- filter? -- then we want to run
     .filter on houses -- houses.filter -- passing it the filter -- houses.filter(filter) OTHERWISE (: condtion)
     we just want to take all the houses. Then, map out, with the "house". then create the house with the id.
     id is needed first. set to zero id: 0, for the moment. Then spread everything else IN house -- ...house --
  6. better set the id, best to use index of the original array.  So we will set ID to the houses array INDEXOF,
     then id of this curren "house"
  7. Change HouseWithId to EXTENDS House...  and then we do not need planets or name, as they are inheritied.

 */
interface House {
    name: string;
    planets: string | string[];
    }

interface HouseWithID extends House {
    id: number;
}

    // Overloads
    // overload fn()1 : Takes  a string and returns a houseWithId.
    function findHouses(houses: string): HouseWithID[];

    // overload fn()2 : p1 houses takes a string, p2 filter takes a function (see also functions as parameters).
    // This lambda takes a singular house.  Ultimate return is of a houseWithId.
    function findHouses(houses: string, filter: (house: House) => boolean): HouseWithID[];

    // overload fn()3 - Takes a string[] array, and returns a housewithID
    function findHouses(houses: House[]): HouseWithID[];

    // overload fn()4 - Takes a string[] array for p1, a lambda filter fn() for p2.
    function findHouses(houses: House[], filter: (house: House) => boolean): HouseWithID[];

    //IMPLEMENTATION
    // p1 is the input. can  take a single string or string[] array.
    // p2 is optional filter. Typed as boolean lambda function.
    // return type is a houseWithID[].
    function findHouses(input: string | House[],filter?: (house: House) => boolean): HouseWithID[] {
            // We define a const here, 'houses' of *house*.  The input coming in, we put a ternary on..
            // condition typeof is a string. If true it will json parse to a JS object. If false
            // will do nothing, its  aready a JS object.
            const houses: House[] = typeof input === "string" ? JSON.parse(input) : input

            // Conditional return base on filter boolean being true or false.  If
            //  true, the filter function is ran, then mapped, an id added and a house object
            // return.  If false, no filtering, just returns houses, map over houses and add an
            // id to a newly returned house object.
            return (filter ? houses.filter(filter) : houses)
                .map((house) => ({
                    id: houses.indexOf(house),
                    ...house
                }))
        };

    // RUN IT :  npx ts-node indexDune.ts
    // INV1
    // We pass in a JSON string of houses, and we pass a filteringg function, where we want to return a specific name -- Atreides.
    console.log(findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides"));
    // Output :
    // [ { id: 0, name: 'Atreides', planets: 'Calladan' } ]

    // INV2
    // This invocation  varant, we just pass in houses, non-JSON-strified. We also pass in a filter
    console.log(findHouses(houses, ({ name }) => name === "Harkonnen"));
    // Output :
    // [ { id: 2, name: 'Harkonnen', planets: [ 'Giedi Prime', 'Arrakis' ] } ]
