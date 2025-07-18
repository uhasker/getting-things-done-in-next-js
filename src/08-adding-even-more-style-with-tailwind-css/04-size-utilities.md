## Size Utilities

<div style="text-align: right"> <i> Tailwind makes writing code feel like I'm using a design tool. <br> — Ryan Florence </i> </div>

### Width

You can give an element a fixed width using the `w-{number}` utilities.

Consider the following example:

```jsx
export default function Home() {
  return (
    <>
      <div className="bg-blue-500 w-24">Text</div>
      <div className="bg-blue-500 w-64">Text</div>
      <div className="bg-blue-500 w-96">Text</div>
    </>
  );
}
```

> To actually see that the size utilities work the way we expect, we give all our elements that are present in this section backgrounds.
> Don't be distracted by this.

Of course, there are many more `w-{number}` utilities.

You can also give an element a percentage-based width using the `w-{fraction}` utilities:

```jsx
export default function Home() {
  return (
    <div className="flex">
      <div className="bg-blue-500 w-1/4">Text</div>
      <div className="bg-yellow-500 w-1/4">Text</div>
      <div className="bg-green-500 w-1/2">Text</div>
    </div>
  );
}
```

You can use `w-screen` if you want an element to span the entire viewport width.

You can also set the minimum and the maximum width of an element using the `min-w-{number}` and `max-w-{number}` attributes.

### Height

You can give an element a fixed height using the `h-{number}` utilities.

Consider the following example:

```jsx
export default function Home() {
  return (
    <>
      <div className="bg-blue-500 h-24">Text</div>
      <div className="bg-yellow-500 h-64">Text</div>
      <div className="bg-green-500 h-96">Text</div>
    </>
  );
}
```

Of course, there are many more `h-{number}` utilities.

You can use `h-screen` if you want an element to span the entire viewport height.

You can set the minimum and the maximum height of an element using the `min-h-{number}` and `max-h-{number}` attributes.

### Size

You can set the width and height of an element at the same time using the `size-{number}` utility classes.

Consider the following example:

```jsx
export default function Home() {
  return (
    <>
      <div className="bg-blue-500 size-24">Text</div>
      <div className="bg-yellow-500 size-64">Text</div>
      <div className="bg-green-500 size-96">Text</div>
    </>
  );
}
```
