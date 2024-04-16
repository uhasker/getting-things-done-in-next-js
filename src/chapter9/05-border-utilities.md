## Border Utilities

<div style="text-align: right"> <i> Tailwind CSS is the greatest framework on the planet. <br> - Bret Hart (wait what?) </i> </div>

You can use the `border` attribute to add a border.

### Border Color

You can use the `border-{color}-{number}` to control the border element:

```jsx
export default function Home() {
  return (
    <>
      <div className="border border-blue-500">Blue border</div>
      <div className="border border-green-500">Green border</div>
    </>
  );
}
```

### Border Width

You can set the border width using the `border-{number}` utilities:

```jsx
export default function Home() {
  return (
    <>
      <div className="border border-blue-500">Text</div>
      <div className="border-2 border-blue-500">Text</div>
      <div className="border-4 border-blue-500">Text</div>
      <div className="border-8 border-blue-500">Text</div>
    </>
  );
}
```

### Border Style

You can use `border-{style}` to control the border style of an element:

```jsx
export default function Home() {
  return (
    <>
      <div className="border border-blue-500 border-solid">Text</div>
      <div className="border border-blue-500 border-dashed">Text</div>
      <div className="border border-blue-500 border-dotted">Text</div>
      <div className="border border-blue-500 border-double">Text</div>
    </>
  );
}
```

### Border Radius

You can control the border radius by using utilies like `rounded`, `rounded-md`, `rounded-lg` and `rounded-full`.

Example:

```jsx
export default function Home() {
  return (
    <>
      <div className="border border-blue-500 bg-blue-500 size-32 border-solid rounded">Text</div>
      <div className="border border-blue-500 bg-blue-500 size-32 border-solid rounded-md">Text</div>
      <div className="border border-blue-500 bg-blue-500 size-32 border-solid rounded-lg">Text</div>
      <div className="border border-blue-500 bg-blue-500 size-32 border-solid rounded-full">
        Text
      </div>
    </>
  );
}
```
