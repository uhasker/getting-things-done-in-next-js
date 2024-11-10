## Functions

<div style="text-align: right"> <i> A function with no purpose is like a dragon with no fire. <br> — Ancient Chinese proverb </i> </div>

### Declaring and Calling Functions

In our programs we often need to execute groups of actions over and over again.
For example, we might want to get the list of all tasks assigned to a user at various parts of our task application.
Instead of writing code that (essentially) does the same thing again and again we could use a **function**.

Within the **function definition** we would specify what statements should be executed.
Then we can write a **function call** (also called **function invocation**).
This would then actually execute the statements specified in the definition.

We can use this mechanism to group common actions into a function and then just call the function whenever we need to execute those actions.

Here is a very simple function definition:

```js
function printGreeting() {
  console.log('Hello, World!');
}
```

Function definitions begin with the `function` keyword followed by the function name (in this case `printGreeting`).
We will cover the meaning of the parentheses `()` in a second, but the curly braces `{}` contain the _body_ of the function.
These are all the statements that will be executed when the function is called.
In this case we have one statement, which will simply output `Hello, World!` to the console.

You can call / invoke the `printGreeting` function like this:

```js
printGreeting(); // Hello, World!
```

You can have as many statements as you want inside the function body:

```js
function printGreetings() {
  console.log('Hello, World!');
  console.log('Hello, again!');
}
```

If you call `printGreetings()` both statements will be executed and the console output will look as follows:

```
Hello, World!
Hello, again!
```

These functions are not particularly interesting since they do the exact same thing for every function call.
In this case, we print the exact same greeting(s) every time.

But what if we wanted to (for example) output a different greeting depending on the user?

We can do this by defining **function parameters**.
These allow us to pass values into the function.
That way the function can adjust its behaviour _depending on those values_.

The function parameters go between the parentheses:

```js
function printGreeting(user) {
  console.log(`Hello, ${user}!`);
}

printGreeting('Jane'); // Hello, Jane!
```

In this example we have a single parameter called `user`.
The function prints the greeting with the appropriate user inserted.
Within the function call we then pass the user (`Jane` in this case) as an **argument** to the function.

We can also **return** values from functions using the `return` keyword.
This keyword is used to specify the result that the function should produce, which can then be used in other parts of your code.

Here is a function that takes a number and returns the square of that number:

```js
function square(num) {
  return num * num;
}
```

We can now use the function as follows:

```js
const squaredNum = square(3);
console.log(squaredNum); // 9
```

### Default Parameters

You can use **default parameters** to initialize parameters with default values if either no values or `undefined` are passed as arguments:

```js
function add(x, y = 1) {
  return x + y;
}

console.log(add(1)); // 2
console.log(add(1, undefined)); // 2
console.log(add(1, 4)); // 5
```

Here, if no argument or `undefined` is passed to `y`, the value of `y` will automatically become `1`.

### Rest Parameters

Sometimes it can be useful to pass an arbitrary number of arguments to a function.
This can be done via **rest parameters** which uses the `...args` syntax:

```js
function sum(...args) {
  let result = 0;
  for (let i = 0; i < args.length; i++) {
    result += args[i];
  }
  return result;
}

console.log(sum()); // 0
console.log(sum(1)); // 1
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3)); // 6
```

The `args` object is simply an array.
All arguments that can't be matched to any parameter will be inside the `args` array:

```js
function f(x, y, ...args) {
  console.log(`x=${x}, y=${y}, args=${args}`);
}

f(1, 2, 3, 4); // x=1, y=2, args=3,4
```

### Functions are Objects

Despite the fact that using `typeof` on a function will result in `function`, JavaScript functions are really just objects.

> This is not a general feature of all programming languages.
> In many other languages, functions and objects are fully separate concepts.

This means that we can assign functions as variables, pass them to other functions as arguments and do all the other neat things we can do with objects.
For example, we could assign the `square` function to a variable:

```js
const square = function square(num) {
  return num * num;
};
```

We could then call this like a regular function by writing e.g. `square(3)`.

This is called a **function expression**.
Note that the function may be **anonymous** (i.e. nameless):

```js
const square = function (num) {
  return num * num;
};
```

The syntax for calling such a function is still the same, e.g. we would still write `square(3)` to call the function.

### Arrow Functions

There is a shorthand notation available in JavaScript called the **arrow function** notation.
This notation allows you to omit certain keywords in certain situations.
For example, here is how you could rewrite the `square` function using the arrow function notation:

```js
const square = (num) => num * num;
```

This is much shorter and less _tedious_ (remember that?) indeed.

For an arrow function you only have to specify the parameter(s), followed by an arrow `=>`, followed by the returned value.
If you have multiple parameters, you need to put them inside parentheses:

```js
const add = (x, y) => x + y;
```

You can also have multiple statements in the function body, but then you have to specify the `return` keyword and surround the statements with curly braces:

```js
const printAndGreet = (user) => {
  const greeting = `Hello ${user}`;
  console.log(greeting);
  return greeting;
};
```

As you can see this is not too different from a regular function declaration or expression (unlike the `square` function, where the arrow notation was much shorter).
It's therefore common practice to only use arrow functions for really short functions like `square`.
However, this is again just a convention that we will use in this book.
As usual, it's totally fine to use arrow functions everywhere (or never use arrow functions)—just be consistent.

One thing you may have noticed is that we only showed you **arrow function expressions**.
This is not an oversight, but stems from the fact that there is no way to write a function declaration with the arrow function notation.

### Scope

The **scope** of a variable is the part of the program in which it can be referenced.
There are three scopes that are important right now—the **global scope**, the **function scope** and the **block scope**.

> Later we will also learn about the module scope.

Consider the following script:

```js
let inGlobalScope = 0;

function f() {
  let inFunctionScope = 1;

  if (true) {
    let inBlockScope = 2;
  }
}
```

The variable `inGlobalScope` is in global scope and can be accessed by the entire script.
For example, all of these `console.log` calls will correctly print the value of the variable:

```js
let inGlobalScope = 0;

function f() {
  let inFunctionScope = 1;

  if (true) {
    let inBlockScope = 2;

    console.log(inGlobalScope);
  }

  console.log(inGlobalScope);
}

f();
console.log(inGlobalScope);
```

This will log:

```
0
0
0
```

The variable `inFunctionScope` is accessible only from within the function `f`:

```js
let inGlobalScope = 0;

function f() {
  let inFunctionScope = 1;

  if (true) {
    let inBlockScope = 2;

    console.log(inFunctionScope);
  }

  console.log(inFunctionScope);
}

f();
console.log(inFunctionScope); // This will result in an error!
```

This will print:

```
1
1
file.js:16
console.log(inFunctionScope);
            ^

ReferenceError: inFunctionScope is not defined
```

Finally, the variable `inBlockScope` is in block scope and is available only in the block of the `if` statement:

```js
let inGlobalScope = 0;

function f() {
  let inFunctionScope = 1;

  if (true) {
    let inBlockScope = 2;

    console.log(inBlockScope);
  }

  console.log(inBlockScope); // This will result in an error!
}

f();
```

This will log:

```
2
file.js:12
  console.log(inBlockScope); // This will result in an error!
              ^

ReferenceError: inBlockScope is not defined
```

### Function Signature

The **function signature** refers to the arguments that a function takes and the value(s) it returns.

Consider the following `sum` function:

```js
function sum(a, b) {
  return a + b;
}
```

The function signature of the `sum` function can be described by saying that this function takes two numbers and returns another number.

Programmers often talk about _changing the function signature_.
This just means changing the function such that it takes different arguments (or arguments of different data types) and/or returns different arguments (or arguments of different data types).

For example, if the `sum` function would take an additional argument, it would have a different function signature:

```js
function sum(a, b, c) {
  return a + b + c;
}
```

Similarly, if `sum` would take two strings instead of two numbers, it would also have a different function signature (and also a highly misleading name):

```js
function sum(a, b) {
  return `a=${a}, b=${b}`;
}
```

> This is only an example to show a change of a function signature.
> Please don't write functions with highly misleading names like that.

### JSDoc

JSDoc is a markup language that can be used to annotate JavaScript code.
Its most important use is to annotate functions.

For example, here is how you could annotate a function using JSDoc:

```js
/**
 * Calculates the sum of two numbers.
 *
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of a and b.
 */
function sum(a, b) {
  return a + b;
}
```

This is useful if you have complex functions with lots of parameters.
Documenting your functions allows other developers to quickly understand their purpose without needing to read the function bodies.
