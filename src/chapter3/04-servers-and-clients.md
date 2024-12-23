## Servers and Clients

<div style="text-align: right"> <i> TODO. <br> — Seconds before disaster </i> </div>

### Basics

We've already discussed servers and clients at the beginning of this chapter.
Additionally, we wrote a server and even used a few clients (like our browser and the `curl` tool).

However, because this is such an important concept we will use this section to cover a complete and standalone example of a server-client setup.

Remember our definition of servers and clients:

> **Servers** and **clients** are nothing more than regular programs (like the ones you saw in the first chapter).
> For example, a server might be a JavaScript program that waits for HTTP requests and sends back HTTP responses.
> A client might be a browser on your laptop or your phone—it might even be a regular script.
> Often, the term "server" is also used to refer to the actual machine the software is running on.

We've also discussed that we will often need to transmit data from the client to the server (and the other way around).
When writing a web application, the most common way to do so is by using the HTTP protocol.

Let's now dive into an example.
We will create a simple server that exposes an API to add and list tasks and a simple client that uses the API.

### Building the Server

First, we will create the server.

Create a new directory named `server` and enter it:

```sh
mkdir server
cd server
```

Initialize a new project and add the `express` dependency to it:

```sh
pnpm init
pnpm add express
```

Now, create an `app.js` file.

Here, we will create an express `app` that will listen on port `3000`.
We will also add a JSON middleware and a list that will store the added tasks:

```js
const express = require('express');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// In-memory store for tasks
const tasks = [];

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

Next, we need two routes—a `GET` route for listing all tasks and a `POST` route for adding a new task.
This is nothing new, we've already covered how to do this in the previous sections:

```js
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const task = { id: tasks.length + 1, name };
  tasks.push(task);
  res.status(201).json(task);
});
```

Here is how the full server code looks like:

```js
const express = require('express');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// In-memory store for tasks
const tasks = [];

// Routes
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const task = { id: tasks.length + 1, name };
  tasks.push(task);
  res.status(201).json(task);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

Start the server by running:

```sh
node app.js
```

### Building the Client

Return to the top-level directory, create a new directory named `client` and enter it:

```sh
mkdir client
cd client
```

Initialize a new project and add the `node-fetch` dependency to it.
This will allow us to use the `fetch` function in Node.js:

```sh
pnpm init
pnpm add node-fetch
```

Finally, add `{"type": "module"}` to the `package.json` file.

Next, we will write a script `client.js` that will contain a CLI that allows us to list all tasks and add a task:

```js
import fetch from 'node-fetch';

const baseUrl = 'http://localhost:3000/';

async function listTasks() {
  // Make a GET request to `${baseUrl}/tasks`
}

async function addTask(name) {
  // Make a POST request to `${baseUrl}/tasks`
}

function showHelp() {
  console.log(`
Usage:
  node client.js list               List all tasks
  node client.js add <name>         Add a new task
`);
}

const args = process.argv.slice(2);

if (args.length === 0) {
  showHelp();
} else if (args[0] === 'list') {
  listTasks();
} else if (args[0] === 'add' && args[1]) {
  addTask(args[1]);
} else {
  showHelp();
}
```

To make the requests, we will use the `fetch` function that we've already discussed in the JavaScript chapter.
You already know how to make a `GET` request:

```js
async function listTasks() {
  try {
    const response = await fetch(`${baseUrl}/tasks`);
    const tasks = await response.json();
    console.log('Tasks:', tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}
```

However, `POST` requests using `fetch` are a bit more complex.

First, we will need to explicitly set the `method` to `POST` inside the `fetch` function and pass the request body.

However, that's not all.
Since we want to pass a JSON in the request body, we will also need to explicitly specify that using the `Content-Type` header.

Therefore, this is how the `fetch` call should look like:

```js
await fetch(`${baseUrl}/tasks`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name }),
});
```

And this is how the `addTask` function will look like in the end:

```js
async function addTask(name) {
  try {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const task = await response.json();
    console.log('Added task:', task);
  } catch (error) {
    console.error('Error adding task:', error);
  }
}
```

For your reference, here is how the full client should look like:

```js
import fetch from 'node-fetch';

const baseUrl = 'http://localhost:3000/';

async function listTasks() {
  try {
    const response = await fetch(`${baseUrl}/tasks`);
    const tasks = await response.json();
    console.log('Tasks:', tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

async function addTask(name) {
  try {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const task = await response.json();
    console.log('Added task:', task);
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

function showHelp() {
  console.log(`
Usage:
  node client.js list               List all tasks
  node client.js add <name>         Add a new task
`);
}

const args = process.argv.slice(2);

if (args.length === 0) {
  showHelp();
} else if (args[0] === 'list') {
  listTasks();
} else if (args[0] === 'add' && args[1]) {
  addTask(args[1]);
} else {
  showHelp();
}
```

Let's now add a task using the client command line interface:

```sh
node client.js add example
```

This will output:

```
Added task: { id: 1, name: 'example' }
```

Let's also list the tasks using the CLI:

```sh
node client.js list
```

This will output:

```
Tasks: [ { id: 1, name: 'example' } ]
```

It works!
In reality, our client would not be a command-line client, but a client running in our browser.
Additionally, in practice we wouldn't store the tasks in an in-memory list (because this list would vanish once we stop the server).
Instead, we would persist our tasks in a database, which is what we will cover in the next chapter.
