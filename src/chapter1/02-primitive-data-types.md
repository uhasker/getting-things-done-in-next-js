## Primitive Data Types

<div style="text-align: right"> <i> == is the equality operator <br> === is the one and true equality operator <br> ==== is the equality operator which transcends time and space <br> ===== is the equality operator which transcends all other equality operators <br> ====== is the equality operator which summons the UNSPEAKABLE DOOM (all is lost) <br> — from "The Book of the Equality Operators and their Virtue" by Laozi </i> </div>

### Variables

Whenever we write programs, we need to manipulate data.
This data needs to be stored somewhere and we need to be able to access it somehow.

We also need to deal with the fact that when we execute a program, the values we deal with are _not predictable_ in advance.
For example, we don't know which tasks a user might create (that's kind of the point of writing our application after all).
Nevertheless, we must be able to access created tasks through a _predictable_ name like `tasks` or `createdTasks`.

Therefore, we need a way to put an _unpredictable_ value somewhere and refer to it using a _predictable_ name.
In programming, that "somewhere" is referred to as _storage_ and the predictable name as a _symbolic name_.

A **variable** is just that—a storage location containing a value which is referred to by a symbolic name.
This _sounds_ really fancy, but it just means that there is a value somewhere in your storage and you can refer to that value using a symbolic name that doesn't change (even if the value itself changes).

For example, you could have a variable `age` which has the value `20` (we say that `age` is equal to `20`):

![](images/variable.png)

Now even if the value of `age` changes (e.g. to `21` because a birthday happened), the variable name doesn't change, only the value does.
The variable name will still be `age`.
However, `age` will now have the value `21` (i.e. `age` will be equal to `21`):

![](images/variable-changed.png)

JavaScript lets you declare variables using the `let` keyword.
You can assign values to variables with the **assignment operator** (`=`):

```js
// Declare a variable
let x;

// Assign a value to a variable
x = 10;
```

You can print the value of the variable using the `console.log` method:

```js
console.log(x); // 10
```

> If you follow along in the Node.js (or browser) console, you don't actually need to use the `console.log` method to print the value of a variable.
> Instead, you can simply type the variable (or any expression for that matter) and the console will display its value.
> For example, you can simply type `x` instead of `console.log(x)` and you will see the value of `x`.

You can also have a declaration and an assignment on a single line.
In fact, this is usually the way to go:

```js
let y = 10;
```

The value of a variable may change over the course of a program:

```js
let y = 10;
console.log(y); // 10

// Assign a new value to the variable
y = 20;
console.log(y); // 20
```

This will output `10`, followed by a `20`.

> Remember that, according to our book conventions, a comment after a `console.log` indicates the value that will be logged.

If you want to declare a predictable name for a value that never changes, you can declare a **constant**.
This is done using the `const` keyword:

```js
const ten = 10;
```

If you try to reassign a value to a constant, you will get an error.
For example, let's declare a constant and try to assign a new value to it:

```js
const ten = 10;
ten = 20;
```

You will get the following error:

```
Uncaught TypeError: Assignment to constant variable.
```

You will almost exclusively see us using `const` instead of `let` from now on.
Reassignment is not nearly as necessary as you might think right now.

> You can also declare variables using the `var` keyword.
> We will not cover it here and you essentially only need to know one thing about `var`—you should _basically never use it_.
> That's because `var` has really weird behaviour around scopes (we will talk about scopes later).
> For all practical purposes, you can treat `var` as a historical artifact of JavaScript.

Any variable has a **data type** which denotes the range of values it can take and which operations can be performed on the variable.
You can use the `typeof` operator to obtain the data type of a variable.

We begin with a few particularly important **primitive data types**.
These are numbers, booleans, strings and `undefined`.

### Numbers

You've already encountered the `number` data type:

```js
const age = 20;
console.log(typeof age); // number
```

Any integer or real number is a `number`:

```js
console.log(typeof 42); // number
console.log(typeof -20); // number
console.log(typeof 3.4); // number
console.log(typeof -1.7); // number
```

You can perform arithmetic on numbers using the usual arithmetic operators `+`, `-`, `*` and `/`.
There is also the `%` (modulo) operator which returns the remainder of a division.
Finally, there is the `**` operator which does exponentiation:

```js
const a = 3;
const b = 4;
console.log(a + b); // 7
console.log(a - b); // -1
console.log(a * b); // 12
console.log(a / b); // 0.75
console.log(a % b); // 3
console.log(a ** b); // 81
```

You can also use the **shorthand assignment operators** to combine assignment and arithmetic operators:

```js
let a = 3;
a += 4;
console.log(a); // 7
a -= 2;
console.log(a); // 5
a *= 3;
console.log(a); // 15
a /= 3;
console.log(a); // 5
a %= 3;
console.log(a); // 2
a **= 5;
console.log(a); // 32
```

You also use the **postfix increment** and the **postfix decrement** operators to increment or decrement a value by 1:

```js
let a = 4;
a++;
console.log(a); // 5
a--;
console.log(a); // 4
```

So far, so obvious.
However, there are also some other things which have the `number` type.

One of them is `Infinity`.
`Infinity` is a special value that represents—well—mathematical infinity:

```js
console.log(typeof Infinity); // number
```

One way to arrive at `Infinity` in JavaScript is to divide something positive by `0`:

```js
console.log(1 / 0); // Infinity
```

Additionally, there is a special value called `NaN` (short for "not a number").
For example, the result of `0 / 0` is `NaN`:

```js
console.log(0 / 0); // NaN
```

Hilariously, `NaN` itself is a number (despite its name explicitly stating that it's _not_ a number):

```js
console.log(typeof NaN); // number
```

Don't let that confuse you.

> We will not debate whether decisions like `1/0` being equal to `Infinity`, `0/0` being equal to `NaN` or `NaN` having type `number` are good decisions.
> We simply note that this is the way JavaScript works and move on.
> Don't worry, there is in fact a lot of hot debate around some of JavaScripts more—shall we say—controversial features.
> If you wish to do so, you can go on any programming forum of your choice and start a local holy war by making fun of the way JavaScript's primitive data types work.
> Deciding whether that's a good use of time is up to you.

Another important thing about numbers is that you need to be careful when you are trying to perform operations with real numbers.
For example, if you add `0.1` and `0.2` you get a weird result:

```js
console.log(0.1 + 0.2); // 0.30000000000000004
```

This is not the fault of JavaScript, but instead has to do with the limitations of trying to represent numbers with a potentially infinite amount of digits on a finite hardware.

> We will not go into great detail in this book about this problem.
> If you're interested in more details we encourage you to have a look at the IEEE754 standard.

### Booleans

Another primitive type is the `boolean` type.
This allows you to represent values which are either `true` or `false`:

```js
const thisBookIsAwesome = true;
const thisBookSucks = false;
console.log(typeof thisBookIsAwesome); // boolean
console.log(typeof thisBookSucks); // boolean
```

You can do simple logic using the logical operators `&&` (which denotes **and**), `||` (which denotes **or**) and `!` (which denotes **not**).

The `&&` (_and_) operator takes two values and evaluates to `true` only if both values are `true`.
Otherwise, it evaluates to `false`:

```js
console.log(true && true); // true
console.log(false && true); // false
console.log(true && false); // false
console.log(false && false); // false
```

The `||` (_or_) operator takes two values and evaluates to `true` if _at least one_ of the values is `true`.
Otherwise, it evaluates to `false`:

```js
console.log(true || true); // true
console.log(false || true); // true
console.log(true || false); // true
console.log(false || false); // false
```

The `!` (_not_) operator takes a single value and simply negates it, i.e. "switches" a value to its opposite:

```js
console.log(!true); // false
console.log(!false); // true
```

Here is an example with all the operators together:

```js
const b1 = true;
const b2 = false;
console.log(b1 && b2); // false
console.log(b1 || b2); // true
console.log(!b1); // false
```

> Note that, technically, the logical operators can work with _any_ values (not just boolean values).
> The result of the logical operator application is then dependent on whether the values are _truthy_ or _falsy_.
> We will discuss this later.

A boolean variable usually occurs as the result of an expression.
Often it's the result of an expression containing the **strict equality operator** (`===`) which allows us to compare the values of variables:

```js
const x1 = 5;
const x2 = 10;
const x3 = 5;
console.log(x1 === x1); // true
console.log(x1 === x2); // false
console.log(x1 === x3); // true
```

> There is also another equality operator (`==`) which performs various type coercions before doing the equality comparison (for example, `0 == "0"` will be `true`).
> This operator can be best described as an April Fools' joke that somehow made it into the language.
> _Never use it_.

If you want to write _not equals_, you can use `!==`:

```js
console.log(5 !== 10); // true
console.log(5 !== 5); // false
```

Additionally, you can check if one value is less than or greater than another value using `<`, `<=`, `>` and `>=`.
These operators are most commonly used with numbers:

```js
console.log(2 < 3); // true
console.log(2 <= 3); // true
console.log(2 > 3); // false
console.log(2 >= 3); // false
```

### Strings

Another primitive data type is the `string` type.
A string is simply a sequence of characters and is used to represent text.
Strings are usually written using single quotes in JavaScript:

```js
const s = 'Some text';
console.log(typeof s); // string
```

> Note that it's also possible to write strings using double quotes, however in most projects strings are written using single quotes and we will stick to this convention.
> Nevertheless, we want to stress that there is absolutely nothing wrong to use double quotes.
> However, you should be consistent throughout your project—pick one style and stick to it.

The `+` operator works on strings and does concatenation:

```js
const s1 = 'Next.js ';
const s2 = 'book';
console.log(s1 + s2); // Next.js book
```

Note that instead of doing concatenation all the time you can also use **template strings** (also called template literals).
This allows writing JavaScript expressions directly inside strings.
Consider the following example:

```js
const s = 'World';
const greeting = `Hello, ${s}!`;
console.log(greeting); // Hello, World!
```

Template strings are written using backticks (_not_ single quotes).
They may contain so-called _placeholders_ which are expressions embedded inside `${...}`:

```js
console.log(`2 + 2 = ${2 + 2}`); // 2 + 2 = 4
```

> Technically, expressions inside template literals have to be "implicitly convertible to a string" because JavaScript has to convert any placeholder value to a string first.
> However, you will find that expressions not "implicitly convertible to a string" are rare indeed.

You can get the length (i.e. the number of characters) of a string like this:

```js
const s = 'MERN book';
console.log(s.length); // 9
```

Note that JavaScript does not have a special "character" data type (unlike Java for example).
Instead, characters are simply strings of length 1:

```js
const c = 'm';
console.log(typeof c); // string
```

There is much more to strings and we will return to them later.

> In fact, strings are a really complicated data type.
> We will omit most of these complications since they are not relevant to simple web applications.
> Nevertheless, you should keep in mind that you will not have a perfectly accurate understanding of strings by the end of this book.

### Undefined

Finally, there is one more primitive type that's of interest to us, namely `undefined`.
There is only one value of this type: `undefined`.

If a variable has the value `undefined`, this (quite logically) means that it hasn't been defined.
For example, whenever you have a variable that has been initialized, but not assigned to, it will automatically have the value and therefore the type `undefined`.

```js
let someVariable;
console.log(someVariable); // undefined
console.log(typeof someVariable); // undefined
```

You can also manually assign the `undefined` value to a variable:

```js
let someVariable = undefined;
console.log(someVariable); // undefined
console.log(typeof someVariable); // undefined
```

An important operator to know if you plan to work with `undefined` is the nullish coalescing operator `??`.
This operator takes two values and checks if the left-hand side is `undefined` (or `null`—a value that we will not pay much attention to).
If the left value is `undefined` (or `null`), the nullish coalescing operator evaluates the expression to the right-hand side, otherwise it returns the left-hand side:

```js
console.log(undefined ?? 1); // 1
console.log(0 ?? 1); // 0
```

The `??` operator is commonly used to provide useful default values.

> Note that `string`, `number`, `boolean` and `undefined` are not the only primitive data types.
> However, the other primitive data types will not be relevant for this book.
