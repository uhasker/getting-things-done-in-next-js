## Basic Types

<div style="text-align: right"> <i> Use TypeScript, find enlightenment. Ignore TypeScript, trip over undefined. <br> — Ancient Chinese proverb </i> </div>

### Annotating Variables

You can annotate variables by adding a **type annotation**:

```ts
let task: string = 'Read the Next.js book';
```

You can annotate constants in a similar fashion:

```ts
const name: string = 'Read the Next.js book';
```

Note that explicit type annotations are usually not needed, since TypeScript can perform **type inference** to _automatically_ infer the type of a variable or a constant.

In this example, the variable `name` will _automatically_ be inferred to have the type `string`:

```ts
let name = 'Read the Next.js book';
```

We will very rarely write explicit type annotations (only if we really need them) and instead let TypeScript infer as much as it can.
You will be surprised by how few type annotations you need to get completely type checked code!

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

It also has the `boolean` type:

```ts
const inProgress: boolean = true;
```

Additionally, TypeScript has the `null` and `undefined` types:

```ts
const undefinedTask: undefined = undefined;
const nullTask: null = null;
```

Remember, in a real codebase we would let TypeScript infer the variables:

```ts
const id = 1;
const task = 'Read the Next.js book';
const inProgress = true;
const undefinedTask = undefined;
const nullTask = null;
```

In this example, TypeScript will infer that `id` has the type `number`, `task` has the type `string`, `inProgress` has the type `boolean`, `undefinedTask` has the type `undefined` and `nullTask` has the type `null`.

### The `any` and `unknown` Types

TypeScript also has the `any` type.
When a value is of the type `any`, you can access its properties, call it, or assign it freely, and basically do *any*thing (get it?) that's syntactically correct.
Also note that any property that you access will in turn have the type `any`.

Let's say you have a `task` variable of type `any`—then these are all legal:

```ts
let task: any;

console.log(task.title);
task();
task.thingy();
```

Basically using `any` is a way to tell the compiler to "shut up" and skip type checking altogether.
This is also the reason why using `any` is generally a bad idea since it defeats the purpose of using TypeScript in the first place!

However, sometimes you do find yourself in a situation where you really don't know much or don't particularly care about a variable type.
In this case it's better to use the `unknown` type.

Anything is assignable to `unknown` (just as with `any`).
However, no operations are allowed on an `unknown` variable without further assurances about the type of the variable.

For example, if you have a `task` variable of type `unknown`, then these are all no longer legal:

```ts
let task: unknown;

console.log(task.title);
task();
task.thingy();
```

### Typing Arrays

You can type arrays as `T[]` where `T` is the type of the elements of the array.
For example, here is how you would type an array of numbers:

```ts
const evenNumbers: number[] = [2, 4, 6, 8];
```

Here is how you would type an array of strings:

```ts
const tasks: string[] = ['First task', 'Second task', 'Third task'];
```

Note that for these simple examples we could again have TypeScript infer the types.
In this example `evenNumbers` would have the type `number[]` and `tasks` would have the type `string[]`:

```ts
const evenNumbers = [2, 4, 6, 8];
const tasks = ['First task', 'Second task', 'Third task'];
```

### Typing Objects

You can type an object by writing the property keys and types inside curly braces `{}`.

For example, here is how you could declare an object that has the properties `id` of type `number`, `title` of type `string` and `description` of type `string`:

```ts
const task: { id: number; title: string; description: string } = {
  id: 1,
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
};
```

Here too, you don't need to manually specify object types.
In this example, `task` will be inferred to have the type `{ id: number; title: string; description: string }`:

```ts
const task = {
  id: 1,
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
};
```

You can mark properties as _optional_ by using the question mark `?`.
If a property is marked as optional, you can assign `undefined` to it or even not specify it altogether.
For example, this is valid:

```ts
const task: { id: number; title: string; description?: string } = {
  id: 1,
  title: 'Read the Next.js book',
};

const task2: { id: number; title: string; description?: string } = {
  id: 1,
  title: 'Read the Next.js book',
  description: undefined,
};
```

### Type Aliases

The object type syntax we just introduced is often quite verbose.
This is why TypeScript gives you the possibility to specify a **type alias** (i.e. another name) for an object type:

```ts
type Task = {
  id: number;
  title: string;
  description: string;
};
```

Note that you can specify type aliases for more than just object types since type aliases are basically just different names for types.
For example, we could specify a type alias for the primitive type `string`:

```ts
type ID = string;
```

Another important point to make about type aliases is that two type aliases are exactly the same as long as the underlying types are the same.
For example, this is valid even though it doesn't look like it at first glance:

```ts
type MyString = string;
const s1: MyString = 'My string';
const s2: string = s1;
```

This is because TypeScript uses a _structural type system_—it doesn't matter what the types are named (except for the primitive types of course), it only matters what their _structure_ looks like.

Note that you can also use the `interface` keyword to achieve a similar effect:

```ts
interface Task {
  id: number;
  title: string;
  description: string;
}
```

We will stick to always using `type`.
The `interface` keyword is out of scope for this book and will not be discussed further.

> We briefly note that `type` and `interface` are not exactly the same and have a few subtle, but important differences.
> Again, we will not discuss this further.

### Type Assertions

Sometimes, you know more about the type of a variable than TypeScript.
For example, let's say that you have a function that returns an `any` value, but for some reason you know that in fact that value is definitely going to be a `string` in your case.
Then you can use a **type assertion** (also called a type cast) to force TypeScript to treat that value as a `string`.

Here is a (slightly contrived) example:

```ts
const str: any = 'This is a string';
const strLength = (str as string).length;
```

You should use type assertions sparingly since you give up some of the benefits of using TypeScript.
Usually there are better ways.
