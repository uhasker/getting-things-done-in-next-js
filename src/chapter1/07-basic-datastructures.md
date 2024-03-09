## Basic Data Structures

<div style="text-align: right"> <i> A set is like a wise emperor's court: it welcomes many, but never the same face twice. <br> — Ancient Chinese proverb </i> </div>

### More on Strings

We already learned about strings (which represent sequences of characters).
We also learned that they can be concatenated using the `+` operator and that you can get their length using the `length` property.
However this is not enough to efficiently work with strings.

Luckily, strings offer a wide range of additional functionality for pretty much every use case you will ever need - in this subsection we will briefly look at some of it.

First, you can access individual characters using the `charAt` function or array brackets:

```js
const str = 'Hello';
console.log(str[1]); // e
console.log(str.charAt(1)); // e
```

Remember that there is no special character data type in JavaScript, i.e. `typeof str[1]` is simply `'string'`.

Strings also offer a wide range of methods, most of which are self-explanatory:

```js
const str = 'Hello';
console.log(str.concat(' world')); // Hello world
console.log(str.includes('el')); // true
console.log(str.startsWith('He')); // true
console.log(str.endsWith('llo')); // true
console.log(str.indexOf('l')); // 2
console.log(str.lastIndexOf('l')); // 3
console.log(str.toLowerCase()); // hello
console.log(str.toUpperCase()); // HELLO
```

The `substring` method allows you to return a part of a string.
You need to pass a start index and and end index:

```js
console.log(str.substring(1, 3)); // el
```

Note that the start index will be _included_ and the end index will be _excluded_ when creating the substring.

> There is also the `substr` method which is deprecated so don't use it.

The `trim` method allows you to remove whitespace from the start and the end of a string.
This is especially useful when you need to process user input and need to remove accidental whitespace at the start and the end of a string:

```js
console.log(' Hello '.trim()); // Hello
```

The `split` method splits the string into substring by a delimiter.
For example here is how you might split a comma-separated list into its items:

```js
console.log('Task 1, Task 2, Task 3, Task 4'.split(','));
```

This will result in the following array:

```
[ 'Task 1', ' Task 2', ' Task 3', ' Task 4' ]
```

Note that the whitespace is not removed by the `split` method, you would need to iterate over the resulting array and use the `trim` method on each string to accomplish that.

### More on Arrays

We already learned how to construct arrays and how to work with individual array elements.
However just like strings, arrays have a few additional methods that will often come in handy.

You can check whether an object is an array using the `Array.isArray` method:

```js
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray('123')); // false
```

You can create an array from an object with `Array.from`.
To successfully use `Array.from` the object must be _convertible to an array_.

For example, a string is convertible to an array:

```js
console.log(Array.from('123')); // [ '1', '2', '3' ]
```

If you try to use `Array.from` on an object that is not convertible to an array you will get an empty array:

```js
console.log(Array.from(2)); // []
```

You can create an array from a variable number of arguments by using `Array.of`:

```js
console.log(Array.of(1, 2, 3)); // [ 1, 2, 3 ]
```

Just like strings, arrays have a `concat`, `includes`, `indexOf` and `lastIndexOf` method:

```js
console.log([1, 2, 3].concat([4, 5, 6])); // [ 1, 2, 3, 4, 5, 6 ]
console.log([1, 2, 3].includes(2)); // true
console.log(['a', 'b', 'b', 'c'].indexOf('b')); // 1
console.log(['a', 'b', 'b', 'c'].lastIndexOf('b')); // 2
```

The `join` method allows you to concatenate all elements in an array to a string, where the elements are separated by a delimiter:

```js
console.log(['H', 'e', 'l', 'l', 'o'].join('')); // Hello
console.log(['H', 'e', 'l', 'l', 'o'].join(',')); // H,e,l,l,o
```

You can use the `push` method to add a new element to the end of an array:

```js
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [ 1, 2, 3, 4 ]
```

The `pop` element removes the last element of an array:

```js
const arr = [1, 2, 3];
arr.pop();
console.log(arr); // [ 1, 2 ]
```

The `reverse` method allows you to reverse an array:

```js
const arr = [1, 2, 3];
arr.reverse();
console.log(arr); // [ 3, 2, 1 ]
```

Arrays can be nested, resulting in multidimensional arrays.
Accessing an element of such a nested array results in another array (of a lower dimension).
Nested arrays can be flattened with the `flat` method:

```js
const nestedArray = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(nestedArray[1]); // [ 4, 5, 6 ]
console.log(nestedArray[1][2]); // 6
console.log(nestedArray.flat()); // [ 1, 2, 3, 4, 5, 6 , 7, 8, 9 ]
```

### The `for...of` Loop

`For..of` loops allow you to _iterate over arrays and strings_ (and some other things that we will cover later on) and perform a task for each element / character.
Let's say you want to print all tasks from a list named `tasks`.
Previously we would have used a regular `for` loop:

```js
const tasks = ['Task 1', 'Task 2', 'Task 3'];
for (let i = 0; i < tasks.length; i++) {
  console.log(tasks[i]);
}
```

Instead you can use the `for...of` loop:

```js
const tasks = ['Task 1', 'Task 2', 'Task 3'];
for (let task of tasks) {
  console.log(task);
}
```

Both versions will output:

```
Task 1
Task 2
Task 3
```

As we already mentioned, you can use a `for..of` loop to iterate over a string as well:

```js
const str = 'Task';
for (let char of str) {
  console.log(char);
}
```

This would output each character of the string, i.e.:

```
T
a
s
k
```

The general syntax of a `for..of` loop is

```js
for (let variable of arrayOrString) {
  statements;
}
```

It should be noted that if you don't change the variable inside the loop, you can and should also declare it as `const`.
Our first `for...of` example could therefore be rewritten to

```js
const tasks = ['Task 1', 'Task 2', 'Task 3'];
for (const task of tasks) {
  console.log(task);
}
```

> Just to reiterate, a `for...of` loop can iterate over more objects than just arrays and strings.
> However this is out of scope for this book.

### More on Objects

You can use the static methods `Object.keys` and `Object.values` to retrieve the keys and values of an object respectively:

```js
const task = {
  id: 1,
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
};

console.log(Object.keys(task)); // [ 'id', 'title', 'description' ]
console.log(Object.values(task)); // [ 1, 'Read the Next.js book', 'Read and understand the Next.js book.' ]
```

You can also use the static method `Object.entries` to retrieve the key-value pairs of an object:

```js
const task = {
  id: 1,
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
};

console.log(Object.entries(task));
```

This will output:

```js
[
  ['id', 1],
  ['title', 'Read the Next.js book'],
  ['description', 'Read and understand the Next.js book.'],
];
```

### The `for...in` Loop

The `for...in` loop allows you to iterate over the properties of an object:

```js
const task = {
  id: 1,
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
};

for (const prop in task) {
  console.log(prop);
}
```

This will output:

```
id
title
description
```

### Maps

A `Map` object is a collection of a key-value pairs:

```js
const capitals = new Map([
  ['Germany', 'Berlin'],
  ['France', 'Paris'],
]);
capitals.set('Spain', 'Madrid');
console.log(capitals.get('France')); // Paris
console.log(capitals.size); // 3
capitals.delete('France');
console.log(capitals.has('France')); // false
```

At first glance maps appear to be very similar to objects, however there are a few imporant differences.

First, it is very easy to get the size of a map (using the `size` property), whereas with objects you would need to keep track of the size manually.

Second, the keys of an object are usually strings, whereas with maps they can have any data type.

It is recommended to use maps if the key-value pairs are unknown until run time (for example because they are determined by user input), all keys have the same type and all values have the same type.

### Sets

A `Set` object is a collection of unique values:

```js
const values = new Set([1, 2, 3]);
values.add(4);
console.log(values.has(2)); // true
console.log(values.size); // 4
values.delete(3);
```

Note that all values in a set must be unique, i.e. duplicates are not allowed:

```js
const values = new Set([1, 2, 3]);
values.add(2);
console.log(values); // Set(3) { 1, 2, 3 }
```

### JSON

JSON is a data format for data exchange (e.g. on a network) and can basically store nested JavaScript objects and arrays.
While it was heavily inspired by JavaScript, it is a language-independent data format and is in fact used by many other programming languages to exchange data.

Here is an example JSON file:

```json
{
  "user": {
    "name": "John Doe",
    "age": 24,
    "hobbies": ["running", "swimming"]
  },
  "group": "Example group"
}
```

> Yes, this is exactly the same syntax that you would use in JavaScript to define objects and arrays.

You can convert a JavaScript value to a JSON string using `JSON.stringify`:

```js
const result1 = JSON.stringify({ x: 1 });
console.log(typeof result1); // 'string'
console.log(result1); // {"x":1}

const result2 = JSON.stringify([1, 2, 3]);
console.log(typeof result2); // 'string'
console.log(result2); // [1,2,3]
```

Note that `JSON.stringify` has some unintuitive behaviours.
For example, running `JSON.stringify` on a map or a set will always return `{}`:

```js
console.log(JSON.stringify(new Map([[1, 2]]))); // {}
console.log(JSON.stringify(new Set([1, 2]))); // {}
```

The reverse operation to `JSON.stringify` is `JSON.parse` which takes a JSON string and constructs a JavaScript value from it:

```js
const obj = JSON.parse('{"x": 1}');
console.log(typeof obj); // 'object'
console.log(obj); // { x: 1 }

const arr = JSON.parse('[1, 2, 3]');
console.log(typeof arr); // 'object'
console.log(arr); // [ 1, 2, 3 ]
```
