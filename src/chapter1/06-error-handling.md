## Error Handling

<div style="text-align: right"> <i> A wise coder once said, 'An error ignored is like an ancestor forgotten – it will return with a vengeance.' <br> — Ancient Chinese proverb </i> </div>

### The `throw` Statement

The `throw` statement allows you to throw an exception:

```js
throw 'Something bad happened';
```

Usually error objects are thrown:

```js
throw new Error('Something bad happened');
```

> The `new` operator creates a new object (of some class).
> We will revisit this operator in more detail later.

### The `try...catch` Statement

The `try...catch` statement specifies a block of statements to execute "normally" and a block to execute if the "normal" block throws an exception.
The normal block is contained in a `try` block while the "exception" block is contained in a `catch` block.
If any statement in the `try` throws an exception, code execution jumps to the `catch` block immediately - the rest of the `try` block is ignored:

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
}
```

This will log:

```
try block
catch block
```

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
