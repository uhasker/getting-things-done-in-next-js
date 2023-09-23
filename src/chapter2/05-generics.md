## Generics

<div style="text-align: right"> <i> Generics are the invisible hat of the TypeScript sage, fitting the heads of both the giant and the dwarf. <br> - Ancient Chinese proverb </i> </div>

### Why Generics?

Generics allow us to write code that is independent of specific types.
Consider the example of retrieving the first element of an array:

```js
function getFirstElement(arr) {
  return arr[0];
}
```

How would we type this?
We could use `any`:

```ts
function getFirstElement(arr: any): any {
  return arr[0];
}
```

However using `any` is bad since we lose all the type information even if we pass in an array of a known type.

We could also make use of _function overloads_ and write something like this:

```ts
function getFirstElement(arr: number[]): number;
function getFirstElement(arr: string[]): string;
function getFirstElement(arr: undefined[]): undefined;
// More overloads and implementation here
```

But this obviously gets very tedious and error-prone the more we do it.
Instead TypeScript allows us to use _generics_ to specify that we don't really care about a type.

### Generic Functions

Consider the identity function that simply takes an argument `arg` and returns it unchanged.
We can use a type variable `Type` and type it like this:

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
```

This basically says that the `identity` function takes an argument of type `Type` and that its return type is of the same type as the argument.
Now we get proper type inference:

```ts
let val = 'Hello, world!';
let val2 = identity<string>(val); // val2 is of type string
```

We dont actually have to manually specify the type `string` when calling the function and can instead rely on TypeScripts inference:

```ts
let val = 'Hello, world!';
let val2 = identity(val); // val2 is of type string
```

> There is no single convention for naming type parameters.
> Common names includew `T`, `Type` and `TType`.

### Generic Object Types

Just like with functions, we can use type parameters with objects:

```ts
type Box<Type> = {
  content: Type;
};
```

Now we can use the `Box` type with any type:

```ts
// box has the type Box<number>
const box = {
  content: 0,
};

// box2 has the type Box<string>
const box2 = {
  content: 'Hello, world!',
};
```

### Important Builtin Generics

Generic object types can function as versatile containers, unaffected by the specific types of items they hold.
Such flexibility in data structures is preferred, allowing them to be applied across various data kinds.

Examples of generic object types are:

- `Array<Type>`
- `Map<Key, Value>`
- `Set<Type>`
- `Record<Key, Value>`

One other very important generic type is the `Promise` type which can be used to annotate asynchronous functions.
For example, if we have an asynchronous function `f` that returns a promise with a string, we would annotate it like this:

```ts
async function f(): Promise<string> {
  // Implementation here
}
```

### Generic Constraints

Often, we don't want to pass _completely arbitrary_ type parameters.
For example we might want to ensure that the variable we pass has the `length` property.
We can't just use it though, since this will lead to an error.
Consider this example:

```ts
function printLength<Type>(arg: Type): number {
  return arg.length;
}
```

This will throw the following error:

```
index.ts:2:14 - error TS2339: Property 'length' does not exist on type 'Type'.
2   return arg.length;
               ~~~~~~
Found 1 error in index.ts:2
```

This makes sense since `arg` can be of literally any type and there is no guarantee that `arg` will actually have the property `length`.
To change this, we need to constrain the type `Type`:

```ts
function printLength<Type extends { length: number }>(arg: Type): number {
  return arg.length;
}
```

As usual, we can use a type alias here:

```ts
type HasLength = {
  length: number;
};

function printLength<Type extends HasLength>(arg: Type): number {
  return arg.length;
}
```
