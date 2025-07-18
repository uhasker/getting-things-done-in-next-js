## Background Utilities

<div style="text-align: right"> <i> If I had to recommend a way of getting into programming today, it would be HTML + CSS with Tailwind CSS. <br> — Guillermo Rauch </i> </div>

### Background Color

You can change the background color of an element using the `bg-{color}-{number}` utilities.

Consider the following example:

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

First, you need to specify the direction of the gradient.
For example, you can specify `bg-gradient-to-r` for "right", `bg-gradient-to-t` for "top" and more.

Second, you need to specify the starting color via `from-{color}-{number}` and the end color via `to-{color}-{number}`.
You can additionally specify a middle color by using `via-{color}-{number}`.

Here are a few examples on how to use these utilities:

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
