## More on HTTP

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

### Headers

Both requests and responses can have **headers** which provide important information that is not part of the main request or response content.
For example, request headers might contain the version of the browser that is making the request, what languages are accepted, what encodings are accepted etc.

Similarly, response headers might contain the type of the content, the date of the response etc.

Here is how you can set response headers in Express:

```js
app.post('/', (req, res) => {
  const data = req.body;

  // Add a custom header
  res.set('X-Custom-Header', 'MyHeaderValue');

  res.status(201).send(`Received data: ${JSON.stringify(data)}`);
});
```

### Cookies

HTTP **cookies** are data that is created by the server, sent to the browser and then saved on the browser.
Cookies can be used for things like authentication.

For example, the server might generate a cookie for a logged in user, send it to the browser and then the browser could send the cookie with each request (avoiding the need for the user to logged in on every request).

Note that cookies are simply set as part of the headers.
For example, a request might contain a "Cookie" header containing the cookies it has currently stored.
A response might contain a "Set-Cookie" header which contains the cookies that the browser should set (or clear).
