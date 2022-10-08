## An HTTP primer

### HTTP and Express

When writing a web application, the most common way to get data from a server to a client is via the HTTP procotol (usually augmented by SSL resulting in the HTTPS procotol).
HTTP is a **request/response protocol**, i.e. HTTP clients send requests to an HTTP server and receive a response in return.
You have in fact already used the HTTP protocol.
Every time you browse the internet, HTTP requests are sent under the hood.

We could use the built-in HTTP module of Node.js, but this is not terribly convenient.
Instead we will use an extremely popular framework called **Express**.
While Express builts on top of the HTTP module, it provides a lot of additional useful functionality.

Inside our root directory (_easy-opus_ in our case) create a directory named _api_.
As usual this name can be something else, but it should be descriptive.
Navigate inside the _api_ directory and create a new Node.js project:

```shell
npm init -y
```

Install Express:

```shell
npm install express
```

Now create a file named app.js inside the api directory.
As usual the name of the file is up to you, but it should be something meaningful.
Inside the file we will create an Express application and then make that application listen for connections on a specified host and port.

If you are very new to computer networks, a host is simply a device connected to some (computer) network.
A port is a communication endpoint on that host.
The concept of ports allows you to run multiple network applications on the same device.
For example, your awesome website might run on port 80 and a service allowing you to remotely login onto your machine might run on port 22.

This is how you can create an Express application and make it listen on port 3000:

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

If you open a browser and navigate to (http://localhost:3000) you will see

```
Hello, world!
```

You can also use cURL, which includes a command-line tool for transferring data on a network.
Among other things it supports HTTP and is available on both Windows and most Linux distributions.
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
You have probably seen URLs before.
Navigate to Google and search for "MERN stack" - you will notice that the URL in your browser looks like this:

```
https://www.google.com/search?q=mern+stack
```

For didactic reasons we will include the port:

```
https://www.google.com:443/search?q=mern+stack
```

Generally speaking, a typical HTTP URL has the following form:

```
scheme://host:port/path?key1=value1&key2=value2#fragment
```

> Note the word _typical_ here.
> HTTP URLs (and especially more general URLs) can become _much more_ complicated, but we will not cover all the little details in this book.
> In fact the complexity of URLs is often a source of subtle bugs and browser crashes.
> For example - at some point Android Chrome would [crash](https://news.ycombinator.com/item?id=28639708) when trying to open `http://../foo`.

The **scheme** usually indicates the protocol which describes how information should be transmitted.
We will almost exclusively use HTTP or HTTPS (which is just secure HTTP) in this book.
Therefore the scheme will almost always either be http or https.
In the above Google URL the scheme is clearly https.

You already learned about the **host** and the **port** - the host identifies the device you wish to connect to and the port is the communication endpoint on that device.
Note that the host could be a domain name (like www.google.com) or an IP address (like 142.251.36.238).
Usually we will work with domain names since they are stable (unlike a lot of IP addresses).
Together the host and the port make up the **authority**.

> At the time of this writing 142.251.36.238 is one of Google's IP addresses.
> This may of course change by the time you are reading this book.

The next part is the **path**.
Assuming it is not empty, the path begins with a forward slash ("/") and uniquely identifies the resource we want to query.
In the Google URL the path is "/search".
Often paths will be hierarchical.
In this case the different components of the hierarchy are generally separated by slashes - for example "/path/to/resource".

The path can be followed by a **query**.
The query begins with a question mark and is followed by key-value pairs.
In the Google URL this is "?q=mern+stack".
Here the query provides information about your search.
If there are multiple key-value pairs, they are separated by ampersands ("&").
For example the query could be "?key1=value1&key2=value2".

The query can be followed by a **fragment**.
This is used for navigation by the client and is not sent to server.

### GET and POST requests

HTTP knows multiple **request methods**.
We primarily care about two request methods for now - namely **GET** and **POST**.
GET requests are generally used to retrieve data.

Recall out route from above:

```javascript
app.get('/', (req, res) => {
  res.send('Hello world!');
});
```

This indicates that if a GET request is sent to path '/', we would like to return 'Hello, world!' to the client.
The `req` is the **request object** and `res` is the **respose object**.
If we want to send a HTTP response to the client we therefore use `res.send`.

POST requests are generally used to send information to the server.
For example a login request will generally be a POST request since it tells the server that a user has logged in to the application.
Here we are less interested in the data the server returns us and more in telling the server that something happened.

Note that we need to enable some middleware (we will return to the concept of middleware in a second):

```javascript
app.use(express.text());
```

Consider the following route which simply returns the request body back to the client:

```javascript
app.post('/post-example', (req, res) => {
  res.send(req.body);
});
```

How do we test this?
You cannot simply send a POST request in a browser the way you would send a GET request.
This is where curl comes in really handy.
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
Instead we will use a special format called JSON.
This is a file format that supports a bunch of primitive values, arrays and dictionaries.
A typical JSON could look like this:

```json
{
  "tasks": ["Task 1", "Task 2", "Task 3"],
  "date": {
    "year": 2022,
    "month": 06,
    "date": 18
  }
}
```

In order to accept JSON requests, we need to replace the `express.text` middleware with the `express.json` middleware:

```json
app.use(express.json());
```

Now we can curl the same path like this:

```
curl -X POST -H "Content-Type: application/json" -d '{ "key": "value" }' http://localhost:3000/post-example
```

Note that here we specify the `application/json` content type.

> This is all fine and dandy, but how do client and server know how to interpret all these things?
> The answer to that question is the IETF (short for Internet Engineering Task Force).
> This is an organization that sets standards for the Internet (hence the name).
> Among other things it is responsible for creating the various RFCs (Request for Comments) that outline the workings of HTTP.
> For example HTTP 1.1 (which is the most common HTTP version you will encounter at the time of this writing) is outlined in RFCs 7230-7235.
> URIs on the other hand are outlined in RFC 3986.
> We encourage you to have a quick look at the respective RFCs.
> You should _definitely not_ read them all at this stage, but just understand the sheer complexity of the things we are discussing here.
> We are really just scratching a very tiny part of the surface of it all.
> Lucky for you, most of the RFCs will probably not be terribly relevant in your day-to-day life.
