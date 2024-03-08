## Modules

<div style="text-align: right"> <i> A wise coder knows that exporting too much is like opening all doors of the house; both invite unexpected guests. <br> — Ancient Chinese proverb </i> </div>

### Module System

At the moment, the scripts we write are not large and easily fit into a single file.
However, as we begin writing our task application, we will run into the problem that if we try to fit our project into a single file, that file will quickly become unreadable and unmaintainable.

Additionally, we might often want to use third-party libraries (i.e. libraries written by someone else) in our project.
Copy and pasting the code from a third-party library seems like an obviously bad idea.
First, this would make our scripts even less readable.
Second, what do we do if the library receives an update?

Luckily, JavaScript provides us with a mechanism to use code from one file in another file - **modules**.

> Note that we will only discuss ECMAScript modules.
> There are other module systems, but we won't cover them right now.

### The Import and Export Keywords

Let's start our module discussion with a very simple example.
We will create a file containing a function and then try to use that function in another file.

Create a file `greeter.js` containing the following code:

```js
export function greet(name) {
  return `Hello, ${name}`;
}
```

Note the `export` keyword here.
This **exports** the `greet` function, i.e. it tells JavaScript to make this function available to other files.

We can now **import** the `greet` function in another file.
Create a file `main.js` in which we try to use the `greet` function:

```js
import { greet } from './greeter.js';

console.log(greet('John Doe'));
```

This is the basic setup, but in order to execute this in the browser or in Node.js we need to make some more adjustments.

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

If you just try to open `index.html` in the browser you will a CORS Error:

```
Access to script at 'file:///.../main.js' from origin 'null' has been blocked by
CORS policy: Cross origin requests are only supported for protocol schemes:
http, data, isolated-app, chrome-extension, chrome, https, chrome-untrusted.
```

We will dive into CORS later, but basically this error happens because ECMAScript modules are subject to the same-origin policy.
We therefore need to serve our files over a server instead of just trying to open them in our browser.

Let's install the `http-server` package:

```sh
npm install -g http-server
```

Now enter the directory where you stored `index.html`, `main.js` and `greeter.js` and execute the following command:

```sh
http-server .
```

Go to `http://localhost:8080`, open the console and you should see `Hello, John Doe` in your console.

### ESM in Node.js

To use `main.js` and `greeter.js` in Node.js create the following `package.json` file in the same directory as `main.js` and `greeter.js`:

```
{
  "name": "projectname",
  "version": "1.0.0",
  "main": "main.js",
  "type": "module"
}
```

> Note that it is very important that you specify `type` as `module`.
> This tells node to interpret JavaScript files as using ES module syntax (which is what we use in this section).

This `package.json` file specifies that the directory is now a **node project**.

You can then execute `main.js` by running:

```sh
node main.js
```

> We will return to the concept of `package.json` later.

### Named Exports and Imports

The example above showcased the use of **named exports**.
Here each function is referred by its name when exporting and the same name is used when importing.
You can export multiple functions when performing named exports.

You can create a named export by prefixing a function with the `export` keyword:

```js
export function getGreeting(name) {
  return `Hello ${name}`;
}

export function greet(name) {
  return `Hello ${name}`;
}
```

Alternatively you can use an **export list**:

```js
function getGreeting(name) {
  return `Hello ${name}`;
}

function greet(name) {
  console.log(getGreeting(name));
}

export { getGreeting, greet };
```

> You should use named exports if you need to export several values.

Note that you can rename exports in an export list:

```js
function getImportantGreeting(name) {
  return `Hello ${name}!`;
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
export default getGreeting;
```

This is equivalent to:

```js
export { getGreeting as default };
```

Note that you can't have more than one default export.

You import the default export like this:

```js
import getGreeting from './greet.js';
```

Alternatively you could use `default as`:

```js
import { default as getGreeting } from './greet.js';
```

Note that you can import the default export using any name you like:

```js
import thingy from './greet.js';
```

### Namespace Imports

If you wish to avoid name conflicts (like the `greet` situation presented above) you can do even better with namespace imports:

```js
import * as greet from './greet.js';

greet.getGreeting('Hello');
```

The `import * as` syntax retrieves all exports available in `greet.js`, creates a **namespace object** `greet` and makes all the exports available as a member of that object.
This means that the `greet` conflict can be resolved like this:

```js
import * as greetModule from './greet.js';
import * as otherGreetModule from './other-greet.js';

greetModule.greet('John');
otherGreeetModule.greet('John');
```
