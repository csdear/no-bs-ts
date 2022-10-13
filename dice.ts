
// DICE ROLLERS TS
// This is fun but couldn't  you pass a function in there??? That would be neat BLOG IDEA.
// Or maybe a Roller Object (like calculator in notes). Lots of great ideas here
// and of course should redo where it is rollD# and you pick your die type
// which only allowed  ts types of 4 | 6| 8 etc and as the second parameter,
// how many times you want to roll it.
// And can we kill the old skool for loop for something else?
// See also google query : // This is fun but couldn't  you pass a function in there??? BLOG IDEA.

// |TS NAME CONFLICTS SIDENOTE: Also I get name conflicts... are my functions and types global without having to import/export? Added underscores for now but im curious about  this...
// I assume only scoped to this file, but perhaps im wrong? Answer : cant use the same name as a function declared in another file, yet
// when you try to invoke a function that is outside of this file, eg : console.log(rollD6(2));
// you get typescript error. eg Cannot find name 'rollD6'

// SET1. Functions to roll a d4, d6, d8,d10, d12 and d20.
// At invocation, input number of times to roll the specific die
// and Returns a sum of the dice roll.
// eg roll a 1d8 two times = 13 (max opf 16)
// Drawbacks : Yikes! six different functions. Limited. Only accepts #of times to  roll.

console.log('===|BagOfDice|===');
// D4
function _rollD4( roll: number): number {
    let result = 0;
    for(let i = 0; i < roll; i++) {
        result += Math.floor((Math.random() * 3)) + 1;
    }
    return result;
}
// Roll 2d4 dice
console.log("Roll 2D4 : ", _rollD4(2));

//D6
function _rollD6( roll: number): number {
    let result = 0;
    for(let i = 0; i < roll; i++) {
        result += Math.floor((Math.random() * 5)) + 1;
    }
    return result;
}
// Roll 2d6 dice
console.log("Roll 2D6 : ", _rollD6(2));

//D8
function _rollD8( roll: number): number {
    let result = 0;
    for(let i = 0; i < roll; i++) {
        result += Math.floor((Math.random() * 7)) + 1;
    }
    return result;
}
// Roll 2d8 dice
console.log("Roll 2D8 : ", _rollD8(2));

// D10
function _rollD10( roll: number): number {
    let result = 0;
    for(let i = 0; i < roll; i++) {
        result += Math.floor((Math.random() * 9)) + 1;
    }
    return result;
}

// Roll 2d10 dice
console.log("Roll 2D10 : ", _rollD10(2));

// D12
function _rollD12( roll: number): number {
    let result = 0;
    for(let i = 0; i < roll; i++) {
        result += Math.floor((Math.random() * 11)) + 1;
    }
    return result;
}

// Roll 2d12 dice
console.log("Roll 2D12 : ", _rollD12(2));

// D20
function _rollD20( roll: number): number {
    let result = 0;
    for(let i = 0; i < roll; i++) {
        result += Math.floor((Math.random() * 19)) + 1;
    }
    return result;
}

// Roll 2d20 dice
console.log("Roll 2D20 : ", _rollD20(2));

//SET2 - Likely superior, normative case... this time, lets pass the dieType (d4, d6 etc) and the number of times to roll it
// into a more  generic 'Roller' function
// D20
function Roller( roll: number, dieType: 4 | 6 | 8 | 10 | 12 | 20): number {
    let result = 0;
    for(let i = 0; i < roll; i++) {
        result += Math.floor((Math.random() * dieType)) + 1;
    }
    return result;
}

// Roll 2d20 dice
// p1 : number of times to roll
// p2 : dietype
console.log('===|ROLLER|===');
console.log("Roll d4 x 1 :", Roller(1, 4)); // Roll 1d4 one time
console.log("Roll d4 x 5 :",Roller(5, 4)); // Roll 1d4 ten times, summing result.

console.log("Roll d6 x 1 :", Roller(1, 6)); // Roll 1d4 one time
console.log("Roll d6 x 5 :",Roller(5, 6)); // Roll 1d4 ten times, summing result.

console.log("Roll d20 x 1 :", Roller(1, 20)); // Roll 1d4 one time
console.log("Roll d20 x 5 :",Roller(5, 20)); // Roll 1d4 ten times, summing result.



// SET3 :
// IDK, getting silly rolling machine. Use a type *AllowedDieTypes* for cleanliness.
// rollingMachine based on caluculator (add, sub, mult) etc function.
// Acts as a wrapper... it calls function getRollResult  which does
// the meat of the work, but rollingMachine is versatile, allowing
// you to call alternative  method like "altResult" which do
// something special. Tagging as a |WRAPPER FUNCTION|

console.log('\n===|Rolling Machine|===');
type AllowedDieTypes = 4 | 6 | 8 | 10 | 12 | 20;


function getRollResult( roll: number, dieType: AllowedDieTypes): number {
    console.log(`Rolling a d${dieType} ${roll} times...`);
    let result = 0;
    for(let i = 0; i < roll; i++) {
        result += Math.floor((Math.random() * dieType)) + 1;
    }
    return result;
}

const rollingMachine = (() => {
    const result = (a:number, b:AllowedDieTypes) => getRollResult(a, b);
    const criticalResult = (a:number, b:AllowedDieTypes) => getRollResult(a, b) >= 7 ? 'CRIT!!! DMG x2 :' + getRollResult(a, b) * 2 : 'Normal Hit ' + getRollResult(a, b); // wacky, but if crit,  x2 damage. else normal hit result.
    return {
        result,
        criticalResult
    };
  })();

  console.log('...RollingMachine Result :',rollingMachine.result(2, 6));
  console.log('...RollingMachine criticalResult :',rollingMachine.criticalResult(2, 6));
