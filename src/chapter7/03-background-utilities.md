## Background Utility Classes

### Background Color

You can change the background color of an element using the `bg-{color}` utilities:

```jsx
export default function Home() {
  return (
    <>
      <div className="bg-blue-500">Blue background</div>
      <button className="bg-blue-500">Blue button</button>
      <p className="bg-blue-500">Blue paragraph</p>
    </>
  );
}
```

### Linear Gradients

You can give elements a linear gradient background using the `bg-gradient-{direction}` utilities.

First, you specify the direction of the gradient.
For example, you can specify `bg-gradient-to-r` for "right", `bg-gradient-to-t` for "top" and more.

Then you specify the starting color via `from-{color}-{number}` and the end color via `to-{color}-{number}`.
You can additionally specify a middle color by using `via-{color}-{number}`.

Here are a few examples:

```jsx
export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-green-500">
        Right direction, blue to green
      </div>
      <div className="bg-gradient-to-r from-blue-500 via-yellow-500 to-green-500">
        Right direction, blue to green, via yellow
      </div>
      <div className="bg-gradient-to-t from-blue-500 to-green-500">
        Top direction, blue to green
      </div>
      <div className="bg-gradient-to-t from-blue-500 to-green-500 via-yellow-500">
        Top direction, blue to green, via yellow
      </div>
    </>
  );
}
```
