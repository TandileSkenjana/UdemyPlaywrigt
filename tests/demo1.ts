let messageText: string = "Hello";
//Difference between JavaScript and TypeScript is that in TypeScript we can define the type of a variable. In this case, we have defined the type of messageText as string.
// messageText = 2; this will fail because messageText is of type string and cannot be assigned a number value.
messageText = "bye "; // this is valid because we are assigning a string value to messageText.
console.log(messageText);
let age1Value: number = 20;
console.log(age1Value);
let SumArray: number[] = [1, 2, 3, 4, 5];

let datatype: any = "this could be anything"; // any type can hold any type of value, but it is not recommended to use any type as it defeats the purpose of using TypeScript.
datatype = 42; // this is valid because datatype is of type any and can hold any type of value.
datatype = "goodbye"; // this is also valid because datatype is of type any and can hold any type of value.

function add(a: number, b: number): number

{
    return a + b;
}

add(3, 4);
let user: { name: string; age: number } = { name: "Bob", age: 30 }; // we can define the type of an object in TypeScript. In this case, we have defined the type of user as an object with name and age properties."}