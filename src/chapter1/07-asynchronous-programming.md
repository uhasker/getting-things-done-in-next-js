## Asynchronous Programming

<div style="text-align: right"> <i> - proverb Ancient Chinese <br> is hard Asynchronous programming </i> </div>

### Why Asynchronous Programming?

We often need to execute long-running operations (especially in web development).
For example, we might need to fetch a resource from a server or request camera access from a user.
In the first case, we need to wait for all the network packets to arrive, which might take a long time depending on your network connectivity.
In the second case, we need to wait for the user to grant us access to the resource we require.

We want do be able to do this without "blocking".
To accomplish this, we need to break with the "synchronous" programming model where statements are executed one after another.

Consider the following example:

```js
function getTask(taskId) {
  return `Task with ID ${taskId}`;
}

const task = getTask(0);
console.log(task);
```

The `getTask` function is a **synchronous function**.
This means that the calling code (i.e. `const task = getTask(0)`) has to wait until `getTask` has finished its work to continue.
That is all fine and dandy here, given that `getTask` should (hopefully) complete its "work" very fast.

But what if `getTask` represents a long-running operation, like retrieving a task from a server?

```js
function getTask(taskId) {
  return retrieveTaskFromServer(taskId);
}

const task = getTask(0);
console.log(task);
```

Now the calling code has to wait for the request to complete before it can do anything else.
This will become a huge problem in the browser environment, given that synchronous functions like `getTask` are "blocking".
Therefore as long as `getTask` is executing, no other code will be able to run, including code that handles user events.
This means that the user will not be able to select text, click buttons or do anything else with the website, i.e. the website "hangs".

Of course we want to avoid such a nuisance since this will result in the much dreaded _negative user experience_.

> If you ever clicked a button on a website and everything just freezes for three seconds, this often means that some developer wrote a synchronous function that handles a long-running task.

We need a mechanism to start a (potentially) long-running task and still be able to do other things (like respond to user events) instead of blocking until the task is finished.
Once the task is completed, our program needs to be notified with result.

Here is a step-by-step breakdown of what we want to accomplish:

1. Call a function that starts a long-running operation.
2. The function should return immediately, so that the "main" program is able to do something else.
3. Once the long-running operation is completed, the "main" program should be notified.

> In case you think to yourself right now "this all sounds very complicated and when do I need long-running tasks anyway, maybe I'll skip this section" - don't.
> Almost every project you'll write (essentially when doing web development) will contain asynchronous code.

### Promises

The central object in asynchronous JavaScript is the **promise**.
A promise represents the eventual completion (or failure) of an asynchronous operation.

Basically a promise is a like an IOU document - it "promises" you that it is currently working on some long-running operation and that it will eventually get back to you with the result of that long-running operation.

If you want another metaphor, you can think about how you would order a hamburger at a fast food restaurant.
In the “synchronous” world, you would walk up, tell your order to the hardworking employee of the restaurant and then immediately receive your hamburger.
However since the preparation of a hamburger does not happen immediately (it's a "long-running operation"), the synchronous approach would block both you and the kitchen from doing something else.

Instead the employee hands you an order receipt with a number.
That order receipt is the promise that represents the eventual completion of the asynchronous operation (preparing your hamburger).

We say that a promise is **pending** when it has been created, but the asynchronous operation it represents has not been completed yet.
We say that a promise is **fulfilled** when the asynchronous operation it represents has been successfully completed.
Finally a promise is **rejected** when the asynchronous operation it represents has failed.

### Working with Promises in JavaScript

Let's work through an example - fetching a resource from a server via HTTP.
The HTTP protocol will be discussed in more detail later, but basically it enables us to send a request to a server and get a response.
Since network packets don't arrive immediately, this can take a while, so we are dealing with a "long-running operation".

Both the browser as well as Node.js allow us to retrieve a resource from the network via the asynchronous `fetch` function.
Consider this example:

```js
const url = 'https://jsonplaceholder.typicode.com/todos/1';
fetch(url).then((response) => console.log(response));
```

This will log the response object we get from `https://jsonplaceholder.typicode.com/todos/1` to the console (we will learn how to deal with this response object in a second).

We can rewrite the above example in a more explicit manner:

```js
const url = 'https://jsonplaceholder.typicode.com/todos/1';
const fetchPromise = fetch(url);
fetchPromise.then((response) => console.log(response));
console.log(fetchPromise);
```

This is what happens:

1. We call `fetch` which _immediately_ returns a _pending_ promise.
2. We pass a handler function into the `then` method.
   The handler function will be called when the `fetch` succeeds (i.e. the promise returned by `fetch` is fulfilled).
3. After a while the `fetch` succeeds, `fetchPromise` is fulfilled and the `response` object is logged.

Note that because `fetch` returns immediately `console.log(fetchPromise)` is executed before `console.log(response)`.
This is why you see the following output in your console:

```
Promise { <pending> }
Response {
    ...
}
```

On one hand this is what we want - while we are waiting for the network request to complete, we can do other stuff (like logging `fetchPromise`).

On the other hand this is the reason why asynchronous programming is often so confusing to beginners - it "breaks" the regular programming model.
When we write synchronous code, we just execute statements one after another.
With asynchronous code this is no longer the case - here we "register" a function to be executed later, do something else, and then at some point the registered function is executed.

> You should pause and think about this for a second.
> If you understand this point, you (mostly) understand asynchronous programming.

### Chaining Promises

The `response` object is not terribly useful.
Let's retrieve the "actual" response which is a JSON object.
JSON is a data format for data exchange (e.g. on a network) and can basically store arbitrary JavaScript objects.
Here is how the JSON we get from `https://jsonplaceholder.typicode.com/todos/1` looks like:

```json
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

The `response` object has a `json` method to retrieve the JSON contained in a response.
However, the `json` method is also asynchronous, so we are again dealing with promises.

Your first instinct would be to write something like this:

```js
const url = 'https://jsonplaceholder.typicode.com/todos/1';
const fetchPromise = fetch(url);
const jsonPromise = fetchPromise.then((response) => {
  const jsonPromise = response.json();
  jsonPromise.then((json) => console.log(json));
});
```

This is _technically_ not wrong, but it's ugly.
Basically every time we need to add an asynchronous operation to our code that depends on the result of a previous asynchronous operation, we would need to add one level of nesting which will quickly become unreadable.

Luckily for us, the benevolent god-emperors of JavaScript have eliminated this problem by making `then` return a promise that "resolves" to the result of the handler function.
Therefore instead of nesting promises, we can **chain** promises:

```js
const url = 'https://jsonplaceholder.typicode.com/todos/1';
const fetchPromise = fetch(url);
const jsonPromise = fetchPromise.then((response) => response.json());
jsonPromise.then((json) => console.log(json));
```

This is called **promise chaining**.

We can rewrite this to be a bit more elegant:

```js
const url = 'https://jsonplaceholder.typicode.com/todos/1';
fetch(url)
  .then((response) => response.json())
  .then((json) => console.log(json));
```

### Handling Errors

The above code is missing error handling.
Most long-running operations (especially those that involve external resources like a network or a file system) can fail.
For example `fetch` can fail if your network is down.

You can turn off your network and execute the above code again.
You will get a weird error that looks approximately like this:

```
TypeError: fetch failed
    at Object.fetch (node:internal/deps/undici/undici:11457:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  cause: Error: getaddrinfo EAI_AGAIN jsonplaceholder.typicode.com
      at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:107:26) {
    errno: -3001,
    code: 'EAI_AGAIN',
    syscall: 'getaddrinfo',
    hostname: 'jsonplaceholder.typicode.com'
  }
}
```

Additionally, we will usually want to throw an error if `fetch` itself succeeds, but the status of the response is "not ok" (we will return to this in more detail in the section about HTTP):

```js
const url = 'https://jsonplaceholder.typicode.com/todos/1';
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
  })
  .then((json) => console.log(json));
```

We want to be able to catch all the errors that can happen and log an error message to the console.
The Promise API gives us the appropriately named `catch` method to accomplish this.
We simply add a catch handler to the end of our promise chain - it will be called when any of the asynchronous operations fail:

```js
const url = 'https://jsonplaceholder.typicode.com/todos/1';
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
  })
  .then((json) => console.log(json))
  .catch((error) => console.error(error));
```

Turn off your network and try running the `fetch` again.
You will now see an appropriately logged error.
Instead of just crashing, you program can now do something else (like showing an error modal to the user and informing him that something went wrong).

### Async and Await

Promises are great, but as discussed, the are not completely intuitive.
We can use `async` and `await` keywords to simplify asynchronous code and make it look more like synchronous code.
To this end, we can declare an `async` function and then use the `await` keyword to wait for a promise and get its fulfillment value:

```js
async function fetchTask(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`Could not fetch URL ${url}`);
  }
}

const url = 'https://jsonplaceholder.typicode.com/todos/1';
fetchTask(url).then((json) => console.log(json));
```

Note that you can only use `await` inside an `async` function (unless your code is in a so called "module").
This why we have to use `then` with `fetchTask` instead of `await`ing the promise returned by `fetchTask`.

### Summary

You learned about asynchronous programming.
You learned how to create promises, chain promises, handle errors in promise chains and how to simplify asynchronous code by using the async and await keywords.
