## An HTTP Primer

<div style="text-align: right"> <i> Meh, who needs HTTPS. <br> — Seconds before disaster </i> </div>

### Servers and Clients

**Servers** and **clients** are nothing more than regular programs (like the ones you saw in the first chapter).
For example, a server might be a JavaScript program that waits for HTTP requests and sends back responses.
A client might be a browser on your laptop or your phone - it might even be a regular script.

> Often, the term "server" is also used to refer to the actual machine the software is running on.

The distinction between a client and a server is extremely important, because the location of our code (i.e. whether it's on the client or the server) will determine _what features we can use_.
We alredy mentioned this in the JavaScript chapter.

For example, if your code runs on the client, you don't have access to the filesystem etc.
But you do have access to the browser features.
For example, you could add a new element, get the size of the browser windows etc.

If your code runs on the server, you do have access to the filesystem, but you no longer have access to the browser features.
You quite logically can't get the size of the browser window on the server.

This also means that we will often need to transmit data from the client to the server (and the other way around).
When writing a web application, the most common way to do so is by using the HTTP procotol.
HTTP is a **request/response protocol**, i.e. HTTP clients send requests to an HTTP server and receive responses in return.

> You have in fact already used the HTTP protocol.
> Pretty much every time you browse the internet, HTTP requests are sent under the hood.

The usual request-response lifecycle looks like this:

The user interacts with your web application, e.g. by submitting a form, clicking a button etc.

The client then send an HTTP request to the server that contains information about resources to retrieve, data to send etc.

The server receives the request, reads its data and then performs appropriate calculations, database queries and so on.
Afterwards, the server creates a response and sends it back to the client.

Finally, the client looks at the response and determines how to update the UI (user interface).

We should mention that nowadays developers rarely use plain HTTP in production.
Instead, they use HTTPS, which is encrypted HTTP.
However, we won't cover HTTPS in detail, since that will automatically be handled for us by our deployment process.

### HTTP and Express

We could use the built-in HTTP module of Node.js, but this is not terribly convenient.
Instead we will use an extremely popular framework called **Express**.
While Express builds on top of the HTTP module, it provides a lot of additional useful functionality.

Create a new Node.js project inside some directory:

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
Add this above the call to `listen`:

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

The will output the following:

```
Hello, world!
```

### HTTP URLs

The string `http://localhost:3000/` is a so called URL.
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

The **scheme** usually indicates the protocol which describes how information should be transmitted.
We will almost exclusively use HTTP or HTTPS (which is just secure HTTP) in this book.
Therefore the scheme will almost always be either `http` or `https`.
In the above Google URL the scheme is clearly `https`.

You already learned about the **host** and the **port** - the host identifies the device you wish to connect to and the port is the communication endpoint on that device.
Note that the host could be a domain name (like `www.google.com`) or an IP address (like `142.251.36.238`).
Usually we will work with domain names since they are stable (unlike a lot of IP addresses).

> At the time of this writing 142.251.36.238 is one of Google's IP addresses.
> This may of course change by the time you are reading this book.

The next part is the **path**.
Assuming it is not empty, the path begins with a forward slash `/` and uniquely identifies the resource we want to query.
In the Google URL the path is `/search`.
Often paths will be hierarchical.
In this case the different components of the hierarchy are generally separated by slashes - for example `/path/to/resource`.

The path can be followed by a **query**.
The query begins with a question mark and is followed by key-value pairs.
In the Google URL this is `?q=nextjs`.
Here the query provides information about your search.
If there are multiple key-value pairs, they are separated by ampersands `&`.
For example the query could be `?key1=value1&key2=value2`.

The query can be followed by a **fragment**.
This is used for navigation by the client and is not sent to server.

### GET and POST requests

HTTP knows multiple **request methods**.
We primarily care about two request methods for now - namely **GET** and **POST**.

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
For example a login request will generally be a POST request since it tells the server that a user has logged in to the application.
Similarly, if you submit a web form, there will usually be a POST request attached to that, since form submissions carry new information.

With POST requests, we are more interested in telling the server that something happened than in the data the server returns to us.

POST requests usually need to send much more information to the server than GET requests.
Therefore, POST requests can have a **request body** which allows us to carry this additional data when sending a request.

Let's have a look at an example.
Note that we need to enable some middleware (we will return to the concept of middleware later):

```javascript
app.use(express.text());
```

Consider the following route which simply returns the request body back to the client:

```javascript
app.post('/post-example', (req, res) => {
  res.send(req.body);
});
```

We can send a POST request via `curl`.
We need to specify that we want to send a POST request using the `-X` flag.
In addition we specify the data that we want to send in the _body_ of the POST request using the `-d` flag.
Finally we specify a header called `Content-Type` and set it to `text/plain`.
This indicates that the data we want to send is plain text.

The final command looks like this:

```
curl -X POST -H "Content-Type: text/plain" -d 'haha' http://localhost:3000/post-example
```

Generally speaking GET requests transmit information using the querystring, while POST requests transmit information in the request body.

Note that we will rarely send plain text in the request.
Instead we the JSON format that we introduced in the JavaScript chapter.

In order to accept JSON requests, we need to replace the `express.text` middleware with the `express.json` middleware:

```json
app.use(express.json());
```

Now we can curl the same path like this:

```
curl -X POST -H "Content-Type: application/json" -d '{ "key": "value" }' http://localhost:3000/post-example
```

Note that here we specify the `application/json` content type.
