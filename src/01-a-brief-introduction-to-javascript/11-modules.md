## Modules

<div style="text-align: right"> <i> A wise coder knows that exporting too much is like opening all doors of the house; both invite unexpected guests. <br> — Ancient Chinese proverb </i> </div>

### Module System

At the moment, the scripts we write are not large and easily fit into a single file.
However, as we begin writing our task application, we will run into the problem that if we try to fit our entire project into a single file, that file will quickly become unreadable and unmaintainable.

Additionally, we might often want to use third-party libraries (i.e. libraries written by someone else) in our project.
Copy and pasting the code from a third-party library seems like an obviously bad idea.
First, this would make our scripts even less readable.
Second, what do we do if the library receives an update?

Luckily, JavaScript provides us with a mechanism to use code from one file in another file—**modules**.

> We will mostly discuss ECMAScript modules (ESM).
> There are other module systems, but we will only cover them very briefly and only use them for minor examples.
> Especially for the final project, we will only use ESM.

### The `import` and `export` Keywords

Let's start our module discussion with a very simple example.
We will create a file containing a function and then try to use that function in another file.

Create a file `greeter.js` containing the following code:

```js
export function greet(name) {
  return `Hello, ${name}!`;
}
```

Note the `export` keyword here.
This **exports** the `greet` function, i.e. it tells JavaScript to make this function available to other files.

We can now **import** the `greet` function in another file.
Create a file `main.js` in which we try to use the `greet` function:

```js
import { greet } from './greeter.js';

console.log(greet('World'));
```

This is the basic setup, but in order to actually execute this in the browser or in Node.js we need to make some more adjustments.

### ESM in the Browser

Let's create a file named `index.html` in which we use `main.js` as a JavaScript module:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>ESM Demo</title>
  </head>

  <body>
    <script type="module" src="main.js"></script>
  </body>
</html>
```

If you just try to open `index.html` in the browser, you will a CORS Error:

```
Access to script at 'file:///.../main.js' from origin 'null' has been blocked by
CORS policy: Cross origin requests are only supported for protocol schemes:
http, data, isolated-app, chrome-extension, chrome, https, chrome-untrusted.
```

We won't go into the details of CORS, but basically this error happens because ECMAScript modules are subject to the same-origin policy.
We therefore need to serve our files over a server instead of just trying to open them in our browser.

Let's install the `http-server` package:

```sh
pnpm add -g http-server
```

> The `-g` flag tells `pnpm` to install the package globally and not just for a particular project.
> This is similar to the `-g` flag for `npm`.

Now, enter the directory where you've stored `index.html`, `main.js` and `greeter.js` and execute the following command:

```sh
http-server .
```

Go to `http://localhost:8080`, open the console and you should see `Hello, World!` in your console.

### ESM in Node.js

To use `main.js` and `greeter.js` in Node.js, we will need to create a **project**.
Therefore you need to create the following `package.json` file in the same directory as `main.js` and `greeter.js`:

```
{
  "name": "projectname",
  "version": "1.0.0",
  "main": "main.js",
  "type": "module"
}
```

> Note that it is very important that you specify `type` as `module`.
> This tells node to interpret JavaScript files as using ESM syntax (which is what we use in this section).

You can then execute `main.js` by running:

```sh
node main.js
```

> We will return to the concept of `package.json` in more detail later.

### Named Exports and Imports

The example above showed the use of **named exports**.
Here, each function is referred by its name when exporting and the same name is used when importing.
You can export multiple functions when performing named exports.

You can create a named export by prefixing a function with the `export` keyword:

```js
export function getGreeting(name) {
  return `Hello, ${name}!`;
}

export function greet(name) {
  console.log(getGreeting(name));
}
```

Alternatively, you can use an **export list**:

```js
function getGreeting(name) {
  return `Hello, ${name}`;
}

function greet(name) {
  console.log(getGreeting(name));
}

export { getGreeting, greet };
```

You should use named exports if you need to export several values/functions.

Note that you can rename exports in an export list:

```js
function getImportantGreeting(name) {
  return `Hello, ${name}!`;
}

export { getImportantGreeting as getGreeting };
```

If you need to import multiple functions, you can do that as well:

```js
import { getGreeting, greet } from './greet.js';
```

You can also rename imports:

```js
import { getGreeting, greet as sayHello } from './greet.js';
```

This is useful if you have several modules that export functions with a same name.
For example if you had a module `greet` that exports the function `greet` and a module `other-greet` that exports the function `greet` as well, you would run into problems if you just tried to import `greet`:

```js
import { greet } from './greet.js';
import { greet } from './other-greet.js';
```

Instead you could rename one or both greet functions:

```js
import { greet } from './greet.js';
import { greet as otherGreet } from './other-greet.js';
```

### Default Exports and Imports

If you want to have a default function provided by your module, you can use a **default export**:

```js
function getGreeting(name) {
  return `Hello, ${name}!`;
}

export default function greet(name) {
  console.log(getGreeting(name));
}
```

Alternatively you could write:

```js
function getGreeting(name) {
  return `Hello, ${name}!`;
}

function greet(name) {
  console.log(getGreeting(name));
}

export default greet;
```

You could also write:

```js
function getGreeting(name) {
  return `Hello, ${name}!`;
}

function greet(name) {
  console.log(getGreeting(name));
}

export { greet as default };
```

Note that you _can't have more than one default export_.
This means that you should use default exports when you have one very important value or function that you'd like to export.

You can import a `default` exported value like this:

```js
import greet from './greet.js';

console.log(greet('World'));
```

Alternatively, you could use the `default as` syntax:

```js
import { default as greet } from './greet.js';

console.log(greet('World'));
```

Note that you can import the `default` exported value using any name you like:

```js
import thingy from './greet.js';
```

### Namespace Imports

If you wish to avoid name conflicts (like in the `greet` situation presented previously) you can do even better with namespace imports:

```js
import * as greet from './greet.js';

greet.getGreeting('World');
```

The `import * as` syntax retrieves all exports available in `greet.js`, creates a **namespace object** `greet` and makes all the exports available as a member of that object.
This means that the `greet` conflict can be resolved like this:

```js
import * as greetModule from './greet.js';
import * as otherGreetModule from './other-greet.js';

greetModule.greet('World');
otherGreetModule.greet('World');
```

### Module Scope

You already know the global scope, the function scope and the block scope.
Now that we've introduced modules, there is one more scope you should know about—the **module scope**.

As the name already says this is the scope of a module and each module has its own scope.
This means that variables and functions declared in a module are _not visible to code outside the module_ unless they are explicitly exported.
Even if a variable or a function is explicitly exported it can't be used in outside code unless it has been explicitly imported first.

This ensures that modules don't accidentally interfere with each other.

Consider this example:

```js
function getGreeting(name) {
  return `Hello, ${name}!`;
}

export function greet(name) {
  console.log(getGreeting(name));
}
```

Here the `getGreeting` function is not exported, meaning that it will remain _completely private_ to the module.
Only the `greet` function can be used (since it's exported).

Let's try importing `getGreeting`:

```js
import { greet, getGreeting } from './greet.js';
```

You will get the following error:

```
import { greet, getGreeting } from './greet.js';
                ^^^^^^^^^^^
SyntaxError: The requested module './greet.js' does not provide an export named 'getGreeting'
```

### CJS Modules

So far, we've been discussing ECMAScript modules (ESM).
One alternative to ESM is a module system called CommonJS (CJS for short).

You can export objects in CJS using `module.exports` and import objects in CJS using `require()`.

Let's rewrite our running example in CJS.
If you're following along, you should create a separate directory for this example.

Create a file `greet.js` and export functions using `module.exports`:

```js
function getGreeting(name) {
  return `Hello, ${name}!`;
}

function greet(name) {
  console.log(getGreeting(name));
}

// Exporting the functions
module.exports = { getGreeting, greet };
```

And now create a file `app.js` where you import the functions from `greet.js` using `require()`:

```js
// Importing the module
const { getGreeting, greet } = require('./greet');

console.log(getGreeting('World')); // Hello, World!
greet('World'); // Hello, World!
```

You can now run the `greet.js` without any additional configuration (you don't even need a `package.json`):

```sh
node app.js
```

We will only use CJS for short Node.js examples where we want to avoid the setup of a new project.
However, other than that, we will follow the current best practices and only use ESM throughout this book.
This is mainly because CJS is an older module system that was designed exclusively for Node.js and has been mostly replaced by ESM.
