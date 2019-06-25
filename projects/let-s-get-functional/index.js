// #!/usr/bin/env node

'use strict';

var customers = require('./data/customers.json');
var _ = require('lodown-btheard3');

/**
 * 1. Import your lodown module using the require() method,
 *    using the string 'lodown-<my-username>', or whatever
 *    name with which you published your npm lodown project.
 *
 * 2. Solve all problems as outlined in the README.
 *
 * 3. We started the first one for you as an example! Make the rest in that style.
 *
 * 4. To test your work, run the following command in your terminal:
 *
 *    npm start --prefix ./projects/let-s-get-functional
 */

var maleCount = function(array) {
    //find male customers
    //input: array
    //output: number
    //constraint: use filter
    
    let arr = [];
    
_.filter(array, function(element, index, collection) {
    
    if(element.gender === 'male')
    
    arr.push(element.gender);
    
});
    
    
return arr.length; 

};


var femaleCount = function(array) {
      //input: array
     //output: number
    //constraint: use reduce
  let females = _.reduce(array, function(acc, customer){
      
      if(customer.gender === 'female') {
          
          acc++;
      }
      
      return acc;
      
  }, 0);
    
    return females; 
 
};
   
    
   

var oldestCustomer = function(array) {
    
    let oldest = _.reduce(array, function(customer1, customer2){
        
        if(customer1.age > customer2.age) {
            
            return customer1;
        }
        
        return customer2; 
        
    }, '');
    
    return oldest.name; 
    
};

var youngestCustomer = function(array) {
    
    let youngest = _.reduce(array, function(customer1, customer2){
        
        if(customer1.age < customer2.age) {
            
            return customer1;
            
        }
        
        return customer2;
        
    }, '');
    
    return youngest.name; 
};

var averageBalance = function(array) {
    
   let arr = [];
   let sum = 0;
   
   _.filter(array, function(element, index, collection) {
       
       if(element.balance) {
           
    arr.push(parseFloat(element.balance.replace('$', '').replace(',', '')));
    
      }
      
   }); 
    
       for (var i = 0; i < arr.length; i++ ) {
        
             sum += arr[i];
        
    }
    
   return sum / arr.length;
};

var firstLetterCount = function(array, letter) {
    
    let arr = [];
    
    _.filter(array, function(element, index, collecton) {
        
        if(element.name[0].toLowerCase() === letter.toLowerCase()) {
            
            arr.push(element.name);
        }
        
    });
  
  return arr.length;   
    
};

var friendFirstLetterCount = function(array, customer, letter) {
console.log(customer);
   let data = {};
    //Find friends of a given <customer
 
 _.each(array, function(element, index, collection){
     if(element.name === customer){
         data = element;
     }
 });
   
 return  _.reduce(data.friends, function(count, currentFriend){
       if(currentFriend.name[0].toLowerCase() === letter.toLowerCase()){
           count++;
       }
       
       return count; 
 
   },0);
    //Find friends whose name start with given <letter>
    /*_.filter(arr, function(friends, index, collection){
        if(friends.name[0].toUpperCase() === letter.toUpperCase()) {
            arrFriends.push(friends.name);
        }
    }); */
    //Input: Array
    //Output: Number

    
};
    
    
   

var friendsCount = function(array, name) {
 let arr = [];
    //Look through customers array 
    //Look through friends array for name
    //If match save name of customer and return in an array
    _.each(array, function(customer, index, collection){
        if(customer.friends) {
            _.each(customer.friends, function(friend){
                if(friend.name === name) {
                    arr.push(customer.name);
                };
            });
        }
    });
    
return arr; 
    
};

var topThreeTags = function(array) {
    // console.log(`TopThreeTags: ${array}`)
    
    let tagCount = _.reduce(array, (preVal, customer) => {
       // console.log(array, preVal, customer)
       
       _.each(customer.tags, (tag) => {
           
           if(preVal[tag]) {
               
               preVal[tag]++;
               
           } else {
               
               preVal[tag] = 1;
               
           }
       }); 
       
       return preVal;
        
    }, {});
   // console.log(tagCount);
   
    tagCount = _.map(tagCount, (count, tag) => {
        
          return [tag, count];
        
    }); 
    
    tagCount.sort((a, b) => b[1] - a[1]);
    tagCount = _.first(tagCount, 3);
    return _.map(tagCount, tag => tag[0]); 
};

var genderCount = function(array) {
    let tally = _.reduce(array, (sexObj, curVal) => {
       if(sexObj[curVal.gender]) {
          
           sexObj[curVal.gender]++;
       
           
       } else{
           
           sexObj[curVal.gender] = 1;
       }
       
       return sexObj;
   
    },{});
    
    return tally;
};
    


//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// here, export any references you need for tests //
module.exports.maleCount = maleCount;
module.exports.femaleCount = femaleCount;
module.exports.oldestCustomer = oldestCustomer;
module.exports.youngestCustomer = youngestCustomer;
module.exports.averageBalance = averageBalance;
module.exports.firstLetterCount = firstLetterCount;
module.exports.friendFirstLetterCount = friendFirstLetterCount;
module.exports.friendsCount = friendsCount;
module.exports.topThreeTags = topThreeTags;
module.exports.genderCount = genderCount;
