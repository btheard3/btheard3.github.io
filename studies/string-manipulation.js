/* String-Manipulation: Methods and properties available to strings. */


/* String Length: (string name).length returns the length of a string. */

var string = 'Brandon';
console.log(string.length); // expected output 7

/* Slice(): extracts a part of a string and returns the extracted part in a new 
            string. Method takes two parameters start & end & slices portion from 
            start to end */

var fruit = 'Apple, Banana, Orange';   
var slice = fruit.slice(7, 13);        

console.log(slice);                    // expected output 'Banana'

/* Split(): Converts string to an array. Parameter tells where to split string
*/

var string = 'Hello';                

console.log(string.split(' ')); // expected output ['Hello']
                                  
                                  
/* charAt(): returns the character at a specific index (position) in the string */

var string1 = 'Hello' 

console.log(string1.charAt(0))        // expected output 'H'

/* Concat(): joins two or more strings into one string */

var text1 = 'Hello';
var text2 = 'World';
var text3 =  text1.concat(' ', text2);

console.log(text3)        // expected output 'Hello World'

/* toUpperCase(): converts all characters in a string to uppercase */

var text1 = 'Hello World'
var text2 = text1.toUpperCase()

console.log(text2)              // expected output 'HELLO WORLD'

/* toLowerCase(): converts all characters in a string to lowercase */

var text1 = 'Bye World';
var text2 = text1.toLowerCase();

console.log(text2);             // expected output 'bye world'



