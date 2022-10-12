
// DICE ROLLERS TS
// This is fun but couldn't  you pass a function in there??? That would be neat BLOG IDEA.
// Or maybe a Roller Object (like calculator in notes). Lots of great ideas here
// and of course should redo where it is rollD# and you pick your die type
// which only allowed  ts types of 4 | 6| 8 etc and as the second parameter,
// how many times you want to roll it.
// And can we kill the old skool for loop for something else?
// See also google query : // This is fun but couldn't  you pass a function in there??? BLOG IDEA.
// also I get name conflicts... are my functions and types global without having to import/export. added underscores for now but im curious about  this...
// I assume only scoped to this file, but perhaps im wrong?
function _rollD6( dice: number): number {
    let pip = 0;
    for(let i = 0; i < dice; i++) {
        pip += Math.floor((Math.random() * 5)) + 1;
    }
    return pip;
}
// Roll 4d6 dice
console.log(_rollD6(4));

function zrollD10( dice: number): number {
    let pip = 0;
    for(let i = 0; i < dice; i++) {
        pip += Math.floor((Math.random() * 9)) + 1;
    }
    return pip;
}
// Roll 4d10 dice
console.log(zrollD10(4));

