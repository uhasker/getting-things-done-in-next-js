## Packages

<div style="text-align: right"> <i>A prudent developer tends node_modules as a garden, lest it overgrow and obscure the path to enlightenment. <br> — Ancient Chinese proverb </i> </div>

### Creating a Package

The heart of any JavaScript package is the `package.json` file.
This should contain a JSON with important information about the package like the `name` and `version`.

Here is the minimal `package.json`:

```json
{
  "name": "example-package",
  "version": "1.0.0"
}
```

The `version` field follows a convention called SemVer (short for Semantic Versioning).
This defines that any version of a package (or library) should have the format `MAJOR.MINOR.PATCH` where `MAJOR`, `MINOR` and `PATCH` are non-negative integers.
Whenever you update a package, you should make a change to the package version.

This might be a change to either `MAJOR`, `MINOR` and/or `PATCH`, depending on the kind of change you make.
Most importantly, you should ask yourself if the change is _backwards compatible_ with the old version of the package.

A change is backwards compatible if a user of the old package can switch to your new package without any issues.
For example, if you simply add a new function to your package, then that change is backwards compatible.
This is also true if you change some code in a function without changing the _functionality_ of the function.

However, if you change the way an existing package function works, the change is no longer backwards compatible.
If a user of your package now tries to switch from the old version to the new version all the calls of that function will no longer work.
Programmers call this "breaking the package".

If you make such a backwards incompatible change, you should increment the `MAJOR` number and reset the other numbers.
For example if you release a big update of a package with the version `1.32.2` where you change a lot of function signatures you should update the version to `2.0.0`.

If you add functionality in a backward compatible manner, you should increment the `MINOR` number and reset the `PATCH` number.
For example if you release an update of a package with the version `1.32.2` and you add a couple of new functions you should update the version to `1.33.0`.

If you just make backward compatible bug fixes, you should increment the `PATCH` number.
For example if you release an update of a package with the version `1.32.2` and you fix a bug in one of your functions you should update the version to `1.32.3`.

The `main` field can be used to specify the entry point of your package.
This is the primary file that will be loaded if your package is required by a Node.js application.
Since we use ESM for our modules, we will also need to specify `"type": "module"` in our `package.json`.

For example, if we want `index.js` to be the entry point of our package, we would need to specify the following `package.json` file:

```json
{
  "name": "example-package",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js"
}
```

Next let's create an ESM module `index.js`:

```js
export function greet(name) {
  console.log(`Hello ${name}`);
}
```

You can now use the `greet` function of your package in other packages that import it.

> We will show an example of this in a second.

### Installing Dependencies

To install dependencies you will need a package manager like `npm` or `pnpm`.
The main difference between these is that `pnpm` stores packages globally meaning that if multiple projects use the same package, `pnpm` will only store it once and then link to it as needed.

There is also a difference between dependencies and "dev" dependencies.
Regular dependencies are packages that your project needs to run.
"Dev" dependencies are packages that are only needed during development or testing.
These will not be included in a production build.

You can install a dependency by running `pnpm add $PACKAGE_NAME` in the project directory.
You can install a "dev" dependency by running `pnpm add --save-dev $PACKAGE_NAME`.

Let's install the `lodash` dependency which is a widely used utility library:

```js
pnpm add lodash
```

The dependency now will appear in your `package.json`:

```json
{
  "name": "example-package",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

You will also see a `pnpm-lock.yaml` which specifies the locked package versions:

```yaml
lockfileVersion: '6.0'

settings:
  autoInstallPeers: true
  excludeLinksFromLockfile: false

dependencies:
  lodash:
    specifier: ^4.17.21
    version: 4.17.21

packages:
  /lodash@4.17.21:
    resolution:
      {
        integrity: sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg==,
      }
    dev: false
```

The actual package will be located in the `node_modules` directory (namely at `node_modules/lodash`).

> Don't be afraid of the `node_modules` directory.
> There is no black magic there - `node_modules` simply contains the code of the dependencies you've installed.
> In fact, we encourage you to browser through the `node_modules/lodash` directory and realize that it's just regular JavaScript code.

Let's now use `lodash` in our `index.js`:

```js
import _ from 'lodash';

console.log(_.capitalize('hello, world'));
```

Execute the file by running `node index.js`.
This should output:

```
Hello, world
```

### Scripts

To simplify running scripts, the `package.json` allows you to define a `scripts` field:

```json
{
  "name": "example-package",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "dependencies": {
    "lodash": "^4.17.21"
  },
  "scripts": {
    "greet": "node index.js"
  }
}
```

Now you can run:

```
pnpm run greet
```

This will again output `Hello, world`.

The `scripts` mechanism becomes especially useful if you need to execute a long chain of commands.
Instead of repeating the chain of commands over and over again, you can specify a script and then just run that script.

### Publishing Packages

Let's return to our package from the beginning of this section.

We had this `package.json` file:

```json
{
  "name": "example-package",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js"
}
```

And we had this ESM module `index.js`:

```js
export function greet(name) {
  console.log(`Hello ${name}`);
}
```

What if we want to make this package available to other people?
We could **publish** our package to the npm repository.
This is in fact where we pulled the `lodash` package from earlier.

> Please don't actually publish this silly example package to the npm repository.
> It is already plenty polluted as it is.
> However the steps outlined below will be useful to you, if you plan to actually publish something interesting.

The publishing process is pretty simple:

First, you need to create an account at `npmjs.com`.

Second, you need to log in to your account in your terminal by running:

```sh
npm login
```

Third, you will need to publish the package by running:

```sh
pnpm publish --access public
```

After you're done, you can verify that the package was published successfully by going to `https://www.npmjs.com/package/$YOUR_PACKAGE_NAME`.
