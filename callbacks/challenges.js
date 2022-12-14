/**
 * Name: Callback and High-Order Functions
 * Link: http://csbin.io/callbacks
 */

/**
 * Challenge 1
 * Create a function addTwo that accepts one input and adds 2 to it. 
 */
function addTwo(num) {
    return num + 2
}

// Test Cases
// console.log(addTwo(3));
// console.log(addTwo(10));


/**
 * Challenge 2
 * Create a function addS that accepts one input and adds an "s" to it. 
 */
function addS(word) {
    return word + 's'
}

// Test Cases
// console.log(addS('pizza'));
// console.log(addS('bagel'));


/**
 * Challenge 3
 * Create a function called map that takes two inputs:
 * - an array of numbers (a list of numbers)
 * - a 'callback' function - a function that is applied to each element of the array (inside of the function 'map')
 * Have map return a new array filled with numbers that are the result of using the 'callback' function on each element of the input array.
 */
function map(array, callback) {
    return array.map(n => callback(n))
}

// Test Cases
// console.log(map([1, 2, 3], addTwo));


/**
 * Challenge 4
 * Create a function called forEach that takes an array and a callback, and runs the callback on each element of the array. forEach does not return anything.
 */
function forEach(array, callback) {
    return array.map(c => callback(c))
}

// Test Cases
// let alphabet = '';
// const letters = ['a', 'b', 'c', 'd'];
// forEach(letters, function(char) {
//   alphabet += char;
// });
// console.log(alphabet); 


/**
 * Challenge 5
 * In challenge 3, you've created a function called map. In this challenge, you're going to rebuild the map function by creating a function called mapWith. This time you're going to use forEach inside of mapWith instead of using a for loop.
 */
function mapWith(array, callback) {
    return forEach(array, callback)
}


/**
 * Challenge 6
 * reate a function called reduce that takes an array and reduces the elements to a single value. For example it can sum all the numbers, multiply them, or any operation that you can put into a function.
 */
function reduce(array, callback, initialValue) {
    return array.reduce(callback, initialValue)
}

// Test Cases
// const nums = [4, 1, 3];
// const add = function(a, b) { return a + b; }
// console.log(reduce(nums, add, 0));   //-> 8


/**
 * Challenge 7
 * Construct a function intersection that takes in an array of arrays, compares the inner arrays, and returns a new array with elements found in all of them. BONUS: Use reduce! 
 */
function intersection(arrays) {
    return reduce(
        arrays,
        function (a, b) {
            return a.filter((n) => b.includes(n))
        },
        arrays[0]
    )
}

// Test Cases
// console.log(intersection([[5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20]]));
// should log: [5, 15]


/**
 * Challenge 8
 * Construct a function union that takes in an array of arrays, compares the inner arrays, and returns a new array that contains all elements. If there are duplicate elements, only add it once to the new array. Preserve the order of the elements starting from the first element of the first array. BONUS: Use reduce! 
 */
function union(arrays) {
    // return reduce(
    // arrays,
    // (a, b) => a.concat(b.filter(n => !a.includes(n))),
    // []
    // )

    let arr = arrays.reduce((a, b) => a.concat(b), [])
    return [...new Set(arr)]
}

// Test Cases
// console.log(union([[5, 10, 15], [15, 88, 1, 5, 7], [100, 15, 10, 1, 5]]));
// should log: [5, 10, 15, 88, 1, 7, 100]


/**
 * Challenge 9
 * Construct a function objOfMatches that accepts two arrays and a callback. objOfMatches will build an object and return it. To build the object, objOfMatches will test each element of the first array using the callback to see if the output matches the corresponding element (by index) of the second array. If there is a match, the element from the first array becomes a key in an object, and the element from the second array becomes the corresponding value.
 */
function objOfMatches(array1, array2, callback) {
    return array1.reduce((a, b, i) => {
        if (callback(b) === array2[i])
            a[b] = callback(b)
        return a
    }, {})
}

// Test Cases
// console.log(objOfMatches(['hi', 'howdy', 'bye', 'later', 'hello'], ['HI', 'Howdy', 'BYE', 'LATER', 'hello'], function(str) { return str.toUpperCase(); }));
// should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }


/**
 * Challenge 10
 * Construct a function multiMap that will accept two arrays: an array of values and an array of callbacks. multiMap will return an object whose keys match the elements in the array of values. The corresponding values that are assigned to the keys will be arrays consisting of outputs from the array of callbacks, where the input to each callback is the key. 
 */
function multiMap(arrVals, arrCallbacks) {
    return arrVals.reduce((a, b) => {
        a[b] = arrCallbacks.map(callback => callback(b))
        return a
    }, {})
}

// Test Cases
// console.log(multiMap(['catfood', 'glue', 'beer'], [function(str) { return str.toUpperCase(); }, function(str) { return str[0].toUpperCase() + str.slice(1).toLowerCase(); }, function(str) { return str + str; }]));
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }


/**
 * Challenge 11
 * Construct a function objectFilter that accepts an object as the first parameter and a callback function as the second parameter. objectFilter will return a new object. The new object will contain only the properties from the input object such that the property's value is equal to the property's key passed into the callback.
 */
function objectFilter(obj, callback) {
    let newObj = {}
    for (let key in obj) {
        if (callback(key) === obj[key])
            newObj[key] = obj[key]
    }
    return newObj

    // let newObj = {}
    // for (const [key, value] of Object.entries(obj)) {
    //     if (callback(key) === value)
    //         newObj[key] = value
    // }
    // return newObj
}

// Test Cases
// const cities = {
// London: 'LONDON',
// LA: 'Los Angeles',
// Paris: 'PARIS',
// };
// console.log(objectFilter(cities, city => city.toUpperCase())) // Should log { London: 'LONDON', Paris: 'PARIS'}


/**
 * Challenge 12
 * Create a function majority that accepts an array and a callback. The callback will return either true or false. majority will iterate through the array and perform the callback on each element until it can be determined if the majority of the return values from the callback are true. If the number of true returns is equal to the number of false returns, majority should return false. 
 */
function majority(array, callback) {
    return array.reduce((a, b) => callback(b) ? ++a : --a, 0) !== 0
}

// Test Cases
// const isOdd = function(num) { return num % 2 === 1; };
// console.log(majority([1, 2, 3, 4, 5], function(num) { return num % 2 === 1; })); // should log: true
// console.log(majority([2, 3, 4, 5], function(num) { return num % 2 === 1; })); // should log: false

/**
 * Challenge 13
 * Create a function prioritize that accepts an array and a callback. The callback will return either true or false. prioritize will iterate through the array and perform the callback on each element, and return a new array, where all the elements that yielded a return value of true come first in the array, and the rest of the elements come second.
 */

// function prioritize(array, callback) {
//   const obj = array.reduce((a, b) => {
//     callback(b) ? a.t.push(b) : a.f.push(b)
//     return a
//   }, { t: [], f: [] })

//   return obj.t.concat(obj.f)
// }

function prioritize(array, callback) {
    return array.reduce((a, b) => {
        callback(b) ? a[0].push(b) : a[1].push(b)
        return a
    }, [[], []]).flat(1)
}

// Test Cases
// const startsWithS = function(str) { return str[0] === 's' || str[0] === 'S'; };
// console.log(prioritize(['curb', 'rickandmorty', 'seinfeld', 'sunny', 'friends'], startsWithS)); // should log: ['seinfeld', 'sunny', 'curb', 'rickandmorty', 'friends']

/**
 * Challenge 14
 * Create a function countBy that accepts an array and a callback, and returns an object. countBy will iterate through the array and perform the callback on each element. Each return value from the callback will be saved as a key on the object. The value associated with each key will be the number of times that particular return value was returned. 
 */
function countBy(array, callback) {
    return array.reduce((a, b) => {
        a[callback(b)]++
        return a
    }, { odd: 0, even: 0 })
}

// Test Cases
// console.log(countBy([1, 2, 3, 4, 5], function (num) {
//     if (num % 2 === 0) return 'even';
//     else return 'odd';
// })); // should log: { odd: 3, even: 2 }

/**
 * Challenge 15
 * Create a function groupBy that accepts an array and a callback, and returns an object. groupBy will iterate through the array and perform the callback on each element. Each return value from the callback will be saved as a key on the object. The value associated with each key will be an array consisting of all the elements that resulted in that return value when passed into the callback. 
 */
function groupBy(array, callback) {
    return array.reduce((a, b) => {
        const key = callback(b);
        a[key] ? a[key].push(b) : a[key] = [b]
        return a
    }, {})
}

// Test Cases
// const decimals = [1.3, 2.1, 2.4];
// const floored = function (num) { return Math.floor(num); };
// console.log(groupBy(decimals, floored)); // should log: { 1: [1.3], 2: [2.1, 2.4] }

/**
 * Challenge 16
 * Create a function goodKeys that accepts an object and a callback. The callback will return either true or false. goodKeys will iterate through the object and perform the callback on each value. goodKeys will then return an array consisting only the keys whose associated values yielded a true return value from the callback.
 */

// function goodKeys(obj, callback) {
//     let arr = []
//     for (const [key, value] of Object.entries(obj)) {
//         if (callback(value))
//             arr.push(key)
//     }
//     return arr
// }

function goodKeys(obj, callback) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        return callback(value) ? [...acc, key] : acc
    }, [])
}

// Test Cases
// const sunny = { mac: 'priest', dennis: 'calculating', charlie: 'birdlaw', dee: 'bird', frank: 'warthog' };
// const startsWithBird = function (str) { return str.slice(0, 4).toLowerCase() === 'bird'; };
// console.log(goodKeys(sunny, startsWithBird)); // should log: ['charlie', 'dee']

/**
 * Challenge 17
 * Create a function commutative that accepts two callbacks and a value. commutative will return a boolean indicating if the passing the value into the first function, and then passing the resulting output into the second function, yields the same output as the same operation with the order of the functions reversed (passing the value into the second function, and then passing the output into the first function).
 */

function commutative(f1, f2, value) {
    return f1(f2(value)) === f2(f1(value))
}

// const multBy3 = n => n * 3;
// const divBy4 = n => n / 4;
// const subtract5 = n => n - 5;
// console.log(commutative(multBy3, divBy4, 11)); // should log: true
// console.log(commutative(multBy3, subtract5, 10)); // should log: false
// console.log(commutative(divBy4, subtract5, 48)); // should log: false