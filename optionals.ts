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

function addWithCallback(x: number, y: number, callback?: () => void) {
    console.log([x,y]);
    callback?.();
}


// |OPTIONAL CALLBACKS|
// 3 params : number, number, function
// lets do something with x and y... console.log([x,y])
// THenn invoke the callback to save ive dunnit.
// BUT, what happens if the callback is OPTIONAL?
// AT invocation, only x and y are passed.. no function?
// first we optionalize it : callback?: () => void
// second we need to do something with it in the body if a cb fn() was passed and if it wasnt.
// We could old skool, wrap it in a  conditional like :
        // console.log([x,y]);
        //     if (callback) {
        //         callback();
        //     }
// Sure, even easier is : callback?.();
// Which will only invoke that fn() if that option exists.



