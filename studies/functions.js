/*
* FUNCTIONS:
* 
* Javascript functions are blocks of code that perform a particular task
* Functions are executed when invoked. Functions are defined with the 
* function keyword, followed by a name, followed by () that may include
* parameters separated by commas. The code to be executed is placed inside {}.
* Function parameters listed inside the function defintion are arguments 
* when values are received when the function is invoked. Function return 
* statements are the values computed in the code; the function stops executing
* when the return statement is reached. 
*/

function myFunction(num1, num2) {
    
    return num1 + num2;
    
}

console.log(myFunction(5, 10));   //expected output 15

/* Function expressions defines a named or annoymous function (a function that 
has no name). Function expressions are not hoisted and can not be called before 
they are defined. */

let name = function(num1, num2) {
    
    return num1 * num2;
};

console.log(name(5, 4));      // expected output 20

/* Immediately Invoked Function Expression is a function that runs as soon as 
it is defined. */

var result = (function () {
    
    var name = 'Brandon';
    return name;
    
})();

console.log(result);    //expected output 'Brandon'


/*
Functions without a return statement will return undefined, while functions 
without parameters will throw a reference error: */

function myFunc(x, y) {
  
}

console.log(myFunc(5, 4));       // undefined


/*
Scope: Javascript has two scopes, global and local. Variables declared outside a
function belong to the global scope and are accessisble anywhere in the code.
Variables declared within a function are only accessible from that function or 
nested functions. */


var number = 4;      // global scope

function add(sum) {
    
    var sum = 10;    // local scope
    
    return sum;
// console.log(sum);     // Error: sum is not defined 
 
}

console.log(number);  // 4


/*
Closure: collection of all variables in scope at the time of function creation.
Closures enable functions to access data in their scopes. */

var G = 'G';

function A() {
  var A = 'A';

  function B() {
    var B = 'B';
    console.log(A, B, G);
  }

  B();           // A, B, G

  A = 42;

  B();
}

console.log(A()); // 42, B, G

/* function B() is a created closure with access to the scope of function B(), 
function A(), and the global scope. Every time B() is invoked, access to B, A, G
variables is all allowed through copy by reference. 
*/