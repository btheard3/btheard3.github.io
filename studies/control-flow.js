/* 
* CONTROL-FLOW:
*
* 0. In Javascript the order in which the computer executes statements in a 
* script is the control-flow.
*
* 1. The if/else statements executes a block of code for specific conditions. 
* The if statement executes a block of code if the condition is true.
* The else statement exectues a block of code if the condition is false; while
* the else-if statement exectues a code block that specifies a new condition.
*
* 2. The switch statement will execute a block of code that depend on different
* cases. The switch statement evaluates an expression; that value is compared
* with the values of each case in the code block. If there is a match, the 
* block of code will be executed. The break keyword will stop the execution of
* of code or case testing in the code block. The default keyword indicates what
* code to run if there is no case match.
*/

//If-Else Statement
var a = 1 + 1;
var b = 1 + 2;

if(a > b) {
 
 console.log(a);

} else if (a < b) {
    
    console.log(b);

} else {
    
    console.log('a is equal to b'); // expected output: 3
}

//Switch Statements

const grade = 87;

switch(true) {
    //If grade is greater than 90
    case grade >= 90:
        console.log('A');
        break;
    //If grade is greater than 80
    case grade >= 80:
        console.log('B');
        break;
    //If grade is greater than 70
    case grade >= 70:
        console.log('C');
        break;
    //If grade is greater than 60
    case grade >= 60:
        console.log('D');
        break;
   //If grade is below 59 
   default: 
   console.log('F');       //expected output 'B';
}