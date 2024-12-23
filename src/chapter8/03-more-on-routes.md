## More on Routes

<div style="text-align: right"> <i> Why do Next.js routes make terrible secret agents? <br> Because they keep exposing endpoints. <br> — From "1000 programming dad-jokes" </i> </div>

### Dynamic Routes

You can use **dynamic routes** when you don't know segment names ahead of time.
Let's say you want to add a route that displays a task with a certain ID at `/task/$ID`.
For example, you might wish to display a task with the ID `1` at `/task/1` and a task with the ID `2` at `/task/2`.

Of course, since tasks are added and deleted by the user, you can't know all of the IDs beforehand.
This is where dynamic routes come in.

Create a new file `task/[id]/page.tsx` with the following content:

```jsx
export default function Task({ params }: { params: { id: string } }) {
  return <p>This is a task with ID {params.id}</p>;
}
```

Here, you pass a `params` object that contains the `id` property.
This `id` property will contain the ID passed in the URL.

For example, if you go to `http://localhost:3000/task/1`, you should see the following text:

```
This is a task with ID 1
```

However, if you go to `http://localhost:3000/task/56789`, you will see:

```
This is a task with ID 56789
```

Note that the `[id]` notation will only match a single segment.
This means that e.g. `http://localhost:3000/task/1/status` will not be matched by `task/[id]` and you will see a `404`.

If you want to change this, you can use catch-all segments with `[...id]` and optional catch-all segments with `[[...id]]`.

### Route Handlers

Route handlers basically allow you to create API routes (similar to what we did in the networking chapter).
Route handlers are defined by `route` files.

Let's create a new file `api/task/route.ts` and add a simple example route handler:

```ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    taskId: 1,
  });
}
```

You can try accessing the route by using `curl`:

```sh
curl localhost:3000/api/task
```

This will output the following JSON:

```json
{ "taskId": 1 }
```

You can access the request by passing a `request` argument to the function (similar to `express`):

```ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log({ request });

  return NextResponse.json({
    taskId: 1,
  });
}
```

If you look at your console, you will see that the request object is logged.

You can use the `request` object to access the various request properties.

For example, you could retrieve the cookies of the current request using `request.cookies`.
This is a special `RequestCookies` object that exposes methods that you can use to retrieve cookies:

```ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const cookies = request.cookies;

  const allCookies = cookies.getAll();
  const languageCookie = cookies.get('language');

  return NextResponse.json({
    allCookies,
    languageCookie,
  });
}
```

Try accessing the route while passing it a cookie:

```sh
curl --cookie "language=de" localhost:3000/api/task
```

The result will be:

```json
{
  "allCookies": [{ "name": "language", "value": "de" }],
  "languageCookie": { "name": "language", "value": "de" }
}
```

Similarly you can access the headers of a request:

```ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const headers = request.headers;
  const userAgent = headers.get('user-agent');

  return NextResponse.json({
    headers: Array.from(headers),
    userAgent,
  });
}
```

Try accessing the route again:

```sh
curl localhost:3000/api/task
```

This will print the headers that are automatically set by `curl`:

```json
{
  "headers": [
    ["accept", "*/*"],
    ["host", "localhost:3000"],
    ["user-agent", "curl/7.81.0"],
    ["x-forwarded-for", "::ffff:127.0.0.1"],
    ["x-forwarded-host", "localhost:3000"],
    ["x-forwarded-port", "3000"],
    ["x-forwarded-proto", "http"]
  ],
  "userAgent": "curl/7.81.0"
}
```

You can have dynamic segments in your route handlers.
Let's create a new file `api/task/[id]/route.ts`:

```ts
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  return NextResponse.json({
    taskId: id,
  });
}
```

Try accessing the dynamic route:

```sh
curl localhost:3000/api/task/42
```

This will return:

```json
{ "taskId": "42" }
```

You can read query params from the `nextUrl.searchParams` object:

```ts
import { NextResponse, type NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get('title');
  return NextResponse.json({
    title,
  });
}
```

Try accessing the route:

```sh
curl "localhost:3000/api/task?title=Title&description=Description"
```

This should return:

```json
{ "title": "Title" }
```
