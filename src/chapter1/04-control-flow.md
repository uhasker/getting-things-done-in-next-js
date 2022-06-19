## Control flow

<div style="text-align: right"> <i> Don't push the for loop, it flows by itself. <br> — Anchient Chinese proverb </i> </div>

### If statements

Quite often, we need to make *decisions* in our programs. Let's say we want to display a fancy message when a bunch of tasks are completed. This is a decision: *If* all the tasks are completed, *then* we want to display a message. Put generally: *If* a condition holds (is true), *then* we want to do something.

Conveniently, the language keyword that allows us to accomplish this is called `if`:

```javascript
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

```javascript
if (condition) {
  statements
}
```

If `condition` is true, then the `statements` inside the curly braces will be executed. If `condition` is false, nothing will happens.

> Note that technically it suffices if the condition is *truthy* or *falsy*. We will ignore this detail for now and return to it in a second.

The simplest condition is a boolean variable. However, nothing prevents us from writing more complex conditions. For example, let's say we have a list of uncompleted tasks (conveniently) named `tasks`. Then we could check that all tasks have been completed by checking whether `tasks` is empty (i.e. the length of `tasks` is zero):

```javascript
if (tasks.length === 0) {
  console.log('Hooray, you completed all your tasks!');
}
```

Sometimes you need to do something in one case and something else in another case. The (also conveniently named) `else` keyword allows you to accomplish exactly that. Let's say that if all the tasks haven't been completed yet, we want to display a different message:

```javascript
if (tasks.length === 0) {
  console.log('Hooray, you completed all your tasks!');
} else {
  console.log('You still have some tasks to complete.');
}
```

The general form of an `if...else` statement looks like this:

```javascript
if (condition) {
  statements1
} else {
  statements2
}
```

If `condition` is true, the statements corresponding to `statements1` will be executed (i.e. the statements inside the curly braces after the `if`). If `condition` is false, the statements corresponding to `statements2` will be executed (i.e. the statements inside the curly braces after the `else`).

Also note that there may be multiple statements between the curly braces. This is totally valid:

```javascript
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

Sometimes you need to handle more than two cases. Since JavaScript was fresh out of keywords at this point, they allowed you to do so using `else if`:

```javascript
if (tasks.length === 0) {
  console.log('Hooray, you completed all your tasks!');
} else if (tasks.length === 1) {
  console.log('Only one task left! Go! Go! Go!');
} else {
  console.log('You still have some tasks to complete.');
}
```

The general form of an `if...else if...else` statement looks like this:

```javascript
if (condition1) {
  statements1
} else if (condition2) {
  statements2
} /*possibly more else ifs*/ else if (conditionN) {
  statementsN
} else {
  statementsElse
}
```

Here all the conditions will be checked one after another. As soon as a condition is true, the corresponding statements will be executed. If no condition matches, the statements corresponding to `statementsElse` will be executed.

You can have any number of `else if` statements. For example this is valid:

```javascript
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

Note that the `else` block is not required. If it's missing an none of the conditions is true, nothing will happen.

### Truthiness and falsiness

Note that the condition does not necessary have to be boolean as JavaScript will automatically convert non-boolean values to booleans. For example you could write something like this:

```javascript
if (1) {
  console.log('1 is truthy.');
} else {
  console.log('1 is falsy.');
}
```

This will print "1 is truthy." because JavaScript will consider `1` to be `true` in this context since `1` is a *truthy* value.

Generally speaking, a **truthy** value is considered to be true when encountered in a boolean context (like a condition). A **falsy** value is considered to be false when encountered in a boolean context. The most important falsy values are `false`, `0`, `''` (empty string), `null` and `undefined`. Most other values (like `1`, `[]` (empty array), `[3]`, `{ example: 'hello' }` etc) are truthy.

Try to *avoid using non-boolean values in boolean contexts* as it can lead to surprising behaviour. Nevertheless it's still useful to know about truthiness and falsiness, as it will otherwise trip you up in certain cases.

### Ternary operator

The **ternary operator** takes a *condition*, an *expression to execute if the condition is truthy* and an *expression to execute if the condition is falsy*. It looks like this:

```javascript
const doneMsg = 'All tasks are done';
const notDoneMsg = 'There are tasks left';
const msg = done ? doneMsg : notDoneMsg;
```

The general form is:

```javascript
condition ? expression1 : expression2;
```

There is a very common thing complete beginners do with ternary operators which looks like this:

```javascript
const finished = tasks.length === 0 ? true : false;
```

You should stop for a second a think about why this is unneccessary.

*Thought* about it? That's right. You can just write

```javascript
const finished = tasks.length === 0;
```

Note that you cannot write arbitrary statements inside a ternary operator (and it wouldn't make a lot of sense anyway).

### Optional chaining

Consider the following task object:

```javascript
const mernTask = {
  summary: 'Read the MERN book',
  description: 'Read and understand the MERN book',
  date: {
    day: 8,
    month: 6,
    year: 2022,
  },
};
```

Let's say we want to access the day of the task. We can do this by using `mernTask.date.day`. But what if the day does not have to be present, i.e. is *optional*? This could e.g. happen because the user didn't enter a task.

The object could look like this:

```javascript
const mernTask = {
  summary: 'Read the MERN book',
  description: 'Read and understand the MERN book',
};

// or like this if you were to use `null`
const mernTask = {
  summary: 'Read the MERN book',
  description: 'Read and understand the MERN book',
  date: null,
};
```

Then `mernTask.date.day` will fail with

```
Uncaught TypeError: Cannot read properties of undefined (reading 'day')
```

This makes sense since `mernTask.date` will result in `undefined` and you can't access a property on `undefined`. But let's say we would like to access the day and setting it to `undefined` if the `date` property is not present. Then we would need to do something like the following:

```javascript
const day = typeof mernTask.date !== undefined && mernTask.date !== null ? mernTask.date.day : undefined;
```

Alternatively we could make use of `&&` and write:

```javascript
const day = mernTask.date && mernTask.date.day;
```

Generally consider an object that has a bunch of values that may be absent (i.e. `null` or `undefined`). Working with such value will be annoying and only grow more cumbersome with deeper nesting. To avoid all this JavaScript allows you to do **optional chaining**. This works by writing `?.` instead of `.` when trying to work on something that may be undefined. The above line would then become:

```javascript
const day = mernTask.date?.day;
```

Now the result will be `undefined` instead of giving you a TypeError.

### For..of loops

`For..of` loops allow you to *iterate over arrays and strings* (and some other things that we will cover later on) and perform a task for each element / character. Let's say you want to print all tasks from a list named `tasks`. You could do it like this:

```javascript
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

```javascript
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

```javascript
for (let variable of arrayOrString) {
  statements
}
```

It should be noted that you if don't change the variable inside the loop, you can and should also declare it as `const`. Our first example could therefore be rewritten to

```javascript
const tasks = ['Task 1', 'Task 2', 'Task 3'];
for (const task of tasks) {
  console.log(task);
}
```

> There are also a bunch of other loops. We will cover them later. This is because you don't need them nearly as often as some people think.

### Summary

You learned how to make decisions using `if` statements, `if...else` statements, `if...else if...else` statements and the ternary operator. You also learned how to address missing properties using *optional chaining*. Finally you learned how to iterate over strings and arrays using the `for...of` loop.

### Further reading

* [JavaScript Guide - Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
