//  [functions.ts]
// Basic paramter typing
function addNumbers(a:number, b:number)  {
    return a + b;
}

// Note in ts we we dont like module.exports...
    // module.exports = addNumbers;
//...Rather
export default addNumbers;

// you can do default parameter values too. eg add str3: string = "foobar"
export const addStrings = (str1: string, str2: string): string => `${str1} ${str2}`;

// union type
export const format = (title: string, param : string | number): string => `${title} ${param}`

// void function
// use CMD K, CMD I, which tells us it is of type  void
// so we just color void it.
export const printFormat = (title: string, param : string | number): void => {
    console.log(format(title,param));
}

//promise function
// CMD k CMD I = Promise<string>
// note if you are getting error  like promise is not defined, go to tsconfig and  update "target": "esnext"
export const fetchData = (url: string): Promise<string> => Promise.resolve((`Data from ${url}`));

// ts rest parameters
// use rest parameters for indeterminable parameters, dynamic parameters
// to essentially "catch" the rest.
// any parameter received after the salutation is put into an array
// of names (rest parameters)
function introduce(salutation: string, ...names: string[] ): string {
    return `${salutation} ${names.join(' ')}`
}