## Basic Types

<div style="text-align: right"> <i> Use TypeScript, find enlightenment. Ignore TypeScript, trip over undefined. <br> - Ancient Chinese proverb </i> </div>

### Annotating Variables

You can annotate variables by adding a type annotation:

```ts
let task: string = 'Read the Next.js book';
```

You can annotate constants in a similar fashion:

```ts
const name: string = 'Read the Next.js book';
```

Note that this usually is not needed, since TypeScript can automatically perform _type inference_ and infer the type of a variable or a constant:

```ts
let name = 'Read the Next.js book';
```

We will very rarely write explicit type annotations (only if we really need them) and instead let TypeScript infer as much as it can.
You be suprised by how few type annotations you need to get completely type checked code!

### Primitive Types

The primitive types that are present in TypeScript should already be familiar to you from the chapter on JavaScript.
TypeScript has the `number` type:

```ts
const id: number = 1;
```

TypeScript also has the `string` type:

```ts
const task: string = 'Read the Next.js book';
```

Additionally TypeScript has the `null` and `undefined` types:

```ts
const undefinedTask: undefined = undefined;
const nullTask: null = null;
```

Remember that in a real codebase we would let TypeScript infer the variables:

```ts
const id = 1;
const task = 'Read the Next.js book';
const undefinedTask = undefined;
const nullTask = null;
```

### The Any and Unknown Types

TypeScript also has the `any` type.
When a value is of "any" type, you can access its properties, call it, or assign it freely, and basically do anything (get it?) that's syntactically correct.

Let's say you have a `task` variable of type `any` - then these are all legal:

```ts
console.log(task.summary);
task();
const otherTask = task;
```

Basically `any` is way to tell the compiler to "shut up" and skip type checking.
This is also the reason why using `any` is generally a terrible idea since it defeats the purpose of using TypeScript in the first place!

However sometimes you do find yourself in a situation where you don't know much about a variable type.
In this case it's better to use `unknown`.
If you have a `task` variable of type `unknown`, then these are all no longer legal:

```ts
console.log(task.summary);
task();
const otherTask = task;
```

### Typing Arrays

You can type arrays as `T[]` where `T` is the type of the elements of the array.
For example here is how you could type an array of numbers:

```ts
const evenNumbers: number[] = [1, 2, 3, 4];
```

Here is how you would an array of strings:

```ts
const tasks: string[] = ['First task', 'Second task', 'Third task'];
```

Note that for these simple example we could again infer the types.

### Typing Objects

You can type an object by writing the property names and types of its properties inside curly braces `{}`.
For example here how you could declare an object that has the properties `id` of type `number`, `summary` of type `string` and `description` of type `string`:

```ts
const task: { id: number; summary: string; description: string } = {
  id: 1,
  summary: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
};
```

You can mark properties as _optional_ by using the question mark `?`.
If a property is marked as optional, you don't need to specify it.
For example this is valid:

```ts
const task: { id: number; summary: string; description?: string } = {
  id: 1,
  summary: 'Read the Next.js book',
};
```

### Type Alias

The object syntax we just introduced is not particulary readable.
This is why TypeScript gives you the possibility to specify a **type alias** (i.e. another name) for an object type:

```ts
type Task = {
  id: number;
  summary: string;
  description: string;
};
```

Note that you can specify type aliases for more than just object types sind type aliases are basically just different names for types.
For example we could specify a type alias for the primitive type `string`:

```ts
type ID = string;
```
