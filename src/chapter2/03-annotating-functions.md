## Annotating Functions

<div style="text-align: right"> <i> The function without types is like a river without banks: boundless, yet directionless. <br> - Ancient Chinese proverb </i> </div>

### Annotating Parameters

We can annotate functions in TypeScript by annotating their parameters.
Consider a function `greet` that takes a parameter `name` of type `string` and simply outputs a greeting to the console.
Here is how we would annotate the function:

```ts
function greet(name: string) {
  console.log(`Hello, ${name}`);
}
```

Now arguments to the function are checked:

```ts
greet(false);
// This will result in a type error
```

You can annotate functions that expect arrays and/or objects by simply using the syntax you learned in the previous section:

```ts
function showTask(task: { id: number; summary: string; description: string }) {
  console.log(
    `Task with ID=${task.id} has the summary ${task.summary} and description ${task.description}`,
  );
}
```

This is not particularly readable.
Luckily, this is where type aliases come in really handy:

```ts
type Task = {
  id: number;
  summary: string;
  description: string;
};

function showTask(task: Task) {
  console.log(
    `Task with ID=${task.id} has the summary ${task.summary} and description ${task.description}`,
  );
}
```

Note that TypeScript will not just check that the passed arguments have the correct types, but also check that the correct number of arguments was passed.
This has an interesting side effect - introducing the TypeScript compiler in a JavaScript codebase can reveal bugs without any further work:

```js
function showTask(task) {
  console.log(
    `Task with ID=${task.id} has the summary ${task.summary} and description ${task.description}`,
  );
}

// Uh-oh, we are passing multiple variables instead of a single object!
showTask(1, 'Read the Next.js book', 'Read and understand the Next.js book.');
```

If we run `tsc --strict` on this code, we will get the following error:

```
index.ts:8:13 - error TS2554: Expected 1 arguments, but got 3.

8 showTask(1, 'Read the Next.js book', 'Read and understand the Next.js book.');
```

TypeScript is quite useful indeed!

### Return Type Annotations

We can also annotate the return types of our functions:

```ts
function getGreeting(name: string): string {
  return `Hello, ${name}`;
}
```

Note that you usually don't need a return type annotation because TypeScript can do type inference for them:

```ts
function getGreeting(name: string) {
  return `Hello, ${name}`;
}
```

Nevertheless, return types are often typed explicitly to avoid accidentally returning a type you didn't want to return or to prevent accidental changes to the return type.

### Optional Parameters

Similar to object properties, function parameters can be marked as _optional_.
In this case we can, but don't need to pass the corresponding argument to the function.
If a parameter is marked as optional, the corresponding argument might also be `undefined`:

```ts
function getGreeting(name: string, message?: string): string {
  return `${message !== undefined ? message : 'Hello'}, ${name}`;
}

// These are all valid
getGreeting('John Doe');
getGreeting('John Doe', undefined);
getGreeting('John Doe', 'Welcome');
```

### Function Type Expressions

Sometimes you need to create a type that specifies the function itself, instead of just its parameters or its return type.
For example, you might want to say that `f` is a function that takes two strings and returns a string.

You can achieve this with a **function type expression**:

```ts
let f: (x: string, y: string) => string;
```

The parameter names are required here, if you write `(string, string) => string` then TypeScript will think that you have a function with two parameters named `string` of type `any`.

This syntax is very useful for typing higher-order functions:

```ts
function getGreeting(name: string, greeter: (name: string) => string) {
  return greeter(name);
}

const myName = 'John Doe';
const greeter = (name: string) => `Hello ${name}`;

console.log(getGreeting(myName, greeter));
```

One interesting consequence of the way TypeScript inference works, is that parameters of functions can often be inferred.
Let's change this example and make an anonymous function out of `greeter`:

```ts
function getGreeting(name: string, greeter: (name: string) => string) {
  return greeter(name);
}

const myName = 'John Doe';

console.log(getGreeting(myName, (name) => `Hello ${name}`));
```

Note how we no longer need to explicitly specify the type of `name` in the anonymous function - TypeScript has automatically inferred it to be of type `string`.
