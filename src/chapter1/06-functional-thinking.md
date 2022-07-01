## Functional thinking

<div style="text-align: right"> <i> Gold can't be pure, but functions can. <br> — Ancient Chinese proverb </i> </div>

### Pure functions

A function is called **pure** if its outputs (the returned values) depend only on its inputs and if the function does not have any *side effects* (i.e. it doesn't change program state and doesn't write anything to an external data source). 

Here is an example of a pure function:

```javascript
const square = x => x * 2;
```

Indeed, the output of `square` depends only on its input and nothing else. In addition, `square` doesn't produce any side effects.

Here is an example of a function that is *not* pure:

```javascript
const x = 2;
const addImpure = y => x + y;
```

The output of this function doesn't depend just on its input variables, but also on a global variable `x`.

Here is another function that's not pure:

```javascript
const hello = () => console.log("Hello, world!");
```

The `hello` function has a side effect - it outputs something to the console.

Why do we care about all of this? The fundamental reason is that *pure functions are very easy to reason about*. There is practically no room for suprising behaviour.

Consider the above `square` function. It takes an input and produces an output that is dependent *only on the input*. It doesn't matter what the rest of the program is doing - the function will always produce identical outputs for identical inputs.

> If you are mathematically inclined, pure functions are basically regular mathematical functions. They take an input which is a member of some domain and produce an output which is a member of some codomain. For example the `square` function is simply the function $f: S_1 \rightarrow S_2, f(x) = x^2$ where $S_1$ and $S_2$ are certain sets of numbers. Note that $S_1$ and $S_2$ are emphatically *not* equal to $\mathbb{R}$ since of course JavaScript cannot represent every possible real number (due to underlying hardware limitatations - computers can't possibly store arbitrarily large numbers).

All of the above is not true for the `addImpure` function. This function can produce *different* outputs for identical inputs. This makes it hard very hard to troubleshoot if there is an error. After all you may not know what the (global) state of the program was when the error occured.

Closely related is another very nice property of pure functions - they are *easily testable*. There is no need to fake dependencies or global state - as the function only takes an input and produces some output. Therefore all you need to do is to call the function, pass some input and check whether the output matches the expected output. We will return to this *extensively* when we cover testing.

### Immutability

A variable is **immutable** if it is unchangeable. Otherwise we call it **mutable**. The more mutability we have inside our program the more can go wrong since it's hard to reason about (global) state.

This is where the alert reader might interject - after all, isn't the purpose of a program to do something? And how can we achieve that if we don't change state?

A fundamental correction is in order here - the purpose of every program is not *to do something*, but to *manipulate data*. You can of course manipulate data directly by mutating global state.

Consider the following `task` object:

```javascript
const task = {
  id: 1,
  summary: 'Read the MERN book',
  description: 'Read and understand the MERN book.'
}
```

Now let's say we want to change the summary:

```javascript
task.summary = 'MERN book';
```

This works for simple objects and changes. But this will quickly become brittle with growing complexity. *Reasoning about state and state changes is really hard.*

Instead we can create copies of the objects which contain the changes we need:

```javascript
const newTask = {
  ...task,
  summary: 'MERN book'
}
```

Note that we didn't change the original object, but created a copy of the object with a different summary.

Immutability and pure functions are closely linked. You want to have immutable datastructures which get passed through pure functions to compute results.

### Higher-order functions

We already talked about the fact that JavaScript functions are just objects. We even showed an example of how you can assign a function to a variable:

```javascript
const square = num => num * num;
```

However we can do much more. Since functions are just objects we can pass them to other functions. For example let's define a function that repeats some action `n` times:

```javascript
function repeat(fun, n) {
  for (let i = 0; i < n; i++) {
    fun();
  }
}
```

We can use it like this:

```javascript
const hello = () => console.log("Hello, world!");
repeat(hello, 4);
```

This will output:

```
Hello, world!
Hello, world!
Hello, world!
Hello, world!
```

Note that the `repeat` function doesn't care what `fun` is - `fun` could be a simple `console.log` or a function which produces a simulated universe. All the `repeat` function does is it simply repeats `fun` the specified number of times.

Functions which take (or return) functions are called **higher-order functions**.

### The trinity of map, reduce and filter

We now introduce the three most important higher-order functions - `map`, `reduce` and `filter`. These functions allow you to perform an *incredibly* rich set of operations on arrays.

> We want to use this blockquote to emphasize *how often* you will be using `map`, `reduce` and `filter`. 

We will use two running examples throughout the section - an array of `numbers` and an array of `tasks`:

```javascript
const numbers = [1, 2, 3, 4];
const tasks = [
  {
    id: 1,
    summary: 'Read the MERN book',
    description: 'Read and understand the MERN book.',
    timeLogged: 60,
    status: 'In progress'
  },
  {
    id: 2,
    summary: 'Write a task app',
    description: 'Write an awesome task app.',
    timeLogged: 0,
    status: 'Todo'
  },
  {
    id: 3,
    summary: 'Think of a funny joke',
    description: 'Come up with a funny joke to lighten the mood.',
    timeLogged: 120,
    status: 'In progress'
  }
];
```

The `map` function takes one argument - a function `f` to apply to every element of the array. It returns the array resulting from applying `f` to every element of the original array.

Let's say we wanted to square all the elements of `numbers`. We could write something like this:

```javascript
const result = [];
for (const number in numbers) {
  result.push(number ** 2);
}
```

This is ugly and (you guessed it) *tedious*. Instead we can (and should) use the `map` function:

```javascript
const result = numbers.map(number => number ** 2);
```

The `result` array has the following content:

```javascript
[ 1, 4, 9, 16 ]
```

Consider another example. Let's say we wanted to add a long description to all the `tasks` based on the summary and the description. We can use the `map` function again:

```javascript
const longTasks = tasks.map(task => ({
  ...task,
  longDescription: `${task.summary}: ${task.description}`
}));
```

> You can see why the spread syntax is so handy. Thanks to this *incredible innovation*, you only need to explicitly specify the object parts where something interesting happens.

The `longTasks` array will look like this:

```javascript
[
  {
    id: 1,
    summary: 'Read the MERN book',
    description: 'Read and understand the MERN book.',
    timeLogged: 60,
    status: 'In progress',
    longDescription: 'Read the MERN book: Read and understand the MERN book.'
  },
  {
    id: 2,
    summary: 'Write a task app',
    description: 'Write an awesome task app.',
    timeLogged: 0,
    status: 'Todo',
    longDescription: 'Write a task app: Write an awesome task app.'
  },
  {
    id: 3,
    summary: 'Think of a funny joke',
    description: 'Come up with a funny joke to lighten the mood.',
    timeLogged: 120,
    status: 'In progress',
    longDescription: 'Think of a funny joke: Come up with a funny joke to lighten the mood.'
  }
]
```

The `filter` function allows you to select elements from an array based on some condition. It takes a function `f` which returns `true` or `false` for some input(s).

> A function which returns `true` or `false` is commonly referred to as a *predicate*.

For example let's say we want to select all even elements from `numbers`. Here is the non-functional way:

```javascript
const result = [];
for (const number in numbers) {
  if (number % 2 === 0) {
    result.push(number ** 2);
  }
}
```

Ugh! I don't even want to look at that. For loops and if statements all over the place. Let's rest our eyes and consider the *functional* approach:

```javascript
const result = numbers.filter(number => number % 2 === 0);
```

Consider another example - we might want to select all tasks from the `tasks` array which have the status 'Todo'. Think for a moment what the appropriate predicate would be.

That's right, it looks like this:

```javascript
const todoTasks = tasks.filter(task => task.status === 'Todo');
```

Finally there is the `reduce` function which (you guessed it) *reduces* an array to a single value. The `reduce` function moves over an array from left to right and keeps track of a *current value*. At every element of the array it recomputes the current value based on a function `f` (this is the first argument of the `reduce` function). The second argument of the reduce function is the initial value.

Here is how we might compute the sum of an array:

```javascript
const sum = numbers.reduce((num, curr) => num + curr, 0);
```

Let's say we would like to compute the total logged time (i.e. the time logged for all the tasks combined). This would look like this:

```javascript
const totalTime = tasks.reduce((task, curr) => task.loggedTime + curr, 0);
```

### Summary

You learned about important functional concepts like pure functions, immutability and higher-order functions. You also learned about the three most important higher-order functions - `map`, `filter` and `reduce`.

### Further reading

There is no further reading for this section.
