/*
TS Utility TYPES
    - Optionals & Overrides (method(I)) - CO
    - Partial (method(II)) - LIVE - makes all fields optional.
    - Required : The inverse of ^, fields are required
    - Pick : Allows you to pick the fields you want
    - Record (method(III))  - CO
    - OMIT (method(IV)) - live : Omits a field
    - Types from Fields : Every time the type changes the  Record will change along with it
TS UTILITY TYPES are a built in TS mechanism for Generics.
To essentially create  a new type from an existing type.
Why create  new interfaces/types, copying and pasting
when you can use partial, Required, Pick to basically
modify a type/interface on the fly INSTEAD of defining
a new type.

=============================
|OPTIONALS&OVERRIDES|PARTIAL|
=============================
*/
/**
 * type one representing a user. name, id and  email optional.
 */
interface MyUser {
    name: string;
    id: number;
    email?: string;
    // phone?: string;
}

/**
 * method(I) : An Optional Interface for Overrides.
 * Drawback : Can do optional overrides, but later if you
 * needed to add a new field such as phone, you would have to
 * update both MyUser and MyUserOptionals, violating DRY
 * principles. Method(II) Partial solves this issue.
... the OPTIONAL defined for merge()'s param overrides sake.
In this case we make all fields - name, id, email- optional.
Basically MyUser but evertything made optional.

interface MyUserOptionals {
    name?: string;
    id?: number;
    email?: string;
}
*/

// method(II) : use Partial
// Partial takes a type, then makes everything in it OPTIONAL.
// The optionalizer, jah!
type MyUserOptionals = Partial<MyUser>;

/**
 *
 * merge fn().  Takes a user. Returns  a user
 *  important is we are adding OVERRIDES here that will allow
 *  us to OVERRIDE our base MyUser. Above, a second interface is defined
 *  'MyUserOptionals'...
 *  Special RETURN.  It returns a  user (...user)
 *  but also a override (...overrides) since AFTER and therefore
 *  OVERRIDES any of the same  keys/fields
 * @param user
 * @param overrides
 * @returns user
 */
const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
    return {
        ...user,
        ...overrides,
    };
};

/**
--> INVOCATION.
merge() invoked, notice we pass two objects.
The second option  is an override for email.
thus the email with 'BAZ' will come through
like : { name: 'Jack', id: 2, email: 'dontemailbaz@dontemail.com' }
*/

console.log(
    merge(
        {
            name: "Jack",
            id: 2, // prior was 'id: "2",'
            email: "dontemail@dontemail.com",
            // phone: "2054564545",
        },
        {
            email: "dontemailbaz@dontemail.com",
        }
    )
);

/*
=============================
     |REQUIRED|PICK|RECORD|OMIT
=============================

*/

// |REQUIRED|
// Define type and use Required utility type, passing MyUser as type.
// HIT CMD-K,CMD-I : NOTICE THAT EMAIL IS NO LONGER OPTIONAL!
// Required is essentially the inverse of Partial.
type RequiredMyUser = Required<MyUser>;

//|PICK|
// Takes type and a list of keys, to pick the files you want.
// i.e., a user with just email and name.
// CMD-K, CMD-I we see just  email optional and  name.
type JustEmailAndName = Pick<MyUser, "email" | "name">;

//|RECORD|method(III)
// ~map,
/**
 * method(III)
 * mapById function, special Record utility type that takes type params an id,
 * in our case string, and MyUser type. We use reduce on the users array,
 * and start off with an empty object for testing. Empty object comes in as
 * accumulator 'a' and 'v' is the record. In this reduce arrow fn() we want to
 * return a  new obj, all the existing conntents of a (...a,) then '[v.id]' as
 * the  KEY, pointing its type at v, ([v.id] v,)
 * @param users :  a list of user, type an array of users - MyUser[]
 * @returns a Record, takes two params.
 *              @param : an Id type. in this case our id, is a type of string.
 *              @param MyUser type.
 */

// DEF
// const mapById = (users: MyUser[]): Record<string, MyUser> => {
//     return users.reduce((a, v) => {
//         return {
//             ...a,
//             [v.id]: v,
//         };
//     }, {});
// };

/**
 * INVocation, method(III). Using string ids, foo and baz.
 */
// console.log(
//     mapById([
//         {
//             id: "foo",
//             name: "Mr. Foo",
//         },
//         {
//             id: "baz",
//             name: "Mrs. Baz",
//         },
//     ])
// );

/**
 * OUTput method(III)
 * An AoA, now with foo and baz as  the keys.
 * {
    foo: { id: 'foo', name: 'Mr. Foo' },
    baz: { id: 'baz', name: 'Mrs. Baz' }
    }
 */

/*
Summary, method(III)

@SFL Sausage making map by ID, value AS ID.
An array of objects (AoA) with Key|'value' format TO
an AoA with Key|{key|'value'}
id: "foo" -->  foo: {id : 'foo'} ????????
*/

// |OMIT|method(IV)
/** What if, riffing  of  method(III)'s output. We see a drawback --
 * what  if we instead want just the data -- we dont want the "id: 'foo'" in there
 * because we already have the  id on there like "foo:". Redundant.
 * You can use the OMIT utility function  to do this.
 * For the second param of Record<>, we use an Omit<>. p1 of Omit<> is the
 * type -- MyUser. p2 is the field  to omit -- "id"
 * Also add a const after the second return...we  want to remove id from v.
 * v is the current  record, being iterated upon. This const is a destructure
 * where we take out id and then eveything else as '...other'
 * Then modify '[v.id]: v,' to just [id]: other,
 *  Note another  good sausage making example.
 *  Later We can all create a type omission and pass that  instead.
 *  I created a type UserWithoutID, commented out the prior sig, then I pass
 *  UserWithoutId as the 2nd Record param.
 *  Also, we aren't wild about 'Record<string,'
 *  We know id here is string, but what if later id is a number?
 *  We changed  MyUser id to number, and in the data we update the string ids
 * to numeric IDS
 *  Then in the sig, We can do TYPES FROM FIELDS --
 *      Record<MyUser["id"],
 *  Which means every time the type changes the  Record will change along with it.
 *
 * */

type UserWithoutID = Omit<MyUser, "id">;

//DEF
// const mapById = (users: MyUser[]): Record<string, Omit<MyUser, "id">> => {
const mapById = (users: MyUser[]): Record<MyUser["id"], UserWithoutID> => {
    return users.reduce((a, v) => {
        const { id, ...other } = v;
        return {
            ...a,
            [id]: other,
        };
    }, {});
};

// INV
console.log(
    mapById([
        {
            id: 1, //prior:  id: "foo",
            name: "Mr. Foo",
        },
        {
            id: 2, //prior: id: "baz",
            name: "Mrs. Baz",
        },
    ])
);

// OUT and SUMM method(III)
// We successfully via OMIT removed the redundant ID.
// { foo: { name: 'Mr. Foo' }, baz: { name: 'Mrs. Baz' } }

/* OUTPUT method(IV)
> npx ts-node utility-types-1.ts
<<<
{ name: 'Jack', id: 2, email: 'dontemailbaz@dontemail.com' }
{ '1': { name: 'Mr. Foo' }, '2': { name: 'Mrs. Baz' } }
<<<
*/
