# Writing the API

## Our tasks

For now we will store our tasks in a global variables named `tasks`.
Note that this is something we don't want to do in the final version of our application.
The reason for that is pretty obvious - every time we stop our server, we will lose the contents of the `tasks` variable.
We will learn how to persistently save the tasks to a database in the next chapter.
But for now let us just focus on building a web API using Express.

Let us create the `tasks` variable together with a bunch of tasks.
We simply use a dictionary, where every the keys are unique task IDs and the values are the task objects.
Every task object will have the `summary` and `description` fields.
These should be fairly self-explanatory.
Here is how our first version of `app.js` looks like:

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

const tasks = {
  '00b2a368-5269-4cee-9cdc-efab98f8b54a': {
    summary: 'Read the MERN book',
    description: 'Read and understand the MERN book.',
  },
  'd7b74e8f-34bc-4c11-9260-9369102c53f6': {
    summary: 'Write a task app',
    description: 'Write an awesome task app.',
  },
};

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
```

Note that there are currently no routes present - we will add them in a second.

## An intermezzo regarding UUIDs

The task IDs we use here are so called UUIDs - short for **universally unique identifiers**.
Such an ID can be easily generated randomly and is, for all practical purposes, unique.
This means that if you generate a UUID for your application, it has never been generated before - therefore UUIDs are a good way of, well, uniquely identifying a resource.
There are multiple variants of UUIDs - here we use UUIDv4, which is just a special way of creating UUIDs.

When we create a new task later on, we will need to automatically generate new UUIDs.
For that we can use the `uuid` package.
Install it by running:

```javascript
npm install uuid
```

Now we can generate UUIDs as follows:

```javascript
const { v4: uuidv4 } = require('uuid');
const generatedId = uuidv4();
console.log(generatedId);
```

This will print a UUID.
In fact this is how the IDs of the two tasks in the `tasks` variable were generated.

There are many other versions of unique IDs, some of which we will return to later.

## REST and CRUD

There are two words you will hear very often when people talk about web APIs and the like - REST and CRUD.

**REST** is short for "Representational State Transfer" and outlines guidelines for managing communications between clients and servers.
If you read about REST online, there will be a lot of verbose language like "layered system architecture" or "code on demand".
However, at its core a REST API is about writing requests that ask for resources using some kind of uniform resource identifier (like UUIDs) and receiving a representation of those resources.
For example, a client might ask for the task with the UUID `d7b74e8f-34bc-4c11-9260-9369102c53f6` and receive a representation of the respective task which might look as follows:

```json
{
  "summary": "Write a task app",
  "description": "Write an awesome task app."
}
```

**CRUD** stands for "Create, Read, Update, Delete" and describes the four basic operations most simple web APIs will support.
For example, we might want to:

- create a new task
- read the contents of a task (by its UUID)
- update a task (e.g. with a new summary or description)
- delete a task

CRUD maps very nicely to HTTP, because you can use

- POST requests for creating
- GET requests for reading
- PUT requests for updating (although POST is commonly used as well for this purpose)
- DELETE requests for deleting

Together REST and CRUD will guide the design of our web API.

## GET routes to obtain the tasks

We will write two GET routes.
The `/task` GET route will return all tasks as a JSON dictionary.
The `/task/:id` GET route will return the task by its ID.
For example `/task/d7b74e8f-34bc-4c11-9260-9369102c53f6` will return a JSON representing the first task.
Here is the `/task` route:

```javascript
app.get('/task', (req, res) => {
  res.send(tasks);
});
```

> Just like in chapter 3.1, you should put the all the routes above the call to `app.listen`.

The second route is a bit more complex since it is a **dynamic route**, i.e. it takes additional parameters (namely the task ID).
Lucky for us, Express has support for dynamic routes.
We can use `req.params` to get the named URL segments (like an ID).
Let us take the following GET route:

```javascript
app.get('/users/:userId/tasks/:taskId/subtasks/:subTaskId', (req, res) => {
  res.send(req.params);
});
```

If we try to query `/users/1/tasks/2/subtasks/3` this route will be matched and `req.params` will be the following dictionary:

```javascript
{ userId: '1', taskId: '2', subTaskId: '3' }
```

> Try adding `console.log(req.params)` to see the contents of `req.params`.
> As a general side note - `console.log` is a very useful tool if you want to peek into the contents of a value to understand its structure.

Based on this, the `/task/:id` route should look as follows:

```javascript
app.get('/task/:id', (req, res) => {
  const taskId = req.params.id;
  res.send(tasks[taskId]);
});
```

Now that you have created the two routes, start the server with `node app.js`.
If you navigate to `http://localhost:3000/task`, you will see:

```json
{
  "00b2a368-5269-4cee-9cdc-efab98f8b54a": {
    "summary": "Read the MERN book",
    "description": "Read and understand the MERN book."
  },
  "d7b74e8f-34bc-4c11-9260-9369102c53f6": {
    "summary": "Write a task app",
    "description": "Write an awesome task app."
  }
}
```

If you navigate to `http://localhost:3000/task/d7b74e8f-34bc-4c11-9260-9369102c53f6`, you will see the second task:

```json
{
  "summary": "Write a task app",
  "description": "Write an awesome task app."
}
```

## A POST route to create tasks

To create a task, we will use a POST route.
Remember that we obtain the data from the POST body by accessing `req.body`.
We need to generate random task IDs when creating a task, so don't forget to `require` the `uuid` module.

```javascript
const express = require('express');
const { v4: uuidv4 } = require('uuid');

// ... your code ...

app.post('/task', (req, res) => {
  const taskId = uuidv4();
  tasks[taskId] = { summary: req.body.summary, description: req.body.description };
  res.send(tasks[taskId]);
});
```

We return `tasks[taskId]` because it is customary to return the newly created resource when the request creates a new resource.

Here is the curl command to create a new task:

```sh
curl -X POST -H "Content-Type: application/json" -d '{"summary": "Think of a funny joke", "description": "Come up with a funny joke to lighten the mood."}' http://localhost:3000/task
```

If you create the `/task` GET route, you will see that an additional task is now present.

## A PUT route to update tasks

We can update a task via a PUT request:

```javascript
app.put('/task/:id', (req, res) => {
  const taskId = req.params.id;
  tasks[taskId].summary = req.body.summary;
  tasks[taskId].description = req.body.description;
  res.send(tasks[req.params.id]);
});
```

Here is a `curl` command that updates the task with the ID `d7b74e8f-34bc-4c11-9260-9369102c53f6` to change its summary and description:

```sh
curl -X PUT -H "Content-Type: application/json" -d '{"summary": "Do something else", "description": "Make something interesting happen."}' "http://localhost:3000/task/d7b74e8f-34bc-4c11-9260-9369102c53f6"
```

## A DELETE route to delete tasks

We can delete tasks via a DELETE request:

```javascript
app.delete('/task/:id', (req, res) => {
  const deletedTask = tasks[taskId];
  delete tasks[taskId];
  res.send(deletedTask);
});
```

Here is a `curl` command that deletes the task with the ID `d7b74e8f-34bc-4c11-9260-9369102c53f6`:

```sh
curl -X DELETE http://localhost:3000/task/d7b74e8f-34bc-4c11-9260-9369102c53f6
```

## Error handling

Theoretically all the routes are in place now, but if you would submit this server for a review by your fellow developers, they would probably not approve of this (and not just because we are storing the tasks in a global variable instead of using a database).
The reason for that is we have no error handling.
Essentially our application assumes that the user of our API will submit only valid requests and nothing bad will ever happen.

_This is a terrible assumption to make and if you make this assumption, inevitable sleepless nights await you._

_We are dead serious._

Programming that assumes nothing bad will ever happen is called _happy path programming_.
The **happy path** is the "default" program workflow, where nothing exceptional happens.
In our current implementation of the API we assume that the user will never do anything wrong, like trying to read a task with an ID that doesn't exist.
But of course that will inevitably happen.
Therefore let us make our API robust against such accidents.

First, we should check that the ID the user is trying to view is valid.
If the ID does not exist, we will return a response with status code 404, which means "Not found".

```javascript
app.get('/task/:id', (req, res) => {
  const taskId = req.params.id;
  if (!(id in tasks)) {
    res.sendStatus(404);
  }
  res.send(tasks[taskId]);
});
```

We will need similar checks when trying to update or delete an ID.
This is the new PUT route:

```javascript
app.put('/task/:id', (req, res) => {
  const taskId = req.params.id;
  if (!(taskId in tasks)) {
    res.sendStatus(404);
  }
  tasks[taskId].summary = req.body.summary;
  tasks[taskId].description = req.body.description;
  res.send(tasks[taskId]);
});
```

And this is the new DELETE route:

```javascript
app.delete('/task/:id', (req, res) => {
  const taskId = req.params.id;
  if (!(taskId in tasks)) {
    res.sendStatus(404);
  }
  const deletedTask = tasks[taskId];
  delete tasks[taskId];
  res.send(deletedTask);
});
```

There is one more problem we need to address.
Currently our POST and PUT requests assume that `summary` and `description` will always be present in the body.
But what if the user submits a POST request without these fields?
In that case the task will not be updated or created correctly.
Therefore we should check for the presence of the `summary` and `description` fields in the POST body and return a status code 400 (Bad Request) in case these fields are missing.
For example this is how the new and improved PUT request might look like:

```javascript
app.put('/task/:id', (req, res) => {
  const taskId = req.params.id;
  if (!(summary in req.body) or !(description in req.body)) {
  	res.sendStatus(400);
  }
  if (!(taskId in tasks)) {
  	res.sendStatus(404);
  }
  tasks[taskId].summary = req.body.summary;
  tasks[taskId].description = req.body.description;
  res.send(tasks[taskId]);
});
```

Later we will learn a more intelligent way to validate fields in POST request bodies without all this boilerplate, but for now this will do.

We have a working API now (except for that thing with the global variable which we will replace in chapter 4)!
Now our client has to actually use it, so let us go ahead and make some changes to the client.
