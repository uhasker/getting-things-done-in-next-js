## Error Handling

<div style="text-align: right"> <i> A wise coder once said, 'An error ignored is like an ancestor forgotten – it will return with a vengeance.' <br> — Ancient Chinese proverb </i> </div>

### The `throw` Statement

The `throw` statement allows you to throw an exception:

```js
throw 'Something bad happened';
```

You can theoretically `throw` any value.
However, you will usually throw `Error` objects:

```js
throw new Error('Something bad happened');
```

> Remember that the `new` operator creates a new object (of some class).

### The `try...catch` Statement

The `try...catch` statement specifies a block of statements to execute "normally" and a block to execute if the "normal" block throws an exception.
The normal block is contained in a `try` block while the "exception" block is contained in a `catch` block.
If any statement in the `try` block throws an exception, code execution jumps to the `catch` block immediately—the rest of the `try` block is ignored:

```js
function divide(x, y) {
  if (y === 0) {
    throw new Error('Division by 0 is a bad idea');
  }

  return x / y;
}

try {
  console.log('try block');
  console.log(divide(3, 0));
} catch (e) {
  console.log('catch block');
}
```

This will log:

```
try block
catch block
```

Note that if the `try` block doesn't throw an exception, the `catch` block is never executed.

Consider this example:

```js
function divide(x, y) {
  if (y === 0) {
    throw new Error('Division by 0 is a bad idea');
  }

  return x / y;
}

try {
  console.log('try block');
  console.log(divide(3, 1));
} catch (e) {
  console.log('catch block');
}
```

This will log:

```
try block
3
```

### The `finally` Block

The `finally` block is an optional block that can be used after `catch` if some cleanup code should always run after the `try` block:

```js
function divide(x, y) {
  if (y === 0) {
    throw new Error('Division by 0 is a bad idea');
  }

  return x / y;
}

try {
  console.log('try block');
  console.log(divide(3, 0));
} catch (e) {
  console.log('catch block');
} finally {
  console.log('finally block');
}
```

This will output:

```
try block
catch block
finally block
```

The `finally` block will become useful once we write more complex code that performs resource management and we need to perform cleanup of a resource regardless of whether an exception is thrown or not.

### Error Objects

Error objects have a `name` and a `message` property which can be used to gather information when an error is thrown:

```js
function divide(x, y) {
  if (y === 0) {
    throw new Error('Division by 0 is a bad idea');
  }
}

try {
  console.log('try block');
  divide(3, 0);
} catch (e) {
  console.log('catch block');
  console.log(e.name);
  console.log(e.message);
}
```

This will log:

```
try block
catch block
Error
Division by 0 is a bad idea
```
