## Flexbox

<div style="text-align: right"> <i> I never want to write regular CSS again. Only @tailwindcss. <br> — Trey Piepmeier </i> </div>

### The `flex` Utility Class

The "flex" feature enables you to control the layout of elements in a one-dimensional space.
You can position the elements either as rows or columns.

Here is a simple example of a flex container with 3 elements that are placed horizontally:

```jsx
export default function Home() {
  return (
    <div className="flex">
      <div className="size-32 border border-blue-500">First element</div>
      <div className="size-32 border border-blue-500">Second element</div>
      <div className="size-32 border border-blue-500">Third element</div>
    </div>
  );
}
```

You can use the `flex-col` utility class if you want a vertical layout.

Consider the following example:

```jsx
export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="size-32 border border-blue-500">First element</div>
      <div className="size-32 border border-blue-500">Second element</div>
      <div className="size-32 border border-blue-500">Third element</div>
    </div>
  );
}
```

### Flex Basis

You can use the `basis-{size}` utilities to set the initial size of flex items.

Consider the following example:

```jsx
export default function Home() {
  return (
    <div className="flex">
      <div className="border border-blue-500 basis-32">First element</div>
      <div className="border border-blue-500 basis-32">Second element</div>
      <div className="border border-blue-500 basis-64">Third element</div>
    </div>
  );
}
```

You can also specify a fraction like in this example:

```jsx
export default function Home() {
  return (
    <div className="flex size-64">
      <div className="border border-blue-500 basis-1/4">First element</div>
      <div className="border border-blue-500 basis-1/4">Second element</div>
      <div className="border border-blue-500 basis-1/2">Third element</div>
    </div>
  );
}
```

### Flex Wrap

The `flex-wrap` utility class can be used to control how flex items wrap.

Consider this example:

```jsx
export default function Home() {
  return (
    <div className="flex w-64">
      <div className="border border-blue-500 w-32">First element</div>
      <div className="border border-blue-500 w-32">Second element</div>
      <div className="border border-blue-500 w-32">Third element</div>
    </div>
  );
}
```

Note that the parent container is too large for the children.
If you want to allow flex items to wrap, you can use `flex-wrap`:

```jsx
export default function Home() {
  return (
    <div className="flex flex-wrap w-64">
      <div className="border border-blue-500 w-32">First element</div>
      <div className="border border-blue-500 w-32">Second element</div>
      <div className="border border-blue-500 w-32">Third element</div>
    </div>
  );
}
```

Now the third child element will be placed on the next line.

### Grow

You can use the `grow` utility to tell a flex item to fill all of the available space:

```jsx
export default function Home() {
  return (
    <div className="flex w-64">
      <div className="border border-blue-500 w-16">First</div>
      <div className="border border-blue-500 grow">Second</div>
      <div className="border border-blue-500 w-16">Third</div>
    </div>
  );
}
```

### Space Between

You can control horizontal space between elements using `space-x-{amount}` utilities.

Consider the following example:

```jsx
export default function Home() {
  return (
    <div className="flex space-x-8">
      <div className="size-32 bg-blue-500">First element</div>
      <div className="size-32 bg-blue-500">Second element</div>
      <div className="size-32 bg-blue-500">Third element</div>
    </div>
  );
}
```

You can control vertical space between elements using `space-y-{amount}` utilities.

Consider the following example:

```jsx
export default function Home() {
  return (
    <div className="flex flex-col space-y-8">
      <div className="size-32 bg-blue-500">First element</div>
      <div className="size-32 bg-blue-500">Second element</div>
      <div className="size-32 bg-blue-500">Third element</div>
    </div>
  );
}
```
