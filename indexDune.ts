// ref no bs ts #5 challenge
// gist : https://gist.github.com/jherr/cd442b46070b39e99dd8bedc9eecff5c

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

 */
interface House {
    name: string;
    planets: string | string[];
    }

    interface HouseWithID {
        id: number;
        name: string;
        planets: string | string[];
    }

    // Overloads
    function findHouses(houses: string): HouseWithID[];
    function findHouses(
    houses: string,
    filter: (house: House) => boolean
    ): HouseWithID[];
    function findHouses(houses: House[]): HouseWithID[];
    function findHouses(
    houses: House[],
    filter: (house: House) => boolean
    ): HouseWithID[];

    //IMPLEMENTATION
    function findHouses(
        input: string | House[],
        filter?: (house: House) => boolean
        ): HouseWithID[] {
            const houses: House[] = typeof input === "string" ? JSON.parse(input) : input

            return (filter ? houses.filter(filter) : houses)
                .map((house) => ({
                    id: houses.indexOf(house),
                    ...house
                }))
        };

    console.log(
      findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides")
    );

    console.log(findHouses(houses, ({ name }) => name === "Harkonnen"));