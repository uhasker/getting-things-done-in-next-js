## More on Routes

### Dynamic Routes

You can use **dynamic routes** when you don't know segment names ahead of time.
Let's say you want to add a route that displays a task with a certain ID at `/task/$ID`.
For example, you might wish to display a task with the ID `1` at `/task/1` and a task with the ID `2` at `/task/2`.

Of course, since tasks are added and deleted by the user, you can't know all of the IDs beforehand.
This where dynamic routes come in.

Create a new file `task/[id]/page.tsx`:

```jsx
export default function Task({ params }: { params: { id: string } }) {
  return <p>This is a task with ID {params.id}</p>;
}
```

If you go to `http://localhost:3000/task/1`, you should see the following text:

```
This is a task with ID 1
```

However, if you go to `http://localhost:3000/task/56789`, you will see:

```
This is a task with ID 56789
```

Note that the `[id]` notation will only match a single segment.
This means for example `http://localhost:3000/task/1/status` will not be matched by `task/[id]` and you will see a `404`.

If you want to change this, you can use catch-all segments with `[...id]` and optional catch-all segments with `[[...id]]`.

### Route Handlers

Route handlers basically allow you to create API routes.
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

Try accessing the route:

```
$ curl localhost:3000/api/task
{"taskId":1}
```

You can access the request by passing a `request` argument to the function:

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

Try accessing the route now:

```
$ curl --cookie "language=de" localhost:3000/api/task
{"allCookies":[{"name":"language","value":"de"}],"languageCookie":{"name":"language","value":"de"}}
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

Try acessing the route again:

```
$ curl localhost:3000/api/task
{"headers":[["accept","*/*"],["host","localhost:3000"],["user-agent","curl/7.81.0"],["x-forwarded-for","::ffff:127.0.0.1"],["x-forwarded-host","localhost:3000"],["x-forwarded-port","3000"],["x-forwarded-proto","http"]],"userAgent":"curl/7.81.0"}
```

You can have dynamic segments in your route handlers:

```ts
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  return NextResponse.json({
    taskId: id,
  });
}
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

For example:

```
$ curl "localhost:3000/api/task?title=Title&description=Description"
{"title":"Title"}
```
