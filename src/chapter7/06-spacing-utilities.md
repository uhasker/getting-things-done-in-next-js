## Spacing Utilities

### Padding

You can control the padding on all sides of an element using the `p-{size}` utilities:

```jsx
export default function Home() {
  return (
    <>
      <div className="border border-blue-500 size-32 p-2">Text</div>
      <div className="border border-blue-500 size-32 p-4">Text</div>
      <div className="border border-blue-500 size-32 p-8">Text</div>
    </>
  );
}
```

You can control the padding on one side of an element using the `p{t | r | b | l}-{size}` utilities.

For example:

```jsx
export default function Home() {
  return (
    <>
      <div className="border border-blue-500 size-32 pl-4">Left-padded text</div>
      <div className="border border-blue-500 size-32 pt-4">Top-padded text</div>
    </>
  );
}
```

### Margin

You can control the margin on all sides of an element using the `m-{size}` utilities:

```jsx
export default function Home() {
  return (
    <>
      <div className="border border-blue-500 size-32 m-2">Text</div>
      <div className="border border-blue-500 size-32 m-4">Text</div>
      <div className="border border-blue-500 size-32 m-8">Text</div>
    </>
  );
}
```

You can control the margin on one side of an element using the `m{t | r | b | l}-{size}` utilities.

For example:

```jsx
export default function Home() {
  return (
    <>
      <div className="border border-blue-500 size-32 ml-4">Left margin</div>
      <div className="border border-blue-500 size-32 mt-4">Top margin</div>
    </>
  );
}
```
