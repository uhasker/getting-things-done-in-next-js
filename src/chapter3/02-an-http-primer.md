## An HTTP Primer

<div style="text-align: right"> <i> Meh, who needs HTTPS. <br> — Seconds before disaster </i> </div>

### Servers and Clients

**Servers** and **clients** are nothing more than regular programs (like the ones you saw in the first chapter).
For example, a server might be a JavaScript program that waits for HTTP requests and sends back responses.
A client might be a browser on your laptop or your phone - it might even be a regular script.

> Often, the term "server" is also used to refer to the actual machine the software is running on.

The distinction between a client and a server is extremely important, because the location of our code (i.e. whether it's on the client or the server) will determine _what features we can use_.
We've already mentioned this in the JavaScript chapter.

For example, if your code runs on the client, you won't (for example) have access to the filesystem.
However, you will have access to various browser features.
For instance, you could add a new element, get the size of the browser window and so on.

If your code runs on the server, you will have access to the filesystem, but you won't have access to the browser features.
This makes sense since the browser is running on your client and the server (mostly) doesn't have access to it.

This also means that we will often need to transmit data from the client to the server (and the other way around).
When writing a web application, the most common way to do so is by using the HTTP procotol.

## Requests and Responses

The **HTTP protocol** is a **request/response protocol**, i.e. HTTP clients send requests to an HTTP server and receive responses in return.

> You have in fact already used the HTTP protocol.
> Pretty much every time you browse the internet, HTTP requests are sent under the hood.

The usual request-response lifecycle looks like this:

First, the user interacts with your web application, e.g. by submitting a form, clicking a button etc.

Second, the client sends an HTTP request to the server that contains information about resources to retrieve, data to send etc.

Third, the server receives the request, reads its data and then performs appropriate calculations, database queries and so on.
Afterwards, the server creates a response and sends it back to the client.

And, finally, the client looks at the response and determines how to update the UI (user interface).

## HTTPS

We should mention that nowadays developers never use plain HTTP in production.
Instead, they use the **HTTPS protocol**, which is encrypted HTTP.

HTTPS basically wraps HTTP in a layer of _encryption_ using a method called **TLS (Transport Layer Security)**.
This allows _encrypting_ your traffic such that an adversary spying on your network won't be able to read the content you're sending over the network.
This is a really good thing especially if we're talking something like your bank passwords—you certainly want to keep that information protected!

We won't cover HTTPS in more detail, since that will automatically be handled for us by our web hosting provider that we will use later on.

### HTTP and Express

We could use the built-in HTTP module of Node.js, but this is not terribly convenient.
Instead we will use an extremely popular framework called **Express**.
While Express builds on top of the HTTP module, it provides a lot of additional useful functionality.

Create a new Node.js project inside a directory on your computer:

```shell
pnpm init
```

Install Express:

```shell
pnpm add express
```

Create a file named `app.js` inside the directory.
In that file we will create an Express application and then make that application listen for connections on a specified host and port.

This is how you can create an Express application and make it listen on port `3000`:

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
```

This application is not very useful, so let's add a **route** to it.
Add the following code above the call to `listen`:

```javascript
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
```

Start the application:

```sh
node app.js
```

If you open a browser and navigate to `http://localhost:3000` you will see

```
Hello, world!
```

You can also use cURL, which includes a command-line tool for transferring data on a network.
Among other things it supports HTTP and is available on pretty much every mainstream operating system out there.

Open a command line and run:

```shell
curl http://localhost:3000/
```

This will output the following:

```
Hello, world!
```

Note that you will need to press <kbd>Ctrl</kbd> + <kbd>C</kbd> in your command line to stop the server.

### HTTP URLs

The string `http://localhost:3000/` is a so-called URL.
You have already seen URLs in the previous section.

Navigate to Google and search for "Next.js" - you will notice that the URL in your browser looks like this:

```
https://www.google.com/search?q=nextjs
```

For didactic reasons we will include the port:

```
https://www.google.com:443/search?q=nextjs
```

Generally speaking, a typical HTTP(s) URL has the following form:

```
scheme://host:port/path?key1=value1&key2=value2#fragment
```

> Note the word _typical_ here.
> HTTP URLs (and especially more general URLs) can become _much more_ complicated, but we will not cover all the little details in this book.
> In fact the complexity of URLs is often a source of subtle bugs and browser crashes.
> For example - at some point Android Chrome would [crash](https://news.ycombinator.com/item?id=28639708) when trying to open `http://../foo`.

Let's go over the individual component of a typical URL one by one.

The **scheme** usually indicates the protocol which describes how information should be transmitted.
We will almost exclusively use HTTP or HTTPS in this book.
Therefore, the scheme will almost always be either `http` or `https`.
In the above Google URL the scheme is clearly `https`.

You already learned about the **host** and the **port**—the host identifies the device you wish to connect to and the port is the communication endpoint on that device.
Note that the host could be a domain (like `www.google.com`) or an IP address (like `142.251.36.238`).
Usually we will work with domains since they're stable and rarely change (unlike IP addresses).

> At the time of this writing `142.251.36.238` is one of Google's IP addresses.
> This may of course change by the time you are reading this book.

The next part is the **path**.
Assuming it's not empty, the path begins with a forward slash `/` and uniquely identifies the resource we want to query.
In the Google URL the path is `/search`.

Often, paths will be hierarchical.
In this case the different components of the hierarchy are generally separated by slashes—for example, `/path/to/resource`.

The path can be followed by a **query**.
The query begins with a question mark and is followed by key-value pairs.
In the Google URL this is `?q=nextjs`.
Here the query provides information about your search.

If there are multiple key-value pairs, they're separated by ampersands `&`.
For example, a query might look like `?key1=value1&key2=value2`.

The query can be followed by a **fragment**.
This is used for navigation by the client and is not sent to the server.
A fragment begins with the `#` character, e.g. `?key1=value1&key2=value2#fragment`.

### GET and POST requests

HTTP knows multiple **request methods**.
We primarily care about two request methods for now—namely **GET** and **POST**.

GET requests are generally used to retrieve data.

Recall our route from above:

```javascript
app.get('/', (req, res) => {
  res.send('Hello world!');
});
```

This indicates that if a GET request is sent to the path '/', we would like to return 'Hello, world!' to the client.
The `req` variable represents the **request object** and `res` represents the **response object**.
If we want to send a HTTP response to the client we use the `res.send` method.

POST requests are generally used to send information to the server that tell it to create a new resource or update an existing resource.
For example, a login request will generally be a POST request since it tells the server that a user has logged in to the application.
Similarly, if you submit a web form, there will usually be a POST request attached to that, since form submissions carry new information.

With POST requests, we're more interested in telling the server that something happened than in the data the server returns to us.

POST requests usually need to send much more information to the server than GET requests.
Therefore, POST requests can have a **request body** which allows us to carry this additional data when sending a request.

Let's have a look at an example.
Note that we need to enable some **middleware** in our script.
Middleware functions are functions that do some additional processing on requests or responses.

Specifically, we will need to use the `express.text()` middleware function to parse incoming request payloads into a string.
Add the following line of code to your script right after the initialization of the `app variable`:

```javascript
// code
const app = express();
const PORT = 3000;

app.use(express.text());

// more code
```

Consider the following route which simply returns the request body back to the client:

```javascript
app.post('/echo', (req, res) => {
  res.send(req.body);
});
```

We can send a POST request via `curl`.
We need to specify that we want to send a POST request using the `-X` flag.
In addition we specify the data that we want to send in the _body_ of the POST request using the `-d` flag.
Finally we specify a header called `Content-Type` and set it to `text/plain`.
This indicates that the data we want to send is plain text.

The final command looks like this:

```sh
curl -X POST -H "Content-Type: text/plain" -d 'test' http://localhost:3000/echo
```

Generally speaking, GET requests transmit information in the URL, while POST requests transmit information in the request body.

Note that we will rarely send plain text in the request.
Instead we usually use the JSON format that we introduced in the JavaScript chapter.

In order to accept JSON requests, we need to replace the `express.text` middleware with the `express.json` middleware:

```js
app.use(express.json());
```

Now we can curl the `/echo` path like this:

```sh
curl -X POST -H "Content-Type: application/json" -d '{ "key": "value" }' http://localhost:3000/echo
```

Note that here we need specify the `application/json` content type instead of the `text/plain` content type.
