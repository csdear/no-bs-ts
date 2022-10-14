// ts mapped types



// |I. Types with Flexible Fields |

/*[1.] Start with creating a flexible interface for a dog.
A flexible dog Info object with one required field and potentially a flexible set of fields.

Flexible in Code IRL: I could see using this for TS and CSS  -- where maybe you have certain values
that are required like flex-direction and others that might not be required but still used,
like allowing flex-grow or flex-shrink.

Name is the only required field.
We want to be  "Open" to additional fields. You can put  anything as long as it is a string so we
MERGE a Record, with the ampersand. Key is a string, value is a string
*/

type MyFlexibleDog = {
    name: string;
// 3. Yet we can do this without "& Record<,>" syntax"
// } & Record<string, string>;
// 4A. Instead we say for any key of type string, we want a string
//    [key: string]: string;
// 5. Could add a union operator if wanted to allow  number too
    [key: string]: string | number;
}

// 2. Create in instance of myFlexDog - dog.  Only name required.. then we can add whatever we want.
// 4B. Breed is allowed with the new syntax. h/e, we would get an error on number type field, like "age: 33;"
const dog: MyFlexibleDog = {
    name: "Roscoe", //Req.
    breed: "Labrador", // Flex.
    age: 33, // Flex.
}

// |MAPPED TYPES AND TEMPLATE LITERALS|
//5. DogInfo interface
interface DogInfo {
    name: string;
    age: number;
}

//6. OptionsFlags frag. Source : TS documentation
//8. The type here can be changed from boolean. eg null, string, number, etc.
type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
};

//7. Another type -- DogInfoOptions. Options is the operative word here.
//  as it ties our first interface with OptionsFlags type.
// Our type we create is the  OptionsFlags type, passing in the interface as a type.
// CMDK/CMD+I : Notice hints name and age now as BOOLEAN, whereas initially these were
// declared as string and number initially.
// its taken the originn DogInfo, taken the keys of that, and REMAPPED THOSE KEYS TO BOOLEANS
//  Which may be cool for a optional saving system or something -- Jack
// <> Means now we can set the type of something as DogInfo, string and number for name and age
// OR use DogInfoOptions, which only accepts a boolean for name and age.
type DogInfoOptions = OptionsFlags<DogInfo> ;

//9. Practical example of using this mapped  typed
// params, an object and a set of listeners.

// Listeners are 1 per key -- eg for DogInfo we would have
// one listener for name, one listener for age, and those
// listeners are called  if the values of those  fields change.

//  obj we only know will be  a generic type, so for the
// obj we type annotate with 'T' and append '<T>' to the  fn() name.
//13. Back up here, how to we type listeners? We need that Mapped Typed System which we need to create a new type for.
// we will copy the body from OptionsFlags above : [Property in keyof Type]: boolean;
// Instead of returning boolean etc like prior, we instead return void, inputting a inline lambda function.
/* 16. @15, we need to right  type, so updating the params of this inline  function, giving it the type for that
   property : (newValue: Type[Property]) => void;
   Now, if we hover over type DogInfoListeners below, we see the type has updated to :
        =====================================
        type DogInfoListeners = {
            name: (newValue: string) => void;
            age: (newValue: number) => void;
        }
        =====================================
    BUT, Problem is we have the tyeps as "name:"" and "age:"", whereas we WANT "onNameChange:" and "onAgeChange:"
    YES, WE CAN DO THIS VIA |TEMPLATE LITERALS|
*/
/*18. Adding the Template literal
We use `as` and work like we were making a template literal with string interpolation.
We pass in the property name : Type as `on${Property}Change` ]
Now, when we hover or CMD+K/CMD+I type DogInfoListeners below we see that our template literal is  applied
for the property name :
        =============================================
        type DogInfoListeners = {
            onnameChange: (newValue: string) => void;
            onageChange: (newValue: number) => void;
        }
        ==============================================
 19. We add the Capitalized ts utility function.
 to get around "Type Property does not satisfy the constraint string."
 we can add string and satisfy it.
 Thus on CmdK,CmdI hover over DogInfoListeners we see  the proper
 property names name :
        onNameChange
        onAgeChange
20. IF we wanted them optional we could simply add ? so now
specifying those listeners are optional. (onNameChange? onAgeChange?)
21. What if we wanted additional listeners? Simply copy Listeners body
then use a '&' Merge operator. And when you cmd K cmd I or hover over
DogINfoListeners type, we see those new types :
            type DogInfoListeners = {
                onNameChange?: ((newValue: string) => void) | undefined;
                onAgeChange?: ((newValue: number) => void) | undefined;
            } & {
                onNameDelete?: (() => void) | undefined;
                onAgeDelete?: (() => void) | undefined;
            }
    ...
*/
type Listeners<Type> = {
    [Property in keyof Type as `on${Capitalize<string & Property>}Change`]?: (newValue: Type[Property]) => void;
} & {
    [Property in keyof Type as `on${Capitalize<string & Property>}Delete`]?: () => void;
}
//14. Then we can lype listeners with type Listeners<T>
function listenToObject<T>(obj: T, listeners: Listeners<T>): void {
    throw "Needs to be implemented";
}

//10. Try function out
// We create a object of type DogInfo named 'roscoe', which has a name and age  property, string/number
const roscoe: DogInfo = {
    name: "Roscoe",
    age: 8
}

/*11. Invoke our listener function, passing in our object -- roscoe --
 Then for p2, we define our listeners, by name.
 These are named, inline lambda functions that listen for changes on the properties--
 changes on properties name or age.
 15. H/e, onNameChange is upset, that onNameChange is  not of type is not a type of Listeners<DogInfo>
 aka   "Argument of type '{ onNameChange: (v: string) => void; onAgeChange: (v: number) => void; }' is not assignable to parameter of type 'Listeners<DogInfo>'."
 so how do we determine what type IS THE LATTER (type Listeners<DogInfo>) when we  get an error "Argument of type is not assignable to parameter of type" ??
 What we  can  do is create another type. Create a new type name and for assignment, set it to that latter "parameter of  type..." value -- Listeners<DogInfo>
 Next, HOVER or CMD+k,CMD+I over the new top. Here we see :
        =========================
        type DogInfoListeners = {
            name: () => void;
            age: () => void;
        }
        =========================
 Aha! We see that their types are void inline lambdas -- () => void
 How are we going to  act on that to fix the problem?? The problem is in type Listeners, so roll up to the type Listerers @16.
*/
type DogInfoListeners = Listeners<DogInfo>

/*
21... then add those new listeners
22. Last thing, review this : https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
*/
listenToObject(roscoe, {
    onNameChange: (v: string) => {},
    onAgeChange: (v: number) => {},
    onNameDelete: () => {}, // a void
    onAgeDelete: () => {}, // a void
})
