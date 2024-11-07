## More on HTTP

<div style="text-align: right"> <i> Just return a 200 here, it will be fine. <br> — Seconds before disaster </i> </div>

### Status Codes

Responses can have **status codes** attached to them.
These indicate the status of a request.

Each status code is a number that indicates some information about the response.
For example, a the status code `400` represents `Bad Request`.

There are a lot of status code and they're grouped in five classes:

- the status codes `100-199` indicate informational responses (and you'll rarely see them)
- the status codes `200-299` indicate successfull responses
- the status codes `300-399` indicate redirection responses
- the status codes `400-499` indicate client errors
- the status codes `500-599` indicate server errors

Quoting the famous [HTTP status ranges in a nutshell](https://www.reddit.com/r/ProgrammerHumor/comments/2rttnv/http_status_ranges_in_a_nutshell/), you could also rephrase this as:

- `100-199`: hold on
- `200-299`: here you go
- `300-399`: go away
- `400-499`: you fucked up
- `500-599`: I fucked up

Let's have a quick look at the most important status codes.

The status code `200` (`OK`) is the standard response for a successful HTTP request.

The status code `400` (`Bad Request`) means that the server can't process the request due to a client error.
For example, a `400` should be returned if the client has provided the server with a malformed request.

The status code `401` (`Unauthorized`) usually means that the client couldn't be successfully authenticated.

The status code `403` (`Forbidden`) usually menas that the client doesn't have the necessary right to access the requested content.
Note that there is an important difference between `401` and `403`.
The code `401` means that the client couldn't be authenticated _at all_, the code `403` means that the client could be authenticated, but doesn't have relevant access rights.

You've probably heard of the most famous status code `404` (`Not Found`).
As the name already says, this means that the server can't find the requested resource (for example, because the resource doesn't exist).

The status code `405` (`Method Not Allowed`) means that the resource exists, but the client is trying to access it using the wrong method.
This occurs if, for example, a client is trying to send a `GET` request to a route that only supports `POST` requests.

The most important status codes for server errors are `500` (`Internal Server Error`) and `503` (`Service Unavailable`).
The status code `500` basically indicates a server crash, while `503` indicates that the server is overloaded.

Here is how you can manually return a status code in Express:

```js
app.post('/', (req, res) => {
  const data = req.body;

  // If the request body is empty, we return status code 400 (Bad Request)
  if (Object.keys(data).length === 0) {
    res.status(400).send('Bad Request: No data provided');
  } else {
    res.status(201).send(`Received data: ${JSON.stringify(data)}`);
  }
});
```

Try to `curl` the endpoint both with an empty and a non-empty object.
For example, you can `curl` the endpoint with an empty object like this:

```sh
curl -X POST -H "Content-Type: application/json" -d '{}' -w '\nStatus: %{http_code}' http://localhost:3000
```

The output would be:

```
Bad Request: No data provided
Status: 400
```

Let's also `curl` the endpoint with a non-empty object like this:

```sh
curl -X POST -H "Content-Type: application/json" -d '{"key": "value"}' -w '\nStatus: %{http_code}' http://localhost:3000
```

The output would be:

```
Received data: {"key":"value"}
Status: 201
```

### Headers

Both requests and responses can have **headers** which provide important information that is not part of the main request or response content.
For example, request headers might contain the version of the browser that is making the request, what languages are accepted, what encodings are accepted etc.

Here is how you can read request headers in Express:

```js
app.get('/request-header-example', (req, res) => {
  const customHeaderValue = req.get('Custom-Header');

  if (customHeaderValue) {
    const responseData = { 'Received-Custom-Header': customHeaderValue };
    res.send(`Received data: ${JSON.stringify(responseData)}`);
  } else {
    res.status(400).send('No Custom-Header provided');
  }
});
```

You can set a header in `curl` like this:

```sh
curl -H "Custom-Header: ExampleValue" http://localhost:3000/request-header-example
```

You will receive the following response:

```
Received data: {"Received-Custom-Header":"ExampleValue"}
```

Similarly, response headers might contain the type of the content, the date of the response etc.

Here is how you can set response headers in Express:

```js
app.get('/response-header-example', (req, res) => {
  const data = req.body;

  // Add a custom header
  res.set('X-Custom-Header', 'MyHeaderValue');

  res.status(201).send(`Received data: ${JSON.stringify(data)}`);
});
```

You can see the response headers in `curl` by using the `-i` flag:

```
curl -i http://localhost:3000/response-header-example
```

This will output:

```
HTTP/1.1 201 Created
X-Powered-By: Express
X-Custom-Header: MyHeaderValue
Content-Type: text/html; charset=utf-8
Content-Length: 17
ETag: W/"11-10nwzUtYNUZcrMxeVU7fTdmCYaI"
Date: Thu, 14 Mar 2024 11:23:03 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Received data: {}
```

Note that `express` (and other web framework) already sets quite a few response headers by default.

> You can also see the response headers in the network tab of your browser if you click on an individual request.

### Cookies

HTTP **cookies** are pieces of data that are created by the server, sent to the browser and then saved on the browser.
Cookies can be used for things like authentication, personalization and tracking.

For example, the server might generate a cookie for a logged in user, send it to the browser and then the browser could send the cookie with each request (avoiding the need for the user to log in on every request).

Note that cookies are simply set as part of the headers.
For example, a request might contain a `Cookie` header containing the cookies it has currently stored.
A response might contain a `Set-Cookie` header which contains the cookies that the browser should set (or clear).

Let's have a look at a small example.
First, we'll need to install the `cookie-parser` package in addition to the `express` package:

```sh
pnpm install -g cookie-parser
```

Next, we will create an `express` application with three routes.
The first route will be a `/set-cookie` route that will allow us to set a cookie.
The second route will be a `/read-cookie` route that will allow us to read the cookie.
Finally, we will add a third route `/clear-cookie` which will allows us to clear the cookie.

```js
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(cookieParser());

// Route to set a cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('myCookie', 'test', { httpOnly: true });
  res.send('Cookie has been set!');
});

// Route to read the cookie
app.get('/read-cookie', (req, res) => {
  const myCookie = req.cookies.myCookie;
  if (myCookie) {
    res.send(`myCookie: ${myCookie}`);
  } else {
    res.status(404).send('No cookie found');
  }
});

// Route to clear the cookie
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('myCookie');
  res.send('Cookie has been cleared');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
```

Let's now open a browser and go to `http://localhost:3000/set-cookie`.
You should see a message "Cookie has been set!" and a new key-value pair appearing in your "cookies" tab.

If you now go to `http://localhost:3000/read-cookie`, you will see `myCookie: test` on the page.

Finally, if you go to `http://localhost:3000/clear-cookie`, you will see that the cookie has been cleared.

## Redirects

The `301` (`Moved Permanently`) is used for URL redirection.
This basically informs a client that the resource has been _permanently_ moved.
A response with a `301` status code should contain the URL where the resource has been moved to.

The `302` (`Found`) is also used for URL redirection, but it indicates to the client that the resource has been _temporarily_ moved.
Again, a response with a `302` status code should contain the URL where the resource has been moved to.

Let's have a look at an `express` example:

```js
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// 301 Redirect (Permanent)
app.get('/redirect-permanent', (req, res) => {
  res.redirect(301, '/permanent-target');
});

// 302 Redirect (Temporary)
app.get('/redirect-temporary', (req, res) => {
  res.redirect(302, '/temporary-target');
});

// Target Route for 301 Redirect
app.get('/permanent-target', (req, res) => {
  res.send('This is the permanent target route');
});

// Target Route for 302 Redirect
app.get('/temporary-target', (req, res) => {
  res.send('This is the temporary target route');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
```

If you open `http://localhost:3000/redirect-permanent` in your browser, you will see that the address in the browser address bar suddenly changes to `http://localhost:3000/permanent-target` and you see the content `'This is the permanent target route'`.
If you open the network tab, you will see that two requests are sent to accomplish this.

First, your browser sends a request to `http://localhost:3000/redirect-permanent` and receives a response with status code `301` and the response header `Location` set to `/permanent-target`.
Your browser now sends another request to the URL that indicated in the `Location` header and receives the actual content.

You will see similar behaviour with the `/redirect-temporary` and `temporary-target` routes.
