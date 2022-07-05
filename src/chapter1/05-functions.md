## Functions

<div style="text-align: right"> <i> "The best time to write a function was twenty years ago. But the second best time is today." <br> "That makes no sense." <br> "Actually, it kind of does if you think about the history of functional programming." <br> — Dialogue between a master and his student </i> </div>

### Declaring and calling functions

When programming we often have to perform some common actions over and over again. For example we might want to get the list of tasks assigned to a user at multiple parts within our software. Instead of writing code that (essentially) does the same thing multiple times we could use a **function**.

Within the **function definition** we would specify what statements should be executed. Then we can write a **function call** (also called **function invocation**). This would then actually execute the statements specified in the definition. We can simply group common actions into a function and then just call the function whenever we need the execute those actions.

Here is a very simple function definition:

```javascript
function printGreeting() {
  console.log('Hello world!');
}
```

Function definitions begin with the `function` keyword followed by the function name (in this case `printGreeting`). We will cover the meaning of the parentheses in a second, but the curly braces contain the _body_ of the function. These are all the statements that will be executed when the function is called. In this case we have one statement, which will simply print `Hello world!` to the console.

You can call / invoke the `printGreeting` function by writing `printGreeting()`:

```javascript
printGreeting(); // Hello world!
```

You can of course have as many statements as you want inside the function body:

```javascript
function printGreetings() {
  console.log('Hello world!');
  console.log('Hello again!');
}
```

These functions are not particularly interesting since they do the exact same thing for every function call. In this case, we print the exact same greeting(s) every time. But what if we wanted to print a different greeting depending on the user (containing e.g. the user name)?

We can solve this by defining **function parameters**. This allows us to pass values into the function, so that the function can adjust its behaviour. The function parameters go between the parentheses:

```javascript
function printGreeting(user) {
  console.log(`Hello ${user}!`);
}

printGreeting('Jane'); // Hello Jane!
```

In this example we have a single parameter called `user`. The function prints the greeting with the appropriate user. Within the function call we then pass the user (in this case `Jane`) as an **argument** to the function.

We can also **return** values from functions using the `return` keyword. Here is a function that takes a number and returns the square of it:

```javascript
function square(num) {
  return num * num;
}
```

We can now use the function as follows:

```javascript
const squaredNum = square(3);
console.log(squaredNum); // 9
```

### Functions are objects

Despite the fact that you get "function" when you use `typeof` with a function, functions are really just objects.

This means that we can assign functions as variables, pass them to other functions as arguments and do all the other neat things we can do with primitives and objects. For example we could assign the `square` function to a variable:

```javascript
const square = function square(num) {
  return num * num;
};
```

We could then call this like a regular function by doing e.g. `square(3)`.

This is called a **function expression**. Note that the function may be **anonymous** here (i.e. it doesn't have a name). We could write this:

```javascript
const square = function (num) {
  return num * num;
};
```

The syntax for calling such a function is still the same, e.g. we could write `square(3)`.

### Arrow functions

There is a shorthand notation available in JavaScript called the **arrow function** notation. This notation allows you to omit certain keywords in certain situations. For example here is how you could rewrite the `square` function using the arrow function notation:

```javascript
const square = (num) => num * num;
```

This is much shorter and less _tedious_ (haha) indeed.

For an arrow function you only have to specify the parameter(s), followed by an arrow, followed by the returned value. If you have multiple parameters, you need to put them inside parentheses:

```javascript
const add = (x, y) => x + y;
```

You can also have multiple statements in the function body, but then you have to specify the `return` keyword and surround the statements with curly braces:

```javascript
const printAndGreet = (user) => {
  const greeting = `Hello ${user}`;
  console.log(greeting);
  return greeting;
};
```

As you can see this is not too different from a regular function declaration or expression (unlike the `square` function, where the arrow notation was much shorter). It is therefore common practice to only use arrow functions for short functions like `square`. However this is again just convention.

One thing you might have noticed, is that we only showed you **arrow function expressions**. This is not an oversight but stems from the fact that there is no way to write a **function declaration** with the **arrow function notation**. Another difference is that **arrow functions** are _always_ anonymous.

### Methods

A method is a function which is a property of an object.

```javascript
const greeter = {
  greet: function () {
    console.log('Hello, world!');
  },
};
```

You can call a method like this:

```javascript
greeter.greet(); // Hello, world!
```

Methods can refer to the properties of an object using the `this` keyword which is simply a reference to the current object:

```javascript
const task = {
  id: 1,
  summary: 'Read the MERN book',
  description: 'Read and understand the MERN book.',
  longDescription: function () {
    return `${this.summary}(ID = ${this.id}): ${this.description}`;
  },
};
```

You can call the method by doing `task.longDescription()`. This would print:

```
Read the MERN book(ID = 1): Read and understand the MERN book.
```

A method can also change the properties of an object using the `this` keyword.

We will not dwell on methods for too long, since we will not use them all that often as this would lead to a _ghastly_ thing called _Object-Oriented Programming_ (OOP for short). Instead we want you to think _functionally_, which is what the next section will be about.

> Inevitable disclaimer for _certain_ Java/C#/... people: The sentence about OOP was a joke and used correctly, OOP has its merits. We just wanted to be funny. We're very sorry about that and will now perform the appropriate penance procedure.

### Summary

You learned how to declare and call functions and methods. You also learned about the arrow notation as a convenient shorthand for functions.

### Further reading

- [JavaScript Guide - Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
