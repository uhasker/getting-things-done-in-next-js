## Union Types

### Literal Types

A literal type is a type whose only value is a literal.
Here is how we could define a literal type `"Todo"`:

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
```

We could also skip declaring the type alias and just use the literal type directly:

```ts
let todo: 'Todo' = 'Todo';
```

While literal types by themselves are not very useful, they are extremely useful in the context of union types.

### Unions of Literal Types

A union type is a type that represents a value which may be one of multiple values.
Consider the type `TaskState` which represents one of the following states:

- Todo
- InProgress
- Done

Here is how we would defined the `TaskState` type:

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
One particulary useful union type is `T | undefined`, for example:

```ts
function getTaskId(taskName: string): string | undefined {
  // Implementation here
}
```

This function takes a `taskName` and returns the corresponding ID.
However since it might be the case that no task with the given name is present, we return either a `string` or `undefined`.

### Working with a Union Type

It's relatively clear how to define a union type, but how can we work with a union type?
Consider the following function:

```ts
function logTaskName(taskName: string | undefined) {
  console.log({
    taskName,
    taskNameLength: taskName.length,
  });
}
```

This will result in the following error:

```
index.ts:4:21 - error TS18048: 'taskName' is possibly 'undefined'.
4     taskNameLength: taskName.length,
                      ~~~~~~~~
Found 1 error in index.ts:4
```

TypeScript will only allow to do something with the value of a union type if that something is valid for every member of the union.
Since `taskName` can be either a `string` or `undefined`, we can't call `.length` on it!

Instead we need to _narrow_ the type:

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
TypeScript can inspect the control flow and realize that since `taskName` had the `string | undefined` type and `taskName !== undefined` in the truthy branch of the if statement, `taskName` must be of type `string` inside that branch.

Narrowing can be done by using `typeof`, checking truthiness of values or with equality checks `x === y`.

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
    return shape.size * shape.size;
  } else {
    return shape.width * shape.height;
  }
}
```
