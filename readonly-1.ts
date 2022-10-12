
// |1.| Create Cat interface
interface Cat {
    name: string;
    // 5. One solution is to add readyonly to the field
    // readonly name: string;
    breed: string;
}

/* 6A. Second solution is to Use read only utility type to make whole type readonly
CMDK,CMD+I shows readonly prepended to both  fields.
*/
// type ReadonlyCat = Readonly<Cat>;

// 2. Create cat fn() that returns a object.
// function makeCat(name: string, breed: string): Cat {
// 6B. ... then pass ReadonlyCat as the return type
//function makeCat(name: string, breed: string): ReadonlyCat {
// 7. We don't even really need "type ReadonlyCat"... we can just set return type to "Readonly<Cat>" to write less code
function makeCat(name: string, breed: string): Readonly<Cat> {
    return {
        name,
        breed,
    }
}

// 3. create an instance... sherlock the tabby.
const sherlock = makeCat("Sherlock", "Tabby");
// 4. Not good! Not an immutable cat anymore! We do not want to be able to modify  the name
// sherlock.name = "Puck";
// 6C. ... notice now that trying to set  name is not allowed
sherlock.name = "Puck";

// |8.| Readonly & Immutability via Tuples. Create a makeCoordinate function that returns a tuple.
function makeCoordinate(
    x: number,
    y: number,
    z: number,
// ): [number, number, number] {
//11A. Simply mark the tuple as readonly to disalow overwrite.
): readonly[number, number, number] {
    return [x, y, z];
}
//9. create instance passing coord values 10, 20, 30
const c1 = makeCoordinate(10, 20, 30);
//10! problem area.  We could overwrite one of the coords
// c1[0] = 50;
// 11B. Overwrite  not allowed now.
c1[0] = 50;

//|12.| Really constant arrays. TS fixes the issue with const we have in JS
// const reallyConst = [1, 2, 3];
// 14A. We  can use "as const" to make readonly/immutable. This denotes the values within are all const
const reallyConst = [1, 2, 3] as const;
//13! But is it REALLY const? If we do this, we can overwrite the value with 50.
// reallyConst[0] = 50;

//14B. Now this is operation is  not allowed!
reallyConst[0] = 50;


