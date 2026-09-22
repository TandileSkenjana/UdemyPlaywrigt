"use strict";
let message1 = "Hello";
//Difference between JavaScript and TypeScript is that in TypeScript we can define the type of a variable. In this case, we have defined the type of message1 as string.
// message1 = 2; this will fail because message1 is of type string and cannot be assigned a number value.
message1 = "bye "; // this is valid because we are assigning a string value to message1.
console.log(message1);
let age1 = 20;
let isActive = false;
let numberArray = [1, 2, 3, 4, 5];
let data = "this could be anything"; // any type can hold any type of value, but it is not recommended to use any type as it defeats the purpose of using TypeScript.
data = 42; // this is valid because data is of type any and can hold any type of value.
data = "goodbye"; // this is also valid because data is of type any and can hold any type of value.
