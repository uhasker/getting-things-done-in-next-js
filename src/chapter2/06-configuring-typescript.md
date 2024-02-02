## Configuring TypeScript

<div style="text-align: right"> <i> "Like the ancient master who chooses his brush, the wise coder sets 'strict' with care, for clarity is the first step to wisdom." <br> - Ancient Chinese proverb </i> </div>

### Creating a TypeScript Project

We already learned how to create and run individual TypeScript files.
However, as with JavaScript, we will usually be working with larger projects.

Let's create a JavaScript project and add TypeScript support to it.

First, we create a directory where our project will reside:

```sh
mkdir example
cd example
```

Next we need to create the `package.json` file to indicate that this directory should be a JavaScript project:

```sh
# TODO: we used npm previously
pnpm init
```

This will create a `package.json` file containing the project settings:

```json
{
  "name": "example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Next let's create a `tsconfig.json` to indicate that this particular project will use TypeScript:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

Setting the `strict` option in `compilerOptions` is equivalent to running `tsc` with the `--strict` flag.
We will talk about this option in some more detail later.

> We could have also created the `tsconfig.json` file by running `tsc --init`, however this will add a lot of options that we really don't care about at the moment.

Now let us create an `index.ts` file:

```ts
function getGreeting(name: string): string {
  return `Hello, ${name}!`;
}

console.log(getGreeting('World'));
```

Finally we can compile the code:

```sh
tsc
```

This will create approximately the following `index.js` file:

```js
'use strict';
function getGreeting(name) {
  return 'Hello, '.concat(name, '!');
}
console.log(getGreeting('World'));
```

We can execute this file the same way we would execute any other JavaScript file:

```sh
node index.js
```

There is one small modification we need to make to this process.
While using the globally installed TypeScript compiler is fine if you have a single project, you often might need to work on multiple projects at the same time.
Since these projects might use different TypeScript versions, we usually want to install `tsc` on a per-project basis.

Let's therefore install `tsc` as a dev (development) dependency (since we will not need it in the final code output):

```sh
pnpm add --save-dev typescript
```

This will install TypeScript only for this particular project.
We can now run the `tsc` that was installed for this project using the following command:

```sh
pnpm tsc
```

### Using Modules in a TypeScript Project

Now that we know how to create TypeScript projects in general, let's quickly talk about how we can use modules in TypeScript projects.
This process will be very similar to what we learned about JavaScript modules, except that we may need to make minor modifications to the `tsconfig.json` file.

Create a `src` directory containing the files `greet.ts` and `index.ts`.
You overall project structure should now look as follows:

```
.
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── node_modules/
└── src/
    ├── index.ts
    └── greet.ts
```

Add the following exported function to `greet.ts`:

```ts
export function getGreeting(name: string): string {
  return `Hello, ${name}!`;
}
```

Now let's use `getGreeting` in `index.ts`:

```ts
import { getGreeting } from './greet';

console.log(getGreeting('World'));
```

We could theoretically compile our project using this setup already.
However we will make a small modification to our `tsconfig.json` to avoid polluting the `src` directory with our compilation outputs.
To this end, we utilize the `outDir` option, which specifies the output directory, where TypeScript will put the compilation result.

Change your `tsconfig.json` file to be as follows:

```ts
{
  "compilerOptions": {
    "strict": true,
    "outDir": "./dist"
  }
}
```

We can now compile again:

```sh
pnpm tsc
```

Now the project structure looks like this:

```
.
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── node_modules/
├── src/
│   ├── index.ts
│   └── greet.ts
└── dist/
    ├── index.js
    └── greet.js
```

The files from `src` were successfully compiled and the compilation output is in `dist`.
We can now execute `index.js` by running:

```sh
node ./dist/index.js
```

You should see `"Hello, World!"` logged to the console.

### Including and Excluding Files

Sometimes you want to include or exclude certain files from being processed by the TypeScript compiler.
To accomplish this, you can specify the `include` or `exclude` parameters in the `tsconfig.json`.

The `include` option takes an array of filenames or patterns to include in the program (relative to the directory containing the `tsconfig.json` file).
For example we could include all files in `src` directory by setting `include` to `["src/**/*"]`.

The `src/**/*` notation is a so called glob pattern.
Here `*` matches zero or more characters (excluding directory separators) and `**/` matches any directory (with arbitrary nesting).
Thefore `src/**/*` means "match any file in the directory `src` and all its subdirectories (no matter how deeply nested)".

> Note that by default `include` is set to `["**/*"]` (i.e. match all files including arbitrarily nested subdirectories).

The `exclude` parameter specifies an array of filenames or patterns that should be skipped when resolving `include`.
It is important to note that the `exclude` parameter does not necessarily exclude the file from your codebase - a file specified by `exclude` can still become part of your codebase if you import it somewhere.
The `exclude` parameter only changes which files are found by the `include` option finds.

Consider the following example.
Let's say that you have a bunch of `*.test.ts` files containing tests, like the following `greet.test.ts`:

```ts
import { getGreeting } from './greet';

function testGreeting() {
  if (getGreeting('World') !== 'Hello, World!') {
    throw new Error('Test failed');
  }
}
```

> This is not how we would really write a test, but that is irrelevant for now.

If we would run `pnpm tsc` right now, we would see the we have `greet.test.js` in the output which is probably not desirable, since the tests probably shouldn't be part of the final compilation output.

Therefore we could write the following `tsconfig.json`:

```json
{
  "include": ["src/**/*"],
  "exclude": ["src/**/*.test.ts"],
  "compilerOptions": {
    "strict": true,
    "outDir": "./dist"
  }
}
```

If we delete the `dist` directory and run `pnpm tsc` again, `greet.test.js` is no longer present.

### Compiler Options

There a lot of compiler options that we can set in the `compilerOptions` section of `tsconfig.json` besides `strict` and `outDir`.
Let's discuss some of them.

#### The `strict` Option

The `strict` option enables a wide range of - well - strict type checking.

Here is some example code that contains a few type issues:

```ts
function getNumber(): number | undefined {
  return Math.random() > 0.5 ? 0 : undefined;
}

function logNumber(n: number) {
  console.log(n);
}

function logAny(x) {
  console.log(x);
}

const number = getNumber();
logNumber(number);
logAny(number);
```

If we set `strict` to `false` (which it is by default), this code will (surprisingly) compile.

However if we turn `strict` on, we get the errors that you would expect from what you learned in the previous sections of the TypeScript chapter:

```ts
src/index.ts:9:17 - error TS7006: Parameter 'x' implicitly has an 'any' type.

9 function logAny(x) {
                  ~

src/index.ts:14:11 - error TS2345: Argument of type 'number | undefined' is not assignable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.

14 logNumber(number);
             ~~~~~~


Found 2 errors in the same file, starting at: src/index.ts:9
```

You should _always_ turn `strict` on, unless you have a really good reason not to (for example because you are migrating from a JavaScript or a very old TypeScript codebase).

#### The `target` Option

Remember how we talked about downleveling in the first section of this chapter?
The `target` options changes which JS features are downleveled and which are left as is.
For example if `target` is `es5` template strings will be downleveled, but if it is `es2015` (equivalent to `es6`) they won't be, because template strings were introduced in ES2015.

Take this code:

```ts
const world = 'World';
console.log(`Hello ${world}`);
```

If `target` is set to `es5`, it would compile to this:

```js
'use strict';
var world = 'World';
console.log('Hello '.concat(world));
```

If `target` is set to `es2015`, the compilation output would look like this:

```js
'use strict';
const world = 'World';
console.log(`Hello ${world}`);
```

This is because with `target` set to `es5` the template string had to be downleveled.

Some valid targets are:

- `es5`
- `es2015` (equivalent to `es6`)
- `es2016` up to `es2022`

There is also the `esnext` target which refers to the highest version of TypeScript.
This target should be used with caution since it means different things between different TypeScript versions.

Modern browsers support all `es6` features, so `es6` is often a good choice.
You might choose to set a lower target though if your code is deployed to older environments.
Alternatively you might choose a higher target if your code is guaranteed to run in newer environments.

#### The `lib` Option

The `lib` option allows you specify libraries to be included in the compilation.
Basically, you can use this to let TypeScript know which APIs will be available in the runtime environment.

For example let's say we have this code which would only work in the browser since it attaches an event listener to the browser `document`:

```ts
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has loaded');
});
```

If we only have `lib` equal to `["es2015"]`, we will get a bunch of compilation errors:

```
src/index.ts:1:1 - error TS2584: Cannot find name 'document'. Do you need to change your target library? Try changing the 'lib' compiler option to include 'dom'.

1 document.addEventListener('DOMContentLoaded', () => {
  ~~~~~~~~

src/index.ts:2:5 - error TS2584: Cannot find name 'console'. Do you need to change your target library? Try changing the 'lib' compiler option to include 'dom'.

2     console.log("DOM has loaded");
      ~~~~~~~


Found 2 errors in the same file, starting at: src/index.ts:1
```

But if we set `lib` to `["es2015", "dom"]` the compilation errors go away since TypeScript know introduces the DOM types into the compilation process.

#### The `noEmit` Option

The `noEmit` option can be set to `true` to not produce JavaScript output.
This makes room for another tool to convert the TypeScript files to something that can be run inside a JavaScript environment.

This is often done when we only want to use TypeScript as a type checker (as is common in projects) or to provide suggestions in your coding editor.

## An Example `tsconfig.json`

You know learned about some of the most important `tsconfig.json` settings!
Here is an example `tsconfig.json` to summarize what we learned:

```json
{
  "include": ["src/**/*"],
  "exclude": ["src/**/*.test.ts"],
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "target": "es2015",
    "lib": ["es2015", "dom"]
  }
}
```

In this case, we don't produce compilation output, but only type check the code (due to `noEmit` being `true`).
We only look at the files in `src` and its subdirectories, ignoring the `*.test.ts` file (because of the `include` and `exclude` setting).

Finally, the type checking process is strict (due to `noEmit` being `true`), all features that are not available before ES2015 will be downleveled (since `target` is `es2015`) and we can use the DOM API types.

### Reusing a `tsconfig.json`

The `extends` option can be used to inherit from another configuration file.

For example we might have a `base.json` configuration file like this:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

Now the `tsconfig.json` could extend this file:

```json
{
  "extends": "base.json",
  "include": ["src/**/*.ts"],
  "compilerOptions": {
    "noEmit": true
  }
}
```

The resulting configuration would be strict and not emit JavaScript files.

This feature is particularly useful because it allows someone to write a TypeScript configuration file that specifies the settings that should be applied to TypeScript codebases in a company/project and then everyone can simply extend this configuration file.
