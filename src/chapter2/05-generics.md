## Generics

<div style="text-align: right"> <i> Generics are the invisible hat of the TypeScript sage, fitting the heads of both the giant and the dwarf. <br> - Ancient Chinese proverb </i> </div>

### Why Generics?

Generics allow us to write code that is type-safe, yet independent of specific types.

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

However using `any` is - as we already mentioned - a bad idea since we lose all the type information even if we pass in an array of a known type.
For example all these constants would be inferred to have type `any`:

```ts
const num = getFirstElement([1, 2, 3]);
const str = getFirstElement(['a', 'b', 'c']);
```

We also can't use the `unknown` type since it doesn't permit any operations:

```ts
function getFirstElement(arr: unknown) {
  return arr[0];
  // This will result in a type error
}
```

We could also make use of _function overloads_ and write something like this:

```ts
function getFirstElement(arr: number[]): number;
function getFirstElement(arr: string[]): string;
function getFirstElement(arr: undefined[]): undefined;
// More overloads and implementation here
```

> We will not discuss function overloads in more detail as it's out of scope for this book.

But this obviously gets very tedious and error-prone for most cases.
Instead TypeScript allows us to use **generics** to specify that some code does not depend on the concrete types and only cares about the relation between certain types.

### Generic Functions

Consider the identity function that simply takes an argument `arg` and returns it unchanged.
We can use a **type variable** `Type` and type it like this:

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

We dont actually have to manually specify the type `string` when calling the function and can instead rely the inference capabilities of TypeScript once again:

```ts
let val = 'Hello, world!';
let val2 = identity(val); // val2 is of type string
```

> There is no single convention for naming type parameters.
> Common names include `T`, `Type` and `TType`.
> We will stick to the `Type` convention throughout this book.

Similarly, we can type the `getFirstElement` function using type parameters:

```ts
function getFirstElement<Type>(arr: Type[]): Type {
  return arr[0];
}

const num = getFirstElement([1, 2, 3]);
const str = getFirstElement(['a', 'b', 'c']);
```

Unlike in the `getFirstElement` example that was typed using `any`, we now get meaningful type inference.
For example `num` will have the type `number` (instead of `any`) and `str` will have the type `string`.

You can use any number of type parameters you want.
For example here is how we could write a correctly annotated `map` function:

```ts
function map<In, Out>(array: In[], f: (value: In) => Out): Out[] {
  return array.map(f);
}
```

Here, we have two type parameters `In` and `Out`.
The type parameter `In` indicates the types of the elements of the original array.
The type parameter `Out` indicates the types of the elements of the result array.

Note how the type of the parameter `f` makes uses of both the `In` and `Out` parameter types.
This makes sense since `f` transforms an element of the original array (`In`) into an element of the result array (`Out`).

Again, we will get proper type inference:

```ts
const arr = map([1, 2, 3, 4], (x) => x % 2 === 0);
```

Here `arr` will have the type `boolean[]`.

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

We can also use generic functions and objects together:

```ts
function extractContent<Type>(box: Box<Type>): Type {
  return box.content;
}
```

### Important Builtin Generics

Generic object types are often useful for collections (and containers), since collection logic is often independent of the specific item types.
For example, retrieving the first element of an array or finding an element of a set by value using the `===` operator will work the same way regardless of the types of the array or set elements.

You already learned about generic arrays (note that you can use `Array<T>` in place of `T[]`).

If you have an object type where the property keys have a certain known type and the property values have a certain known type, you can use the generic type `Record<Key, Value>`

```ts
const ScoreRecord: Record<string, number> = {
  Alice: 50,
  Bob: 60,
  Charlie: 70,
};
```

Two other generic data structures that you already know about are sets and maps:

```ts
const mySet: Set<number> = new Set([1, 2, 3]);
const myMap: Map<string, number> = new Map([
  ['Item 1', 1],
  ['Item 2', 2],
]);
```

This example can also be written like this:

```ts
const mySet = new Set<number>([1, 2, 3]);
const myMap = new Map<string, number>([
  ['Item 1', 1],
  ['Item 2', 2],
]);
```

One other very important generic type is the `Promise<Type>` type which is most commonly used to annotate asynchronous functions.
For example, if we have an asynchronous function `f` that returns a promise that will eventually fulfill with a `string`, we would annotate it like this:

```ts
async function f(): Promise<string> {
  // Implementation here
}
```

### Generic Constraints

Often, we don't want to pass _completely arbitrary_ type parameters.

Consider this example:

```ts
function getLength<Type>(arg: Type): number {
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
To change this, we need to constrain the type `Type` and make sure that `arg` must have the `length` property:

```ts
function getLength<Type extends { length: number }>(arg: Type): number {
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
