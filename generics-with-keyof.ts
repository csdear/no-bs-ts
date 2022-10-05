/*
Generics with keyof.
|PLUCK| example1
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


/* |EVENTMAP| Example 2 |EVENT MAP||SQUELER|
----------------------------------------------------------------------------
|TS EVENT REPORTING|
This is a great fn() that can be used for sending events perhaps for analytics
or telemetry purposes. Here  we  define multiple events like 'addToCart' and
'checkout', then later we invoke each, in a type safe way.
Interface Event,  will have a time and a user.
Phenomenal in its type safety. Tt has to be an event that i've listed in
my EventMap  (addToCart or checkout)
AND the data going into that event has to match
the api that i'm putting here in here (eg BaseEvent & { quantity: number; productID: string;})

*/
interface BaseEvent {
    time: number;
    user: string;
}

/*
Then define a Event map that defines each event,like a addToCart event or checkout event.
quantity is an element of an item when added to the cart.
Whats with the ampersand & ? it basically means your taking the TYPE on the left and
ADDING it to the type on  the RIGHT.. so collectively BaseEvent, Quality and  productID.
*/
interface EventMap {
    addToCart: BaseEvent & { quantity: number; productID: string;}
    checkout: BaseEvent
}

// Send event function that sends some  sort of event data.
// name  needs to be a key of
// Name will be the generice keyof type, and we will type name as Name (instead of : string)
// What will data be? ( instead  of : unknown). EventMap and whatever the name is.
function sendEvent<Name extends keyof EventMap>(name: Name, data: EventMap[Name]): void {
    // Your business logic to handle the event here...
    console.log([name, data])
}

// Invoke send event
// IDE neato, once we  add "" to the params we get option for 'addToCart' or 'checkout'
// p2, neato we add "{}" and we have choices productId, quantity, time or user-- all that which
// is allowed for addToCart event.
sendEvent("addToCart", {productID: "Hampshire", user: "farmerDear@gmail.com", quantity: 3, time: 10});
sendEvent("checkout", {time: 20, user: "farmerDear@gmail.com"});

/* Output

[
     'addToCart',
     {
       productID: 'Hampshire',
       user: 'farmerDear@gmail.com',
       quantity: 3,
       time: 10
     }
   ]
   [ 'checkout', { time: 20, user: 'farmerDear@gmail.com' } ]
*/

