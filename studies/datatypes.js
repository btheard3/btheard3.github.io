/*
* DATATYPES:
*
* In Javascript, a type of value is a data-type. Data-types can be either 
* primitive or complex. There are seven primitive data types, while there are 
* three complex data types. Primitive data types are primitive because they are 
* immutable (they cannot be modified) and do not hold or collect other values. 
* Complex data types are mutable and can aggregate other other values. 
* Primitive data types are copied by value and complex data types are copied 
* by reference. */


//Primitive Data-types: Boolean: indicates true or false values.
console.log(10 < 9); // false
console.log(10 > 9); // true                                 
    
//Null: intentional absence of any value.
var myVar = null;
console.log(myVar); // null

/*Undefined: represents that a variable has not been assigned a value or not 
declared at all. */
var myVar;
console.log(myVar)  // undefined

/* NaN: property represents "Not-a-Number" which means that value is not a legal 
number. */
var divideByWord = 42/'two';
console.log(divideByWord);   // NaN

//Infinity: numeric value that represents positive infinity
var bigNumber = 1.797693134862315E+308 * 5;
console.log(bigNumber);  // Infinity

//-Infinity: numeric value that represents negative infinity
var largeNumber = -1.797693134862315E+308 * 5;
console.log(largeNumber);  // -Infinity 

//Number: represents numerical values and integers
var number = 1;
var num = 2.15;
console.log(typeof number);  // number
console.log(typeof num);    // number

//String: an array of characters inside of quotes 
var string = 'Brandon'
var string2 = 'this too is a string'
console.log(typeof string)   //string
console.log(typeof string2)   //string

//Complex Data-types:

//Array: variable that can store multiple elements of multiple data types.
var array = ['true', {a: 1}, 4];

//Object: collection of key value pairs properties that contains data-types.
var object = {a: 1, b: [2], c: '3'};

//Function: block of code designed to perform a task when invoked.
function add(num1, num2) {
    return num1 + num2;
}

//Copy by Value: creating a capy of the original value

var name = 'Brandon';  // value of name is Brandon

var firstName = name;  // firstName variable is given a copy of name's value

name = 'Brandon';      // Brandon still remains name's value

console.log(firstName); // expected output 'Brandon'

//Copy by Reference: Creating a reference alias of the value

var myName = {                      // myName is given a value of an object
    
    firstName: 'Brandon'            // object has firstName property
};                                  // with value of 'Brandon'

var identity = myName;              // identity variable is assigned myName

console.log(identity.firstName);     // when firstName property is referenced
                                    // expected output 'Brandon'

