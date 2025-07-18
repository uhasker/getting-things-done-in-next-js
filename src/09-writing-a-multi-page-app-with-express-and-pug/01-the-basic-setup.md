# The Project

## Project Setup

Create a new directory for the project:

```sh
mkdir easy-opus-mpa && cd easy-opus-mpa
```

Initialize the project:

```sh
pnpm init
```

Install the dependencies:

```sh
pnpm add express@5.1.0 pug@3.0.3
```

## The Basic Express App

Create a new file called `app.js`.

Now, add the following code to the file:

```js
const express = require('express');

const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

Add a simple Pug template in `views/index.pug`:

```pug
doctype html
html
  head
    title Easy Opus
  body
    h1= title
```

Now, add the following code to the `app.js` file:

```js
const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { title: 'Hello, World!' });
});
```
