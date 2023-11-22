## Functional Thinking

<div style="text-align: right"> <i> Gold can't be pure, but functions can. <br> — Ancient Chinese proverb </i> </div>

### Pure Functions

A function is called **pure** if its outputs (the returned values) depend only on its inputs and if the function does not have any _side effects_ (i.e. it doesn't change program state and doesn't write anything to an external data source).

Here is an example of a pure function:

```js
const square = (x) => x * 2;
```

Indeed, the output of `square` depends only on its input and nothing else.
In addition, `square` doesn't produce any side effects.

Here is an example of a function that is _not_ pure:

```js
const x = 2;
const addImpure = (y) => x + y;
```

The output of this function doesn't depend just on its input variables, but also on a global variable `x`.

Here is another function that's not pure:

```js
const hello = () => console.log('Hello, world!');
```

The `hello` function has a side effect - it outputs something to the console.

Why do we care about all of this?
The fundamental reason is that _pure functions are very easy to reason about_.
There is practically no room for suprising behaviour.

Consider the above `square` function.
It takes an input and produces an output that is dependent _only on the input_.
It doesn't matter what the rest of the program is doing - the function will always produce identical outputs for identical inputs.

> If you are mathematically inclined, pure functions are basically regular mathematical functions.
> They take an input which is a member of some domain and produce an output which is a member of some codomain.
> For example the `square` function is simply the function f: A → B, f(x) = x² where A and B are certain sets of numbers.
> Note that A and B are emphatically _not_ equal to the set of real numbers since of course JavaScript cannot represent every possible real number (due to underlying hardware limitatations - computers can't possibly store arbitrarily large numbers).

All of the above is not true for the `addImpure` function.
This function can produce _different_ outputs for identical inputs.
This makes it hard very hard to troubleshoot if there is an error.
After all you may not know what the (global) state of the program was when the error occured.

Closely related is another very nice property of pure functions - they are _easily testable_.
There is no need to fake some global state - as the function only takes an input and produces some output.
Therefore all you need to do is to call the function, pass some input and check whether the output matches the expected output.
We will return to this _extensively_ when we cover testing.

### Immutability

A variable is **immutable** if it is unchangeable.
Otherwise we call it **mutable**.
The more mutability we have inside our program the more can go wrong since it's hard to reason about (global) state.

This is where the alert reader might interject - after all, isn't the purpose of a program to do something?
And how can we achieve that if we don't change state?

A fundamental correction is in order here - the purpose of every program is not _to do something_, but to _manipulate data_.
You can of course manipulate data directly by mutating global state.

Consider the following `task` object:

```js
const task = {
  id: 1,
  summary: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
};
```

Now let's say we want to change the summary:

```js
task.summary = 'Next.js book';
```

This works for simple objects and changes.
But this will quickly become brittle with growing complexity.
_Reasoning about state and state changes is really hard._

Instead we can create copies of the objects which contain the changes we need:

```js
const newTask = {
  ...task,
  summary: 'Next.js book',
};
```

Note that we didn't change the original object, but created a copy of the object with a different summary.

Immutability and pure functions are closely linked.
You want to have immutable datastructures which get passed through pure functions to compute results.

### Higher-order functions

We already talked about the fact that JavaScript functions are just objects.
We even showed an example of how you can assign a function to a variable:

```js
const square = (num) => num * num;
```

However we can do much more. Since functions are just objects we can _pass them to other functions_.
For example let's define a function that repeats some action `n` times:

```js
function repeat(fun, n) {
  for (let i = 0; i < n; i++) {
    fun();
  }
}
```

We can use it like this:

```js
const hello = () => console.log('Hello, world!');
repeat(hello, 4);
```

This will output:

```
Hello, world!
Hello, world!
Hello, world!
Hello, world!
```

Note that the `repeat` function doesn't care what `fun` is - `fun` could be a simple `console.log` or a function which produces a simulated universe.
All the `repeat` function does is to simply repeat `fun` the specified number of times.

Functions which take (or return) functions are called **higher-order functions**.

### The trinity of map, reduce and filter

We now introduce the three most important higher-order functions - `map`, `reduce` and `filter`.
These functions allow you to perform an _incredibly_ rich set of operations on arrays.

> We want to use this blockquote to emphasize _how often_ you will be using `map`, `reduce` and `filter`.

We will use two running examples throughout the section - an array of `numbers` and an array of `tasks`:

```js
const numbers = [1, 2, 3, 4];
const tasks = [
  {
    id: 1,
    summary: 'Read the Next.js book',
    description: 'Read and understand the Next.js book.',
    timeLogged: 60,
    status: 'In progress',
  },
  {
    id: 2,
    summary: 'Write a task app',
    description: 'Write an awesome task app.',
    timeLogged: 0,
    status: 'Todo',
  },
  {
    id: 3,
    summary: 'Think of a funny joke',
    description: 'Come up with a funny joke to lighten the mood.',
    timeLogged: 120,
    status: 'In progress',
  },
];
```

The `map` function takes one argument - a function `f` to apply to every element of the array.
It returns the array resulting from applying `f` to every element of the original array.

Let's say we wanted to square all the elements of `numbers`.
We could write something like this:

```js
const result = [];
for (const number in numbers) {
  result.push(number ** 2);
}
```

This is ugly and (you guessed it) _tedious_.
Instead we can (and should) use the `map` function:

```js
const result = numbers.map((number) => number ** 2);
```

The `result` array has the following content:

```js
[1, 4, 9, 16];
```

Consider another example.
Let's say we wanted to add a long description to all the `tasks` based on the summary and the description.
We can use the `map` function again:

```js
const longTasks = tasks.map((task) => ({
  ...task,
  longDescription: `${task.summary}: ${task.description}`,
}));
```

> You can see why the spread syntax is so handy.
> Thanks to this _incredible innovation_, you only need to explicitly specify the object parts where something interesting happens.

The `longTasks` array will look like this:

```js
[
  {
    id: 1,
    summary: 'Read the Next.js book',
    description: 'Read and understand the Next.js book.',
    timeLogged: 60,
    status: 'In progress',
    longDescription: 'Read the Next.js book: Read and understand the Next.js book.',
  },
  {
    id: 2,
    summary: 'Write a task app',
    description: 'Write an awesome task app.',
    timeLogged: 0,
    status: 'Todo',
    longDescription: 'Write a task app: Write an awesome task app.',
  },
  {
    id: 3,
    summary: 'Think of a funny joke',
    description: 'Come up with a funny joke to lighten the mood.',
    timeLogged: 120,
    status: 'In progress',
    longDescription: 'Think of a funny joke: Come up with a funny joke to lighten the mood.',
  },
];
```

The `filter` function allows you to select elements from an array based on some condition.
It takes a function `f` which returns `true` or `false` for some input(s).
All elements for which `f` returns `true` are kept, all elements for which `f` returns `false` are thrown away.

> A function which returns `true` or `false` is commonly referred to as a _predicate_.

For example let's say we want to select all even elements from `numbers`.
Here is the non-functional way:

```js
const result = [];
for (const number in numbers) {
  if (number % 2 === 0) {
    result.push(number ** 2);
  }
}
```

Ugh!
I don't even want to look at that.
For loops and if statements all over the place.
Let's rest our eyes and consider the _functional_ approach:

```js
const result = numbers.filter((number) => number % 2 === 0);
```

Consider another example - we might want to select all tasks from the `tasks` array which have the status 'Todo'.
Think for a moment what the appropriate predicate would be.

That's right, it looks like this:

```js
const todoTasks = tasks.filter((task) => task.status === 'Todo');
```

Finally there is the `reduce` function which (you guessed it) _reduces_ an array to a single value.
The `reduce` function moves over an array from left to right and keeps track of a value (a so called _accumulator_).
At every element of the array it recomputes the accumulator based on a function `f` (this function `f` is the first argument of the `reduce` function).
The second argument of the reduce function is the initial value.

Here is how we might compute the sum of an array:

```js
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
```

Basically this is what happens:
The `reduce` function looks at `acc` (which is the initial value, i.e. `0` at the beginning) and `curr` (which is `1`), produces `acc + curr`, and sets this as the new accumulator (i.e. the new accumulator is `1`).
Next the `reduce` function again looks at `acc` (which is now `1`) and `curr` (which is `2`), produces `acc + curr`, and sets this as the new accumulator (i.e. the new accumulator is `3`).
The next update results in the accumulator being `6` and the final update result in the accumulator being `10`.
Therefore `sum` will be `10`.

For another example, let's say we would like to compute the total logged time (i.e. the time logged for all the tasks combined).
This would look like this:

```js
const totalTime = tasks.reduce((task, curr) => task + curr.loggedTime, 0);
```

> We recommend that you try to reason through this `reduce` for a deeper understanding of this topic.

### Summary

You learned about important functional concepts like pure functions, immutability and higher-order functions.
You also learned about the three most important higher-order functions - `map`, `filter` and `reduce`.

### Further reading

There is no further reading for this section.
