## Why TypeScript?

<div style="text-align: right"> <i> Better to wrangle with TypeScript's compiler today, than to wrestle with JavaScript bugs tomorrow. <br> - Ancient Chinese proverb </i> </div>

### A Little Story

Consider the following scenario.
You have a JavaScript function `showTask(task)` which takes a `task` object and displays the task in a UI (or in the console).

Let's say you have the following task object:

```js
const task = {
  id: 1,
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
};
```

Can you pass this object to `showTask`?
Well, you can't really tell because maybe the `showTask` function expects an object that has `id`, `title`, `description` _and_ `status` fields.
The only way to find out if your `task` object is a valid input for `showTask` is to - well - actually pass it and find out.
This is obviously not the ideal workflow (especially if you happen to find out that your object lacked some important properties _in production_).

Additionally, if the author of the `showTask` function changes his function to expect additional properties on the `task` object, he would now have to check all the invocations of `showTask` to verify that he didn't accidentally break something.

This is where TypeScript comes in.
With TypeScript we would be able to _statically type_ the function by adding _type annotations_ like so:

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
An object that is passed to the function must have an `id` property which is a `number`, a `title` property which is a `string` and a `description` property which is also a `string`.

For example we could call the function like this:

```ts
showTask({
  id: 1,
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
});
```

If we pass an object that lacks some of the expected properties and run _type checks_ (more on that later) we will get an error long before the bad code can make it anywhere near production.
Even better - your editor will be able to show you that you might have a problem during development:

```ts
showTask({
  id: 1,
  title: 'Read the Next.js book',
});
// Most editors will now show a squiggly red line somewhere around here and
// politely scream at you that the object is missing the description property.
```

Better still (TypeScript just keeps giving), you now get _autocompletion_ - editors will show possible suggestions for the property names your object should have while you type.
This saves an enormous amount of time and effort when writing code.

To summarize, using TypeScript massively enhances your developer workflow which is why nowadays most large projects no longer use vanilla JavaScript, but TypeScript instead.

### Installing TypeScript

You can install the TypeScript compiler by running the following command:

```sh
npm install -g typescript
```

> The `-g` flag tells `npm` to install the package globally and not just for a particular project.

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
Instead we need to first _compile_ the TypeScript code to JavaScript - which is why we installed the compiler.
Finally we can execute the resulting JavaScript code same as usual.

Here is how we can compile the `index.ts` file:

```sh
tsc --strict index.ts
```

> Note that the `--strict` turns on certain "strict" type checks.
> We will basically always do this.

Since there were no type errors, nothing is logged on the console and we get a file `index.js` which looks (approximately) as follows:

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
Additionally the TypeScript compiler _downleved_ our code so that it can be executed by older platforms.
Here the template string syntax (which is not supported by very old browsers) was replaced by a series of `concat` calls.

> Note that by the time you're reading this the default target settings might be different and you might not see this particular downleveling anymore.

What if there is an error in `index.ts`?

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

Now we get an error if we try to run `tsc --strict index.ts`:

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
We now know that the code is probably wrong long before it made it anywhere near production and can fix it accordingly.
