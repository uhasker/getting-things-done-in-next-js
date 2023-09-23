## The keyof and typeof Type Operators

<div style="text-align: right"> <i> He who understands the keyof can unlock the mysteries of the object, and with typeof, discern its essence. <br> - Ancient Chinese proverb </i> </div>

### The keyof Type Operator

The `keyof` type operator takes an object type and produces a literal union of its keys.
For example:

```ts
type User = { name: string; email: string; age: number };
type UserKeys = keyof User;

// UserKeys is equivalent to "name" | "email" | "age"
```

The `keyof` type operator is particularly useful with generics.
Consider the following example:

```ts
function getProperty<Type, Key>(obj: Type, key: Key) {
  return obj[key];
}
```

This will _not_ compile because we have no idea if `key` can be used to index into `obj` so you will get the following error:

```
index.ts:2:10 - error TS2536: Type 'Key' cannot be used to index type 'Type'.
2   return obj[key];
           ~~~~~~~~
Found 1 error in index.ts:2
```

Therefore we need to specify that `Key` should be of a type that can be used to index into an object of type `Type`.
In other words, `Key` should extend `keyof Type`:

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
```

### The typeof Type Operator

The `typeof` type operator can be used to refer to the type of a variable:

```ts
let str = 'Hello, world!';
let str2: typeof str; // str2 is a string
```

An example where this is useful is when you want to create a type that is equivalent to the return type of a function.
You can use the generic type `ReturnType<T>` - the type parameter `T` is a function type and `ReturnType<T>` is then the return type of the function.

Consider a function `getTask(...)` which returns an object of some type.
Then you could get the return type like this:

```ts
type MyReturnType = ReturnType<typeof getTask>;
```
