/*
* VARIABLES:
*
* 0. To hold things in memory during the life-cycle of a program, we can use 
* variables.  Variables are named identifiers that can point to values of a 
* particular type, like a Number, String, Boolean, Array, Object or another 
* data-type.  Variables are called so because once created, we can CHANGE the 
* value (and type of value) to which they point.

* 1. To create a variable we use the keyword, var, followed by a name 
* (id or alias) for our variable.

* 2. There are 2 phases of using variables: declaration and initialization 
* (or assignment).
*/

// 1. declaration //
var myName;

/*
* At the declaration phase, the variable myName is undefined because we have 
* NOT initialized it to anything
*/
console.log(myName); // prints => undefined

// 2. initialization or assignment //
myName = 'john';
console.log(myName); // prints => john

// 3. re-assignment //
myName = 'bob';
console.log(myName); // prints => bob

/* NOTE: We can assign and re-assign anything to a variable - we cannot do this 

with constants */
var myVariable = 1;
var myVariable = true;
myVariable = "someString";

/*
* VAR: statement declares a global or function scope variable, optionally 
* assigns a value.
*/

var myVar;           // declaration
myVar = 'a';          // initialization
console.log(myVar);   // prints a

/*
* LET: the statement declares a block scope local variable, optionally assigns
* a value.
*/

let x;          // declaration;
x = 1;          // initialization
console.log(x);  // prints 1

let y = 1;

if (x === y) {
    
    let y = 2;          
    console.log(y);    // prints 2
}

console.log(y);       // prints 1

/*
* CONST: block scope variables with a value that must be assigned during 
* declaration  cannot be reassigned or redeclared after assignment; but values
* are not immutable.
*/

const cars = ['Ford', 'Chevy', 'GMC'];
cars[1] = 'Honda';
console.log(cars);    // prints ['Ford', 'Honda', 'GMC']

cars = ['Ford', 'Nissan', 'GMC'];
console.log(cars);    // prints Error message

/*
* HOISTING: mechanism where variables and function declarations are moved to the
* top of their scope before code is executed. Declarations, not 
* the initializations are hoisted. Hoisting undeclared variables using var
* will assign a value of undefined. Hoisting undeclared variables using let 
* const will assign a Reference Error. Variable assignment takes precedence over 
* function declarations, function assignment takes precedence over variable 
* declarations.
*/

console.log(hoist);          //output: undefined

var hoist;                  // hoisted

console.log(top);            // output: error message

let top;                    // not hoisted

function double(num) {
    return num * 2;
}

var double = 22;             // Hoisted to top

console.log(typeof double);   //Output: number 



