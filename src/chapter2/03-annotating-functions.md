## Annotating Functions

<div style="text-align: right"> <i> The function without types is like a river without banks: boundless, yet directionless. <br> - Ancient Chinese proverb </i> </div>

### Annotating Parameters

We can annotate functions in TypeScript by annotating their parameters.
Consider a function `greet` that takes a parameter `name` of type `string` and simply logs a greeting to the console.
Here is how we would annotate the function:

```ts
function greet(name: string) {
  console.log(`Hello, ${name}`);
}
```

Now arguments to the function are checked:

```ts
greet(false);
// This will result in an error
```

You can also annotate functions if they take array and object by simply using the syntax you learned in the previous section:

```ts
function showTask(task: { id: number; summary: string; description: string }) {
  console.log(
    `Task with ID=${task.id} has the summary ${task.summary} and description ${task.description}`,
  );
}
```

This is not particularly readable, so normally we would use a type alias:

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

Note that TypeScript will not just check that the passed arguments have the correct types, but also check that the correct number of argument was passed.
This has an interesting side effect - namely that introducing the TypeScript compiler in a JavaScript codebase can already find potential bugs:

```js
function showTask(task) {
  console.log(
    `Task with ID=${task.id} has the summary ${task.summary} and description ${task.description}`,
  );
}

// Uh-oh, we are passing multiple variables instead of a single object!
showTask(1, 'Read the Next.js book', 'Read and understand the Next.js book.');
```

If we run `tsc` on this code, we will get the following error:

```
index.ts:8:13 - error TS2554: Expected 1 arguments, but got 3.

8 showTask(1, 'Read the Next.js book', 'Read and understand the Next.js book.');
```

TypeScript is useful indeed!

### Return Type Annotations

We can also type the return types of our functions:

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
In this case we can, but don't need to pass the corresponding argument to the function:

```ts
function getGreeting(name: string, message?: string): string {
  return `${message !== undefined ? message : 'Hello'}, ${name}`;
}

// These are both valid
getGreeting('John Doe', 'Welcome');
getGreeting('John Doe');
```
