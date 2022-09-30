// optionals
// |OPTIONAL PARAMETERS|
function printIngredient(quantity: string, ingrediant: string, instructions?: string) {
    console.log(`${quantity} ${ingrediant} ${instructions ? `${instructions}` : ""}`);
}


printIngredient("1C", "Flour");
printIngredient("1C", "Flour", "Lightly Sift");

interface User {
    id: string,
    info?: {
        email?: string;
    }
}

function getEmail(user: User): string {
    if (user.info) {
        return user.info.email!;
    }
    return "";
}

function getEmailEasy(user: User): string {
    return user?.info?.email ?? "";
}

// |OPTIONAL FIELDS|
// We create a User interface with string ID, and a Info object  that is optional -- can be null
// and the email within is optional, can be null.
// in the body of getEmail(), we check if the user has info, but notice our  return for the
// true condition is in the RED -- (property)
// email?: string | undefined
// Type 'string | undefined' is not assignable to type 'string'.
// Type 'undefined' is not assignable to type 'string'
// To  get  around this error, if you know better than  typescript you can add a bang :
        // return user.info!.email!;
// Not good form though.. if you have alot of bangs in your code or css, you're probably
/// doing something wrong.
// To get around this better,
//  Use optional chaining and nullish coalescing
// Reads like if user exists, drill into info,if info exits drill to email, if email is null, then return an empty string ""
// otherwise we are returning an email
// You also are more succinct removing that if check and can get rid of the double return.




