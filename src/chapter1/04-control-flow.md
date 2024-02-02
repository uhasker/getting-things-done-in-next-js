## Control Flow

<div style="text-align: right"> <i> Don't push the for loop, it flows by itself. <br> — Ancient Chinese proverb </i> </div>

### If Statements

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

Note that the condition does not necessary have to be boolean as JavaScript will automatically evaluate non-boolean values as "truthy" or "falsy" in boolean contexts.
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

You can think of the ternary operator as a short, compact way to write an `if ... else` statement.
It evaluates a condition, and if that condition is `true` (truthy), the result will have the value of the first expression.
If the condition is `false` (falsy), the result will have the value of the second expression.

There is a very common thing beginning programmers do with ternary operators which looks like this:

```js
const finished = tasks.length === 0 ? true : false;
```

You should stop for a second and think about why this is unnecessary.

_Thought_ about it?
That's right - the expression `tasks.length === 0` already evaluates to a boolean value.
You can just write

```js
const finished = tasks.length === 0;
```

### Optional chaining

Consider the following task object:

```js
const nextTask = {
  title: 'Read the Next.js book',
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
This could happen, for example, because the user didn't enter a task.

The object could look like this:

```js
const nextTask = {
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book',
};

// or like this if you were to use `null`
const nextTask = {
  title: 'Read the Next.js book',
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
const day = nextTask.date !== undefined ? nextTask.date.day : undefined;
```

Here is what this line does:
If `nextTask.date` is defined, then `nextTask.date.day` is assigned to `day`.
If `nextTask.date` is not defined, the `undefined` is assigned to `day`.

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

### The `switch` Statement

The `switch` statement evaluates an expression and then attempts to match the result against a number of `case` clauses.
As soon as `case` clause is matched all following statements are executed until a `break` statement is encountered.
If no case matches and a `default` statement is present, execution will jump to the code after the `default` statement:

```js
switch (tasks.length) {
  case 0:
    console.log('Hooray, you completed all your tasks!');
    break;
  case 1:
    console.log('Only one task left! Go! Go! Go!');
    break;
  case 2:
    console.log('You have two tasks to do.');
    break;
  case 3:
    console.log('There are three tasks left.');
    break;
  default:
    console.log('You still have some tasks to complete.');
}
```

Don't forget the `break` statements, otherwise _all the code after the matched case_ will be executed, which is rarely what you want.

### While Loops

You can use **loops** to repeat an action multiple times (usually depending on some condition).

The `while` loop allows you to execute a statement as long as a certain condition is true:

```js
let counter = 0;

while (counter < 3) {
  console.log(counter);
  counter += 1;
}
```

This will log the following lines to the console:

```
0
1
2
```

The `do...while` loop is similar to the `while` loop with one subtle difference.
The `while` loop evaluates the condition _before_ executing the statement.
The `do...while` loop on the other hand evaluates the condition _after_ executing the statement.

Consider this example:

```js
let counter = 0;

do {
  console.log(counter);
  counter++;
} while (counter < 3);
```

This will log the following lines to the console:

```
0
1
2
3
```

Because of the way the `do...while` loop works the statement(s) inside the loop body will always be executed at least once.
The following example will log `Hello` to the console once despite the condition being `false`:

```js
do {
  console.log('Hello');
} while (false);
```

### For Loops

The regular `for` loop consists of three expressions.

The first expression is the _initialization expression_ and typically initializes some kind of counter.
The second expression is the _condition expression_ and typically checks for some condition.
If the condition is true the statement(s) in the loop body execute, otherwise the loop terminates.
Finally the third expression (sometimes called _afterthough expression_) is evaluated at the end of each loop iteration and typically advances the counter.

Since a code sample says more than a thousand words here is an example:

```js
for (let i = 0; i < 3; i++) {
  console.log(i);
}
```

This will log the following lines to the console:

```
0
1
2
```

You can use regular `for` loops to iterate over arrays:

```js
const tasks = ['Task 1', 'Task 2', 'Task 3'];

for (let i = 0; i < tasks.length; i++) {
  console.log(tasks[i]);
}
```

This will log the following lines to the console:

```
Task 1
Task 2
Task 3
```

However we will soon learn better ways to perform array iteration.

### The `break` and `continue` Statements

The `break` statement gives you a tool to prematurely terminate a loop:

```js
let counter = 0;

while (counter < 4) {
  console.log(counter);
  counter += 1;

  if (counter === 2) {
    break;
  }
}
```

This will log the following lines to the console:

```
0
1
```

The `continue` statement terminates the rest of the current iteration and continues with the next iteration:

```js
let counter = 0;

while (counter < 4) {
  counter += 1;
  if (counter === 2) {
    continue;
  }

  console.log(counter);
}
```

This will log the following lines to the console:

```
1
3
4
```
