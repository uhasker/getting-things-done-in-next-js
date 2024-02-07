## Grid

Grids allow you to specify two-dimensional layouts.

### Template Columns

You can use the `grid` and `grid-cols-{n}` utilities to create a simple grid with a certain number of columns:

```jsx
export default function Home() {
  return (
    <div className="grid grid-cols-2 size-64">
      <div className="border-2 border-blue-500">Row 1, Col 1</div>
      <div className="border-2 border-blue-500">Row 1, Col 2</div>
      <div className="border-2 border-blue-500">Row 2, Col 1</div>
      <div className="border-2 border-blue-500">Row 2, Col 2</div>
      <div className="border-2 border-blue-500">Row 3, Col 1</div>
      <div className="border-2 border-blue-500">Row 3, Col 2</div>
    </div>
  );
}
```

You can use the `col-span-{n}` utilities to make an element span multiple columns:

```jsx
export default function Home() {
  return (
    <div className="grid grid-cols-3 size-96">
      <div className="border-2 border-blue-500">Row 1, Col 1</div>
      <div className="border-2 border-blue-500">Row 1, Col 2</div>
      <div className="border-2 border-blue-500">Row 1, Col 3</div>
      <div className="border-2 border-blue-500 col-span-2">Row 2, Col 1+2</div>
      <div className="border-2 border-blue-500">Row 2, Col 3</div>
    </div>
  );
}
```

You can use the `col-start-{n}` and `col-end-{n}` to start/end an element at the nth grid line.
There are two important caveats here:
First, grid lines start at `1`, not at `0`.
Second, the numbers indicate grid _lines_.

This means that if you want an element to span colummns `2` and `3` in a grid, you need to start at grid line `2` and end at grid line `4`:

```jsx
export default function Home() {
  return (
    <div className="grid grid-cols-3 size-96">
      <div className="border-2 border-blue-500">Row 1, Col 1</div>
      <div className="border-2 border-blue-500">Row 1, Col 2</div>
      <div className="border-2 border-blue-500">Row 1, Col 3</div>
      <div className="border-2 border-blue-500 col-start-2 col-end-4">Row 2, Col 2+3</div>
    </div>
  );
}
```

### Template Rows

You can use the `grid`, `grid-flow-col` and `grid-rows-{n}` utilities to create a simple grid with a certain number of rows:

```jsx
export default function Home() {
  return (
    <div className="grid grid-flow-col grid-rows-2 size-64">
      <div className="border-2 border-blue-500">Row 1, Col 1</div>
      <div className="border-2 border-blue-500">Row 2, Col 1</div>
      <div className="border-2 border-blue-500">Row 1, Col 2</div>
      <div className="border-2 border-blue-500">Row 2, Col 2</div>
      <div className="border-2 border-blue-500">Row 1, Col 3</div>
      <div className="border-2 border-blue-500">Row 2, Col 3</div>
    </div>
  );
}
```

You can use the `row-span-{n}` utilities to make an element span multiple rows:

```jsx
export default function Home() {
  return (
    <div className="grid grid-flow-col grid-rows-3 size-64">
      <div className="border-2 border-blue-500">Row 1, Col 1</div>
      <div className="border-2 border-blue-500">Row 2, Col 1</div>
      <div className="border-2 border-blue-500">Row 3, Col 1</div>
      <div className="border-2 border-blue-500 row-span-2">Row 1+2, Col 2</div>
      <div className="border-2 border-blue-500">Row 3, Col 2</div>
    </div>
  );
}
```

You can use the `row-start-{n}` and `row-end-{n}` to start/end an element at the nth grid line.
The same caveats as with columns apply:

```jsx
export default function Home() {
  return (
    <div className="grid grid-flow-col grid-rows-3 size-64">
      <div className="border-2 border-blue-500">Row 1, Col 1</div>
      <div className="border-2 border-blue-500">Row 2, Col 1</div>
      <div className="border-2 border-blue-500">Row 3, Col 1</div>
      <div className="border-2 border-blue-500 row-start-2 row-end-4">Row 2+3, Col 2</div>
    </div>
  );
}
```

### Gaps

You can use `gap-{size}` utilities to control the gaps between rows and columns:

```jsx
export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-4 size-64">
      <div className="border-2 border-blue-500">Row 1, Col 1</div>
      <div className="border-2 border-blue-500">Row 1, Col 2</div>
      <div className="border-2 border-blue-500">Row 2, Col 1</div>
      <div className="border-2 border-blue-500">Row 2, Col 2</div>
      <div className="border-2 border-blue-500">Row 3, Col 1</div>
      <div className="border-2 border-blue-500">Row 3, Col 2</div>
    </div>
  );
}
```

You can use the `gap-x-{size}` and `gap-y-{size}` utilities if you need to change the gaps between rows or columns.
