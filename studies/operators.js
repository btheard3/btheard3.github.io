/*
* OPERATORS: 
* 
* Operators are used to assign values, compare values, or perform arithmetic 
* operations. 
*/

/*
* Assignment Operators: assigns values to variables
*/

var num = 10;        // assigns num value of 10
console.log(num);   //  10;

num += 5;           // addition assignment 
console.log(num);    // 15

num -= 5;           // subtraction assignment
console.log(num);    // 10

num *= 5;           // multiplication assignment
console.log(num);    // 50

num /= 5;           // division assignment 
console.log(num);    // 10

num %= 5;           // remainder assignment
console.log(num);    // 0

/*
* Arithmetic Operators: performs arithmetic between variables or values
*/

var sum = 5 + 4;     // addition
console.log(sum);    // 9

sum - 5;               // subtraction
console.log(sum);     // 4

sum * 5;              // multiplication
console.log(sum);    // 20

sum / 5;              // division
console.log(sum);    // 4

sum % 3;             // remainder
console.log(sum);    // 1

sum++;               // increment
console.log(sum);    // 2

sum--;               // decrement
console.log(sum);    // 1

/*
Comparison Operators: are used in logical statements to compare equality or 
difference between variables or values.
*/

var a = 10;

a == 10;          // equal to
console.log(a); // true

a === '10';      // equal value and equal type
console.log(a); // false
                
a != 5;         // not equal
console.log(a); // true
               
a !== 10;         // not equal value and type
console.log(a);   // false

a > 5;           // greater than
console.log(a);  // true

a < 11;          // less than
console.log(a); // true

a >= 10;         // greater than or equal to
console.log(a);  // true

a <= 9;          // less than or equal to
console.log(a); // false

/*
Logical Operators: determine logic between values or variables; returns boolean
value.
*/

const x = 5;
const y = 10;

console.log(x < 10 && y > 5);        // logical AND
                                     // true
                   
console.log(x === 10 || y === 5);    // logical OR
                                     // false
                      
console.log(x !== 10);            // logical NOT
                                 // true
                    
/*
Unary Operators: is an operation with only one operand 
*/

console.log(typeof 3);            // returns type of data type as string
                                  // 'number'
                    
var obj = {
    first: 'Brandon',
    last:  'Theard'
};

delete obj.first;       // deletes object, property of an object, index in array
console.log(obj) ;     // {last: Theard}

console.log(!true === false);    // NOT operator performs negation of expression
                                // true
                        
console.log(+true);       // + operator converts value to a number
                         // 1

console.log(-true);      // - operator negates and converts value to a number
                        // -1
                        
/* 
Ternary Operators: assigns a value to a variable based on some condition
*/

var age = 25;
var drinkingAge = (age < 21) ? 'Too Young' : "Old Enough";

console.log(drinkingAge);    // prints Old Enough;