## Server and Client Components

<div style="text-align: right"> <i> Why did the Next.js component get anxiety during drinking? <br> Because it was afraid of hydration errors. <br> — From "1000 programming dad-jokes" </i> </div>

### Rendering

Next.js renders as much as it can on the server.
By default, the React components you write are rendered on the server side and the resulting HTML is sent to the browser.

Unfortunately, not all components can be fully rendered on the server.
For example, components that require interactivity must be partially rendered on the client.

Therefore, the rendering is split into multiple stages:

First, Next.js renders as much as it can on the server.

Once the initial HTML is rendered, the client-side JavaScript takes over.
It reconciles the server-rendered HTML with the client-side React tree.

After the reconciliation, the server-rendered HTML is "hydrated".
This stage involves attaching event handlers and setting up necessary state to make the components interactive.

There are several benefits to this approach.

Because the HTML is rendered on the server, you don't get an "empty" HTML page on first load.
Instead, you see some HTML content immediately (albeit not interactive), which improves the user experience and helps with SEO.

Server components can also be cached, which means that repeated requests for the same component are served very fast.
This can significantly improve performance (especially for content that doesn't change a lot).

Data fetching can be moved from the client to the server which can simplify the code and reduce the amount of data that needs to be sent to the client.
This is especially beneficial for clients with slow network speeds.

Additionally, dependencies are now on the server and don't need to be served to the client.
This helps greatly with reducing how much the server needs to send to the client.

### Server Components

**Server components** are the components that are completely rendered on the server.

For example, this component is a server component:

```jsx
import * as React from 'react';

export default function Task() {
  return <p>My task</p>;
}
```

There is no interactivity here, so this component can and will be rendered completely on the server.

### Client Components

**Client components** are components that are rendered both on the server and on the client.
You use client components when you need interactivity or you need to use certain browser APIs.

You can opt into client components with `"use client"`.

Consider the following component:

```jsx
import * as React from 'react';

export default function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

If you try to go to the corresponding page, you will see an error:

```
Error: useState only works in Client Components. Add the "use client" directive at the top of the file to use it. Read more: https://nextjs.org/docs/messages/react-client-hook-in-server-component
```

This is because you can't use `useState` on the server since you can't store client state there.

To fix the error, we need to add the `"use client"` directive:

```jsx
'use client';

import * as React from 'react';

export default function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

You can verify that this component is rendered both on the server and the client by adding a `console.log`:

```jsx
'use client';

import * as React from 'react';

export default function Counter() {
  const [count, setCount] = React.useState(0);

  console.log('Rendered counter');

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

If you go to `http://localhost:3000/counter`, you will see that the `Rendered counter` message is output both on the server console as well as on the client console.
That's because the component renders both on the server and on the client.

However, all further interactivity happens only on the client.
For example, if you click the button, you will see that the `Rendered counter` message is output only on the client console.

However, if you refresh the page, you will observe that the `Rendered counter` message is again logged both to the server as well as the client.

### When to use what?

Use server components if:

- you need to fetch data
- you need to access a database
- you need to keep sensitive information on the server
- you want to keep large dependencies on the server

Use client components only if:

- you need to use event listeners (like `onClick`)
- you need to use certain React hooks like `useState` or `useEffect`
- you need to use certain browser functionality (like resizing the browser window)
