## More on HTTP

<div style="text-align: right"> <i> Just return a 200 here, it will be fine. <br> — Seconds before disaster </i> </div>

### Status Codes

Responses can have status codes attached to them.
These indicate the status of a request.

For example, a status `400` means `Bad Request`, the famous status `404` means `Not Found` and `500` stands for `Internal Server Error`.

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

You can `curl` the endpoint with a non-empty object like this:

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

Note that express already sets quite a few response headers by default.

> You can also see the response headers in the network tab of your browser if you click on an individual request.

### Cookies

HTTP **cookies** are pieces of data that are created by the server, sent to the browser and then saved on the browser.
Cookies can be used for things like authentication.

For example, the server might generate a cookie for a logged in user, send it to the browser and then the browser could send the cookie with each request (avoiding the need for the user to log in on every request).

Note that cookies are simply set as part of the headers.
For example, a request might contain a "Cookie" header containing the cookies it has currently stored.
A response might contain a "Set-Cookie" header which contains the cookies that the browser should set (or clear).
