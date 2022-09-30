// optionals
// |OPTIONAL PARAMETERS|
function printIngredient(quantity: string, ingrediant: string, instructions?: string) {
    console.log(`${quantity} ${ingrediant} ${instructions ? `${instructions}` : ""}`);
}


printIngredient("1C", "Flour");
// Suppose we were working on the app and were like
// dammit, we need to include instructions but we dont have a param for that...
printIngredient("1C", "Flour", "Lightly Sift");
// What do we do? We go up to the function signature and add a instructons param.
// That makes our 3 param printIngrediant() happy, but now our  first 2  param
// invocation is in the red. "Expected 3 arguments, but got 2"
// To  fix, we add a question mark to instructions -- instructions?: string
// Note after you  declare an optional, you CANNOT add a required. Like this
// would bomb :  instructions?: string, requiredNuParam: string) {
// You'd have to put the required before the optional and repair your invocations
// or you  could also make  it optional on the tailend.
// In  the function DEF body we need to do something with instructions, but it
// has to work  for both function invocation variants
// Easiest way to handle is a little ternary op -- ${instructions ? `${instructions}` : ""}`)
// so if  there are instructions, print them. If not, do nothin, ""


