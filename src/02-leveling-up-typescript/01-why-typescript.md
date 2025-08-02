## Why TypeScript?

<div style="text-align: right"> <i> Better to wrangle with TypeScript's compiler today, than to wrestle with JavaScript bugs tomorrow. <br> — Ancient Chinese proverb </i> </div>

### A Little Story

Consider the following scenario.
You have a JavaScript function `showTask(task)` which takes a `task` object and displays the task in a UI (or in the console).

For example, let's say you have a `task` object looks like this:

```js
const task = {
  id: 1,
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
};
```

Can you pass this object to `showTask`?
Well, it's hard to tell.

_Maybe_ the `showTask` function expects an object that has `id`, `title`, `description` _and_ `status` fields.
The only way to find out if your `task` object is a valid input for `showTask` is to—well—actually pass it and find out.
This is obviously not the ideal workflow, especially if you happen to find out that your object lacked some important properties _in production_.

Additionally, if the author of the `showTask` function changes their function to expect additional properties on the `task` object, they would now have to check all the invocations of `showTask` to verify that they didn't accidentally break something.

This is where TypeScript comes in.
With TypeScript we would be able to _statically type_ the function by adding _type annotations_ like this:

```ts
type Task = {
  id: number;
  title: string;
  description: string;
};

function showTask(task: Task) {
  // Implementation here
}
```

Now we know _exactly_ what kind of object `showTask` expects.
Namely, it needs an `id` property which is a `number`, a `title` property which is a `string` and a `description` property which is also a `string`.

Here is how we could call this function:

```ts
showTask({
  id: 1,
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
});
```

If we would pass an object that lacks some of the expected properties and run _type checks_ (more on that later) we would get an error long before the bad code could make it anywhere near production.
Even better—your editor would now be able to show you that you might have a problem during development:

```ts
showTask({
  id: 1,
  title: 'Read the Next.js book',
});
// Most editors will now show a squiggly red line somewhere around here and
// politely scream at you that the object is missing the description property.
```

Better still (TypeScript just keeps giving), you now get _autocompletion_—editors will show possible suggestions for the property names your object should have _while you are typing_.
This saves an enormous amount of time and effort when writing code.

To summarize, using TypeScript massively enhances your developer workflow.
This is why most large projects use TypeScript instead of vanilla JavaScript these days.

### The TypeScript Compiler

You can install the TypeScript compiler globally by running the following command:

```sh
pnpm add -g typescript
```

Let's see how we can use the TypeScript compiler.
First, create a file `index.ts`:

```ts
type Task = {
  id: number;
  title: string;
  description: string;
};

function showTask(task: Task) {
  console.log(
    `Task with ID=${task.id} has the title ${task.title} and description ${task.description}`,
  );
}

showTask({
  id: 1,
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
});
```

We can't execute TypeScript files in the browser or in Node.js directly.
Instead we need to first _compile_ the TypeScript code to JavaScript—which is why we installed the compiler.

Here is how we can compile the `index.ts` file:

```sh
tsc --strict index.ts
```

> Note that the `--strict` turns on certain "strict" type checks.
> We will basically always use this flag.

Since there were no type errors, nothing is logged in the console and we get a file `index.js` which looks (approximately) as follows:

```js
function showTask(task) {
  console.log(
    'Task with ID='
      .concat(task.id, ' has the title ')
      .concat(task.title, ' and description ')
      .concat(task.description),
  );
}
showTask({
  id: 1,
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
});
```

Note that all the type annotations are gone and all we get is vanilla JavaScript that we can execute.
Additionally, the TypeScript compiler _downleveled_ our code so that it can be executed by older platforms.
Here the template string syntax (which is not supported by very old browsers) was replaced by a series of `concat` calls.

> Note that by the time you're reading this the default target settings might be different and you might not see this particular downleveling anymore.

What if there is an error in `index.ts`?
Consider the following TypeScript code:

```ts
type Task = {
  id: number;
  title: string;
  description: string;
};

function showTask(task: Task) {
  console.log(
    `Task with ID=${task.id} has the title ${task.title} and description ${task.description}`,
  );
}

showTask({
  id: 1,
  title: 'Read the Next.js book',
});
```

If you would compile this code using `tsc --strict index.ts`, you would get the following error:

```
index.ts:13:10 - error TS2345: Argument of type '{ id: number; title: string; }' is not assignable to parameter of type 'Task'.
  Property 'description' is missing in type '{ id: number; title: string; }' but required in type 'Task'.
13 showTask({
            ~
14   id: 1,
   ~~~~~~~~
15   title: 'Read the Next.js book',
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
16 });
   ~
  index.ts:4:3
    4   description: string;
        ~~~~~~~~~~~
    'description' is declared here.
Found 1 error in index.ts:13
```

The compiler correctly informed us that if we were to run this code it would probably result in bad things happening due to the missing `description` property.
We now know that the code is probably wrong long before it made to production and can fix it accordingly.

### Executing TypeScript Directly with `tsx`

Sometimes you want to execute a TypeScript file directly (especially during development) and not go through the "compile and run" cycle manually.
There are a couple of tools that allow you to do that—here we will introduce `tsx` (short for "TypeScript Execute").

Install `tsx` using the package manager:

```sh
pnpm add -g tsx
```

You can now execute a TypeScript file `index.ts` directly by running:

```sh
tsx index.ts
```
