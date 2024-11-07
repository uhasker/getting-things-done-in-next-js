## Union Types

### Literal Types

A **literal type** is a type whose only value is a literal.
Here is how we could define a literal type `'Todo'`:

```ts
type TodoType = 'Todo';
```

Here is how we can use it:

```ts
let todo: TodoType = 'Todo';
```

Note that we can't assign any other value to `todo` including other strings.
For example this is not possible:

```ts
let todo: TodoType = 'Done';
// This will result in a type error
```

We could also skip declaring the type alias and just use the literal type directly:

```ts
let todo: 'Todo' = 'Todo';
```

It should be noted that if we declare a variable, then by default TypeScript will infer it as a `string`.
This makes sense since we could change the variable later:

```ts
let todo = 'Todo';
// Without the explicit type annotation, todo is a string
```

However if we declare a constant, then by default TypeScript will infer a literal type.
This also makes sense since we can't change the constant later:

```ts
const todo = 'Todo';
// Even without the explicit type annotation,
// todo now has the literal type 'Todo'
```

While literal types by themselves are not very helpful, they are extremely useful in the context of union types.

### Unions of Literal Types

A **union type** is a type that represents a value which may be one of multiple values.
Consider a type `TaskState` which represents one of the following states:

- Todo
- InProgress
- Done

Here is how we would define the `TaskState` type:

```ts
type TaskState = 'Todo' | 'InProgress' | 'Done';
```

The `TaskState` type is a union type and each of the literal types `'Todo'`, `'InProgress'` and `'Done'` is a member of the union.
A variable of type `TaskState` can only be of one of these literal types, i.e. it can only have one of the respective values.
For example these are all valid:

```ts
const state: TaskState = 'Todo';
const state2: TaskState = 'InProgress';
const state3: TaskState = 'Done';
```

But this is not:

```ts
const invalidState: TaskState = 'Dropped';
```

### Other Union Types

We can also declare unions of arbitrary types.
The general syntax for declaring a union type is `Type1 | Type2 | Type3 | ...` and a value of this union type can have the type `Type1` or `Type2` or `Type3` etc.
The various types `Type1`, `Type2`, `Type3` etc are called members of the union.

One particularly common union type is `T | undefined`, for example:

```ts
function getTaskId(taskName: string): string | undefined {
  // Implementation here
}
```

This function takes a `taskName` and returns the corresponding ID.
Because we might discover that no task with the given name is present, we return either a `string` or `undefined`.

### Working with a Union Type

It should be clear by now how we can define a union type, but how can we work with a union type?
Consider the following function:

```ts
function logTaskName(taskName: string | undefined) {
  console.log({
    taskName,
    taskNameLength: taskName.length,
  });
}
```

Compiling this example will result in the following error:

```
index.ts:4:21 - error TS18048: 'taskName' is possibly 'undefined'.
4     taskNameLength: taskName.length,
                      ~~~~~~~~
Found 1 error in index.ts:4
```

TypeScript will only allow to do something with the value of a union type if that something is valid for every member of the union.
Since `taskName` can be either a `string` or `undefined`, we can't access `.length` on it, because `.length` is not a valid property of `undefined`!

Instead we need to perform **type narrowing** where we _narrow_ the type of a variable with code.

Basically, TypeScript can look at our code and try to understand that in certain code parts a value of a union type can only have the type of a particular member of the union.

The simplest way of narrowing a type is **equality narrowing**.
Here we can use the `===` or `!==` operators to narrow a type.

Consider this example:

```ts
function logTaskName(taskName: string | undefined) {
  if (taskName !== undefined) {
    console.log({
      taskName,
      taskNameLength: taskName.length,
    });
  } else {
    console.log('the task is not defined');
  }
}
```

We narrow the type of `taskName` in the `taskName !== undefined` branch.
TypeScript will inspect our code and realize that since `taskName` had the `string | undefined` type and `taskName !== undefined` in the truthy branch of the if statement, `taskName` must be of type `string` inside that branch (there is simply no other way).
Similarly, in the falsy branch of the if statement (i.e. the `else` branch), TypeScript will know that `taskName` must be `undefined`.

This example also showcases a very important concept: The same variable can have a different type depending on the part of the code we are.
This is not the case in many other programming languages, where a variable will always have the same type once it has been initialized.

Another (similar) way of narrowing a type is **truthiness narrowing**.
Here we use the fact that certain values are truthy or falsy to narrow a type.

Consider this example:

```ts
function logTaskName(taskName: string | undefined | null) {
  if (taskName) {
    console.log({
      taskName,
      taskNameLength: taskName.length,
    });
  } else {
    console.log('the task is not defined');
  }
}
```

Since `undefined` and `null` are both falsy, the `taskName` in the truthy branch of the `if` statement can only have the type `string` and we can use the `.length` property.

However truthiness narrowing can lead to bugs and indeed the function `logTaskName` has a subtle error.
Can you spot it?

That's right - it doesn't correctly handle the case of the empty string - after all, the empty string `''` is also falsy, therefore `logTaskName("")` would print that the task not defined, which is probably not what we were going for.
We could fix the function like this:

```ts
function logTaskName(taskName: string | undefined | null) {
  if (taskName === '') {
    console.log('the task is empty');
  } else if (taskName) {
    console.log({
      taskName,
      taskNameLength: taskName.length,
    });
  } else {
    console.log('the task is not defined');
  }
}
```

You should generally be careful when relying on truthiness or falsiness.
The way these concepts work in JavaScript can be a bit confusing and it's easy to miss an edge case.

Some people prefer to avoid these concepts altogether and instead provide explicit checks, for example:

```ts
function logTaskName(taskName: string | undefined | null) {
  if (taskName !== undefined && taskName !== null) {
    console.log({
      taskName,
      taskNameLength: taskName.length,
    });
  } else {
    console.log('the task is not defined');
  }
}
```

The last way of narrowing a type that we will discuss here is `typeof` narrowing.
TypeScript knows how the `typeof` operator works and you can use it to narrow a type as you would expect:

```ts
function processInput(value: string | number): number {
  if (typeof value === 'string') {
    // value must be a string here
    return value.length;
  } else {
    // value must be a number here
    return value;
  }
}
```

### The Non-Null Assertion Operator

You can use the non-null assertion operator to tell TypeScript that a value is definitely not `undefined` or `null`:

```ts
let input: string | undefined = 'Some string';
let trimmedInput: string = input!.trim();
```

Just as with type assertions, you should use this _extremely sparingly_ and usually there is a better way.

### Type Predicates

We can write user-defined **type guards** by utilizing **type predicates**.
Consider the following example:

```ts
const array = ['Hello', undefined, 'World', undefined];
const filteredArray = array.filter((val) => val !== undefined);
```

Here `array` is a `(string | undefined)[]` and `filteredArray` removes the `undefined` elements.
However the inferred type of `filteredArray` would still be `(string | undefined)[]` because TypeScript can't easily inspect the contents of the filter function to realize that we remove the `undefined` elements.

We could theoretically use a type assertion here:

```ts
const array = ['Hello', undefined, 'World', undefined];
const filteredArray = array.filter((val) => val !== undefined) as string[];
```

However instead of yelling at the TypeScript compiler that we know better, we can choose a better way and write a user-defined type guard:

```ts
function isString(val: string | undefined): val is string {
  return typeof val === 'string';
}
```

The `isString` function is a type guard, because it's return type is the type predicate `val is string`.
Generally, a type predicate must have the form `parameter is Type` where `parameter` is the name of a parameter from the function signature.

We can use the type guard like this:

```ts
const array = ['Hello', undefined, 'World', undefined];
const filteredArray = array.filter(isString);
```

Now the inferred type of `filteredArray` will be `string[]` - and all that without using a single type assertion.
Hooray!

### Discriminated Unions

A particularly important union type is the **discriminated union**.
This is a union where a property is used to discriminate between union members.
Consider the following classical example:

```ts
type Square = {
  kind: 'square';
  size: number;
};

type Rectangle = {
  kind: 'rectangle';
  width: number;
  height: number;
};

type Shape = Square | Rectangle;
```

We can now narrow values of the discriminated union based on the **discriminant property** (which in this case is `kind`):

```ts
function getArea(shape: Shape) {
  if (shape.kind === 'square') {
    // Here shape must be of type Square
    return shape.size * shape.size;
  } else {
    // Here shape must be of type Rectangle
    return shape.width * shape.height;
  }
}
```
