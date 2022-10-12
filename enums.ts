// Enums and Literal Types in Typescript

/**
|1.| First we are going to create many constants for LOADING STATES
const beforeLoad = "beforeLoad";
const loading = "loading";
const loaded = "loaded";
*/

//4A. We can instead create an enum "LoadingState". Remove the consts.Change the semicolons for commas
enum LoadingState {
    beforeLoad = "beforeLoad",
    loading = "loading",
    loaded = "loaded",
}
/**
4D. Sidenote, you could make simpler and remove the equal sign and string e.g., " beforeLoad = "beforeLoad"
    which would return asc values like 0, 1 , 2 - but JH and I agree this is fine b/c if you were gonna
    console log it later you gets something lke "beforeLoad" instead of "0", making it easier to debug.
*/

//2. create a isLoading Fn() that will  tell us if current state is loading. An IS function returning bool
//const isLoading = (state: string) => state === loading;
// 4B. ... then say state is a LoadingState enum type. Then compare state to LoadingState.loading
const isLoading = (state: LoadingState) => state === LoadingState.loading;

//3! invocation. eg dog. Would return false because "dog" is not equal to "loading"
// Meh, This  is not great, a  better way to model it is with an enumeration.
// console.log(isLoading("dog"));
//4C. invoke like to test if "loadinng". This would return false.
console.log("Is Loading?", isLoading(LoadingState.beforeLoad));

//5. Example use, a mappingg the enum state to Spanish value strings via a map.
// Great for translations, translating load states, error messages etc into other languages
// while keeping the base enumeration.
const spanishLoadingStates = {
    [LoadingState.beforeLoad]: "Antes de la carga", // how to define a key and new value
    [LoadingState.loading]: "Carga",
    [LoadingState.loaded]: "Cargado",
}
console.log("English and Spanish Loading States");
console.log("en:", LoadingState);
console.log("es:", spanishLoadingStates);
console.log("es loaded:", spanishLoadingStates.loaded); // Use dot notation to access single elements

//|7.| LITERAL TYPES | Numeric Literal Type:
// Can CONSTRAIN accepted input
// Note :floor/floored to prevent floating point
// What if we want to CONSTAIN that number? to say 1 , 2 , 3 dice.
// ie 1d6, 2d6, 3d6
// in that case we can use a NUMERIC LITERAL

// function rollD6( dice: number): number {
// 8A. Using a NUMERIC LITERAL to CONSTRAIN... value is literally either 1, 2 or 3
function rollD6( dice: 1 | 2 | 3): number {
    let pip = 0;
    for(let i = 0; i < dice; i++) {
        pip += Math.floor((Math.random() * 5)) + 1;
    }
    return pip;
}
// Roll 4d6 dice
// console.log(rollD6(4));
// 8B. Now notice invocation is upset -- Rolling 4D6 is NOT ALLOWED!
// console.log(rollD6(4));

// |9.| the STRING LITERAL TYPE
// variant on sendEvent we did in Overrides, generics with keyof lesson
// for starters... we'll call this BASE :
// function sendEvent(name: string, data: unknown): void {
// 10. Add override number one for checkout. P1 is  a string  literal
function sendEvent(name: "checkout", data: { cartCount: number}): void;
// 11. Add override number two for addToCart. p1 is a string literal
function sendEvent(name: "addToCart", data: { productId: number}): void;
function sendEvent(name: string, data: unknown): void {
    console.log(`${name}: ${JSON.stringify(data)}`)
}

//12. Invocation, You are  hinted that the only allowable value for the "addToCart" value is "productId". Good.
// by putting in p1 the correct string literal --  it retrieves the correct function signature, the  correct override variant.
sendEvent("addToCart", { productId: 1215444 });
