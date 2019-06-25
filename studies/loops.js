/*
* LOOPS:
* 
* In Javascript loops are used to execute the same block of code a specified 
* number of times or while a specific conditon is true. 
*
* For Loop: has three parts to loop through arrays, start: where you want the 
* loop to begin; stop: where you want the loop to end; and an incrementation or
* decrementation
*/

var array = [1, 2, 3];
 
for (var i = 0; i < array.length; i++) {      /* expected output   1
                                                                   2
                                                                   3    */
    console.log(array[i]);
}

var array2 = [1, 2, 3];

for (var i = array.length - 1; i >= 0; i--) {
    
    console.log(array2[i]);                      /* expected output 3
                                                                    2
                                                                    1 */
}

/*
For-in Loop: loops through the properties of an object; the syntax includes a 
property assigned to a variable for iteration through the object.

*/
var object = {a: 1, b: 2, c: 3};

for (var property in object) {             
  console.log(object[property]);
}                                           /* expected out put: 1
                                                                 2
                                                                 3 */

/*
While Loop: creates a loop that executes a specific statement while a condition
is true.

*/

var n = 0;

while (n < 5) {
    n++;
}

console.log(n);                 // expected output: 5