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
This defines that any version of a package (or library) should have the format `MAJOR.MINOR.PATCH`.
Whenever you update a package, you should increment one of these.

If you make backward incompatible API changes, you should increment the `MAJOR` number.
For example if you release a big update of a package with the version `1.32.2` where you change a lot of function signatures you should update the version to `2.0.0`.

If you add functionality in a backward compatible manner, you should increment the `MINOR` number.
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

Next let's create an ESM module:

```js
export function greet(name) {
  console.log(`Hello ${name}`);
}
```

You can now use the `greet` function of your package in other packages that import it.

> We will show an example of this in a second.

### Installing Dependencies

To install dependencies you will need a package manager like `npm` or `pnpm`.
The main difference between these is that `pnpm` stores packages globally meaning that if multiple projects use the same package, `pnpm` will only store it once and the link as needed.

There is also a difference between dependencies and "dev" dependencies.
Regular dependencies are package that your project needs to run.
"Dev" dependencies are packages that are only needed during development or testing.
These will not be included in a production build.

You can install a dependency by running `pnpm add $PACKAGE_NAME`.
You can install a "dev" dependency by running `pnpm add --save-dev $PACKAGE_NAME`.

Let's install the `lodash` dependency which is a widely used utility library:

```js
pnpm add lodash
```

The dependency will appear in your `package.json`:

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

The actual package will be located in the `node_modules` directory (namely `node_modules/lodash`).

> Don't be afraid of the `node_modules` directory.
> There is no secret sauce - it simply contains the code of the packages you've installed.

Let's now use a function of `lodash` in our `index.js`:

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
