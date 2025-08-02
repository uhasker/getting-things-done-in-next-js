## Asynchronous Programming

<div style="text-align: right"> <i> — proverb Ancient Chinese <br> is hard Asynchronous programming </i> </div>

### Why Asynchronous Programming?

We often need to execute long-running operations (especially in web development).

For example, we might need to fetch a resource from a server or request camera access from a user.
In the first case, we need to wait for all the network packets to arrive, which might take a long time depending on the quality of your network (especially if you happen to live in Germany).
In the second case, we need to wait for the user to grant us access to the resource we require.

We want to be able to execute such long-running operations without "blocking".
To accomplish this, we need to break up with our current "synchronous" programming model where statements are executed one after another.

Consider the following "synchronous" example:

```js
function getUser(userId) {
  return `User with ID ${userId}`;
}

const user = getUser(0);
console.log(user);
```

The `getUser` function is a **synchronous function**.
This means that the calling code (`const user = getUser(0)` in this case) has to wait until `getUser` has finished its work to continue.
That is all fine and dandy here, given that `getUser` should (hopefully) complete its work quite quickly.

But what if `getUser` represents a long-running operation, like retrieving a user from a remote server?

```js
function getUser(userId) {
  return retrieveUserFromServer(userId);
}

const user = getUser(0);
console.log(user);
```

Now the calling code has to wait for the network request to complete before it can do anything else.

This is potentially a huge problem in the browser environment, given that synchronous functions like `getUser` are "blocking".
Therefore, as long as `getUser` is executing, no other code will be able to run, including code that handles user events.
In practical terms, this means that the user will not be able to select text, click buttons or do anything else with the website, i.e. the website will "hang".

Of course, we want to avoid such a nuisance since this will result in the much-dreaded _negative user experience_.

> If you've ever clicked a button on a website and everything just freezes for three seconds, this is probably the result of a synchronous function being used to handle a long-running operation.

We therefore need a mechanism to start a (potentially) long-running operation and still be able to do other things (like respond to user events) instead of blocking until the operation is finished.
Once the operation is completed, our program also needs to be notified with the result of the long-running operation.

Here is a step-by-step breakdown of what we want to accomplish:

1. Call a function that starts a long-running operation.
2. The function should return immediately, so that the "main" program is able to do something else.
3. Once the long-running operation is completed, the "main" program should be notified with the result of the long-running operation.

> In case you think to yourself right now "this all sounds very complicated and when do I need long-running operations anyway, maybe I'll skip this section"—don't.
> Practically every project you'll write (essentially when doing web development) will contain a lot of asynchronous code.

### Promises

The central object in asynchronous JavaScript is the **promise**.
A promise represents the eventual completion (or failure) of an asynchronous operation.
Now, that you're sufficiently confused by this opaque definition, we can move on to an actually useful explanation.

Basically, a promise is like an IOU document—it "promises" you that it's currently working on some long-running operation and that it will eventually get back to you with the result of that long-running operation.

To give another metaphor, consider the process of ordering a hamburger at SyncMcBurgers.
For simplicity (and improved metaphormaking), we will pretend that SyncMcBurgers only has a single counter.

In a perfect “synchronous” world, you would walk up to the counter, tell your order to the hardworking employee of the restaurant and then they would immediately create the hamburger right then and there.
However, unless SyncMcBurgers has rediscovered the ancient secret art of instant burgermaking using dark magic, the preparation of a hamburger doesn't happen immediately (it's a "long-running operation").

Therefore, in reality the following process happens when you try to order something at SyncMcBurgers.
You walk up to the counter and the employee takes your order (a hamburger) and starts preparing the hamburger right there at the counter in front of you.
In the meantime, you have to wait at the counter until the hamburger is finished.

This process has an obvious problem—both you and the employee now block the entire restaurant from doing anything else (remember, there is only a single counter).
No other customer can try to order anything (because you're standing at the counter) and no other employee can take an order anyway (because the employee serving you is blocking the counter with his hamburger preparation).
This doesn't sound like a recipe for success.

After a while the restaurant owners realize this, there is a change in management and SyncMcBurgers rebrands as AsyncMcBurgers.
The important difference between SyncMcBurgers and the new and improved AsyncMcBurgers is a change in the burger ordering process.

> There is still only one counter though.
> After all, even the new management at AsyncMcBurgers wants to respect our metaphor.

The new process looks as follows.
You walk up to the counter, an employee takes your order and hands it to the kitchen.
Instead of the burger, they hand you a receipt, which is a _promise_ (get it?) that you will get your burger after some time.
Now you don't have to stand in front of the counter waiting for the employee to finish making the burger.
Instead, you take your receipt, leave the counter and the next customer may order.

In case you missed it, this is how every normal fast food restaurant in the world operates—and for good reason (except that normal fast food restaurants usually have more than a single counter).

Armed with these examples, we can now actually understand the definition of a promise.

Again, a promise _represents the eventual completion (or failure) of an asynchronous operation_.

In this example, the asynchronous operation is the preparation of the hamburger.
This asynchronous operation will eventually complete (the hamburger will be prepared) or fail (there will be a problem during the hamburger preparation).
The order receipt that you get represents the eventual (i.e. probably not immediate) completion of the burger preparation.

Now, we can also introduce the three states a promise can be in:

We say that a promise is **pending** when it has been created, but the asynchronous operation it represents has not been completed yet.
This would be the case when you already received the order receipt but you're still waiting for the hamburger.

We say that a promise is **fulfilled** when the asynchronous operation it represents has been successfully completed.
This would be the case when the hamburger has been successfully prepared and handed to you.

We say that a promise is **rejected** when the asynchronous operation it represents has failed.
This would be the case when (for example) the kitchen spontaneously combusts due to the ongoing AsyncMcBurger dark magic experiments in the backroom lab.

Promises also allow us to associate **handlers** (also called handler functions) with the eventual success or failure.
For example, we could say that when the hamburger is prepared, we want to eat it (or throw it in the trash, which might actually be the preferable alternative in some cases).

### Working with Promises in JavaScript

Let's work through an example—fetching a resource from a server via HTTP.
The HTTP protocol will be discussed in more detail later, but basically it enables us to send a request to a server and get a response.
Since network packets don't arrive immediately, this can take a while, so we are dealing with a "long-running operation" here.

Both the browser as well as Node.js allow us to retrieve a resource from the network via the asynchronous `fetch` function.
The `fetch` function returns a promise and we can then schedule a callback to be executed when the promise has succeeded by using the `then` method.

Here is how this looks in code:

```js
const url = 'https://jsonplaceholder.typicode.com/todos/1';
const fetchPromise = fetch(url);
fetchPromise.then((response) => console.log(response));
console.log(fetchPromise);
```

> This code is unnecessarily verbose right now, we will fix this in a second.
> Also, we wouldn't normally log the `fetchPromise` object, we're just doing this for illustration purposes right now.

This is what happens:

1. We call `fetch` which _immediately_ returns a _pending_ promise.
2. The `then` method allows us to register a handler function that should be called once the promise has been fulfilled.
   In this case, we register a simple handler function `(response) => console.log(response)` that logs the response.
3. After a while the `fetch` succeeds, `fetchPromise` is (hopefully) fulfilled and the `response` object is logged.

It's important to note that `fetch` returns _immediately_.
The return value of `fetch` is a pending promise (that will eventually settle with either a response value or some kind of error).

This is why `console.log(fetchPromise)` is executed _before_ `console.log(response)` and you'll see the following output in the console:

```
Promise { <pending> }
Response {
    ...
}
```

Additionally, the `then` method _also_ returns immediately after it has attached the handler function to the `fetchPromise`.
However, the execution of the _handler function_ happens only after the promise returned by fetch is fulfilled.

On one hand, this is what we want—while we are waiting for the network request to complete, we can do other stuff (like logging `fetchPromise`).

On the other hand, this is the reason why asynchronous programming is often so confusing to beginners—it "breaks" the regular programming model.

When we write synchronous code, we just execute statements one after another.
If line A comes before line B in synchronous code, then line A will also be executed before line B in synchronous code.

With asynchronous code this is no longer the case—here we "register" a function to be executed later, do something else, and then at some point the registered function is executed.
This means that even if line A comes before line B in asynchronous code, it's quite possible that line A will be _executed after_ line B.
Therefore, you have to be very careful when reading and writing asynchronous code.

Finally, we note that our code can be rewritten in a simpler way:

```js
const url = 'https://jsonplaceholder.typicode.com/todos/1';
fetch(url).then((response) => console.log(response));
```

### Chaining Promises

The `response` object is not terribly useful by itself.
Let's retrieve the "actual" response which is a JSON object.
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

Your first instinct might be to write something like this:

```js
const url = 'https://jsonplaceholder.typicode.com/todos/1';
const fetchPromise = fetch(url);
const jsonPromise = fetchPromise.then((response) => {
  const jsonPromise = response.json();
  jsonPromise.then((json) => console.log(json));
});
```

This is _technically_ not wrong, but it's very ugly.
Basically, every time we need to add an asynchronous operation to our code that depends on the result of a previous asynchronous operation, we would need to add one level of nesting which will quickly become unreadable.

Luckily for us, the benevolent god-emperors of JavaScript have eliminated this problem by making `then` return a promise that "resolves" to the result of the handler function.
Therefore, instead of nesting promises, we can _chain_ promises:

```js
const url = 'https://jsonplaceholder.typicode.com/todos/1';
const fetchPromise = fetch(url);
const jsonPromise = fetchPromise.then((response) => response.json());
jsonPromise.then((json) => console.log(json));
```

This is (quite appropriately) called **promise chaining**.

Here is what happens when we call this code:

1. The `fetch` method immediately returns a pending promise `fetchPromise`.
2. The `then` method of `fetchPromise` attaches the handler function `(response) => response.json()` to the `fetchPromise` and also immediately returns.
   This time the return value is the pending promise `jsonPromise`.
3. The `then` method of `jsonPromise` attaches the handler function `(json) => console.log(json)` and also immediately returns another pending promise (which we ignore here).
4. After a while, the network request initiated by `fetch` finishes and `fetchPromise` is fulfilled (with a `Response` object as its fulfillment value).
5. Now that `fetchPromise` is fulfilled, the handler function `(response) => response.json()` is kicked off and attempts to parse the response as a JSON object.
   At some point, the JSON parsing is finished and `jsonPromise` is fulfilled.
6. Now that `jsonPromise` is fulfilled the handler function `(json) => console.log(json)` is kicked off and the JSON object is logged to the console.

A promise chain is basically executed in two stages.

In the first stage, the promises are set up and the handler functions are attached using the `then` method.
This stage happens immediately.

In the second stage, the promises are settled and the attached handler functions are actually executed.
This stage can take quite some time, depending on how long the operations we want to accomplish take.

> This explanation is the most important part of this entire section.
> You should pause and think about this promise chain for a second (or maybe even multiple seconds).
> If you understand this point, you (mostly) understand asynchronous programming.

Finally, we can rewrite our promise chain to be a bit more elegant:

```js
const url = 'https://jsonplaceholder.typicode.com/todos/1';
fetch(url)
  .then((response) => response.json())
  .then((json) => console.log(json));
```

### Handling Errors

The above code is completely missing one very important point—error handling.
Most long-running operations (especially those that involve external resources like a network or a file system) can fail.
For example, `fetch` will fail and `fetchPromise` will thus be rejected if your network is down.

You can test this—turn off your WiFi and execute the above code again.
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
We can simply add a catch handler to the end of our promise chain—it will be called when any of the asynchronous operations fail:

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
Instead of just crashing, your program can now do something else (like showing an error modal to the user and informing them that something went wrong).

### The `async` and `await` Keywords

Promises are great, but as discussed, they are not completely intuitive.
We can use `async` and `await` keywords to simplify asynchronous code and make it look more like synchronous code.

Instead of using the `then()` method, we can use the `await` keyword to wait for a promise and get its fulfillment value.
This looks as follows:

```js
const response = await fetch(url);
```

Just like `then()`, this will _not_ block the main program.
Instead, the function containing the `await` will be "paused" until the awaited promise is fulfilled or rejected.
After that, the function will be "resumed" again.

Functions that contain `await` statements have to be marked as `async`.

Here is how we can rewrite our task fetching code to use `async` and `await`:

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

// Note that for some runtimes you can only use "await" inside an "async" function.
// Therefore, our main code still uses the regular then() method.
const url = 'https://jsonplaceholder.typicode.com/todos/1';
fetchTask(url).then((json) => console.log(json));
```

## The `void` Operator

The `void` operator evaluates an expression and returns `undefined`.
This can be used with promises if you simply want to start an asynchronous operation, but you don't care about the result:

```js
void fetchTask(url);
```
