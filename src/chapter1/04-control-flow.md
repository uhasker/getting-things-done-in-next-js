## Control flow

<div style="text-align: right"> <i> Don't push the for loop, it flows by itself. <br> — Ancient Chinese proverb </i> </div>

### If statements

Quite often, we need to make _decisions_ in our programs.
Let's say we want to display a fancy message when a bunch of tasks are completed.
This is a decision: _If_ all the tasks are completed, _then_ we want to display a message.
Put generally: _If_ a condition holds (is true), _then_ we want to do something.

Conveniently, the language keyword that allows us to accomplish this is called `if`:

```js
const completed = true;
if (completed) {
  console.log('Hooray, you completed all your tasks!');
}
```

This would print:

```
Hooray, you completed all your tasks!
```

The general form of an `if` statement looks like this:

```js
if (condition) {
  statements;
}
```

If `condition` is true, then the `statements` inside the curly braces will be executed.
If `condition` is false, nothing will happen.

> Note that technically it suffices if the condition is _truthy_ or _falsy_. We will ignore this detail for now and return to it in a second.

The simplest condition is a boolean variable.
However, nothing prevents us from writing more complex conditions.
For example, let's say we have a list of uncompleted tasks (conveniently) named `tasks`.
Then we could check that all tasks have been completed by checking whether `tasks` is empty (i.e. the length of `tasks` is zero):

```js
if (tasks.length === 0) {
  console.log('Hooray, you completed all your tasks!');
}
```

Sometimes you need to do something in one case and something else in another case.
The (also conveniently named) `else` keyword allows you to accomplish exactly that.
Let's say that if all the tasks haven't been completed yet, we want to display a different message:

```js
if (tasks.length === 0) {
  console.log('Hooray, you completed all your tasks!');
} else {
  console.log('You still have some tasks to complete.');
}
```

The general form of an `if...else` statement looks like this:

```js
if (condition) {
  block1;
} else {
  block2;
}
```

If `condition` is true, the statements corresponding to `block1` will be executed (i.e. the statements inside the curly braces after the `if`).
If `condition` is false, the statements corresponding to `block2` will be executed (i.e. the statements inside the curly braces after the `else`).

Note that there may be multiple statements between the curly braces.
This is totally valid:

```js
if (tasks.length === 0) {
  console.log('Hooray, you completed all your tasks!');
  console.log('Congratulations!');
  console.log('No really, you are amazing!');
} else {
  console.log('You still have some tasks to complete.');
  console.log('Do not despair!');
}
```

Assuming `tasks` has a `length` of `0` this will print:

```
Hooray, you completed all your tasks!
Congratulations!
No really, you are amazing!
```

Sometimes you need to handle more than two cases.
Since JavaScript was fresh out of keywords at this point, they allowed you to do so using `else if`:

```js
if (tasks.length === 0) {
  console.log('Hooray, you completed all your tasks!');
} else if (tasks.length === 1) {
  console.log('Only one task left! Go! Go! Go!');
} else {
  console.log('You still have some tasks to complete.');
}
```

The general form of an `if...else if...else` statement looks like this:

```js
if (condition1) {
  block1;
} else if (condition2) {
  block2;
} /*possibly more else ifs*/ else if (conditionN) {
  blockN;
} else {
  blockElse;
}
```

Here all the conditions will be checked one after another.
As soon as a condition is true, the corresponding statements will be executed.
If no condition matches, the statements corresponding to `statementsElse` will be executed.

You can have any number of `else if` statements.
For example, this is valid:

```js
if (tasks.length === 0) {
  console.log('Hooray, you completed all your tasks!');
} else if (tasks.length === 1) {
  console.log('Only one task left! Go! Go! Go!');
} else if (tasks.length === 2) {
  console.log('You have two tasks to do.');
} else if (tasks.length === 3) {
  console.log('There are three tasks left.');
} else {
  console.log('You still have some tasks to complete.');
}
```

Note that the `else` block is not required.
If it's missing and none of the conditions are true, nothing will happen.

### Truthiness and falsiness

Note that the condition does not necessary have to be boolean as JavaScript will automatically convert non-boolean values to booleans.
For example you could write something like this:

```js
if (1) {
  console.log('1 is truthy.');
} else {
  console.log('1 is falsy.');
}
```

This will print "1 is truthy." because JavaScript will consider `1` to be `true` in this context since `1` is a _truthy_ value.

Generally speaking, a **truthy** value is considered to be true when encountered in a boolean context (like a condition).
A **falsy** value is considered to be false when encountered in a boolean context.
The most important falsy values are `false`, `0`, `''` (empty string), `null` and `undefined`.
Most other values (like `1`, `[]` (empty array), `[3]`, `{ example: 'hello' }` etc) are truthy.

Try to _avoid using non-boolean values in boolean contexts_ as it can lead to surprising behaviour.
Nevertheless it's still useful to know about truthiness and falsiness, as it will otherwise trip you up in certain cases.

### Ternary operator

The **ternary operator** takes a _condition_, an _expression to execute if the condition is truthy_ and an _expression to execute if the condition is falsy_.
It looks like this:

```js
const doneMsg = 'All tasks are done';
const notDoneMsg = 'There are tasks left';
const msg = done ? doneMsg : notDoneMsg;
```

The general form is:

```js
condition ? expression1 : expression2;
```

There is a very common thing complete beginners do with ternary operators which looks like this:

```js
const finished = tasks.length === 0 ? true : false;
```

You should stop for a second a think about why this is unneccessary.

_Thought_ about it? That's right. You can just write

```js
const finished = tasks.length === 0;
```

Note that you cannot write arbitrary statements inside a ternary operator (and it wouldn't make a lot of sense anyway).

### Optional chaining

Consider the following task object:

```js
const nextTask = {
  summary: 'Read the Next.js book',
  description: 'Read and understand the Next.js book',
  date: {
    day: 8,
    month: 6,
    year: 2022,
  },
};
```

Let's say we want to access the day of the task.
We can do this by using `nextTask.date.day`.
But what if the day does not have to be present, i.e. is _optional_?
This could e.g. happen because the user didn't enter a task.

The object could look like this:

```js
const nextTask = {
  summary: 'Read the Next.js book',
  description: 'Read and understand the Next.js book',
};

// or like this if you were to use `null`
const nextTask = {
  summary: 'Read the Next.js book',
  description: 'Read and understand the Next.js book',
  date: null,
};
```

Then `nextTask.date.day` will fail with

```
Uncaught TypeError: Cannot read properties of undefined (reading 'day')
```

This makes sense since `nextTask.date` will result in `undefined` and you can't access a property on `undefined`.
But let's say we would like to access the day and set it to `undefined` if the `date` property is not present.
Then we would need to do something like the following:

```js
const day =
  typeof nextTask.date !== undefined && nextTask.date !== null ? nextTask.date.day : undefined;
```

Alternatively we could make use of `&&` and write:

```js
const day = nextTask.date && nextTask.date.day;
```

> This is correct because of the way the `&&` works.
> If the first expression is `false` (or falsy) then `&&` doesn't look at the second expression and immediately returns the value of the first expression.
> If the first expression is `true` (or truthy) then `&&` returns the second expression.

Generally consider an object that has a bunch of values that may be absent (i.e. `null` or `undefined`).
Working with such values will be annoying and only grow more cumbersome with deeper nesting.
To avoid all this JavaScript allows you to do **optional chaining**.
This works by writing `?.` instead of `.` when trying to work on something that may be `undefined`.
The above line would then become:

```js
const day = nextTask.date?.day;
```

Now the result will be `undefined` instead of giving you a TypeError.

### For..of loops

`For..of` loops allow you to _iterate over arrays and strings_ (and some other things that we will cover later on) and perform a task for each element / character.
Let's say you want to print all tasks from a list named `tasks`.
You could do it like this:

```js
const tasks = ['Task 1', 'Task 2', 'Task 3'];
for (let task of tasks) {
  console.log(task);
}
```

This would print

```
Task 1
Task 2
Task 3
```

As we already mentioned, you can use a `for..of` loop to iterate over a string:

```js
const str = 'Task';
for (let char of str) {
  console.log(char);
}
```

This would print each charachter of the string, i.e.:

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
Our first example could therefore be rewritten to

```js
const tasks = ['Task 1', 'Task 2', 'Task 3'];
for (const task of tasks) {
  console.log(task);
}
```

> There are also a bunch of other loops that we will cover later.
> This is because you don't need them nearly as often as some people think.

### Summary

You learned how to make decisions using `if` statements, `if...else` statements, `if...else if...else` statements and the ternary operator.
You also learned how to address missing properties using _optional chaining_.
Finally you learned how to iterate over strings and arrays using the `for...of` loop.

### Further reading

- [JavaScript Guide - Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
