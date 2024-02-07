## Typography Utilities

Consider the following component:

```jsx
export default function Home() {
  return <p>This is a sentence</p>;
}
```

### Font Family

You can change the font family:

```jsx
export default function Home() {
  return (
    <>
      <p className="font-sans">This uses a sans-serif font</p>
      <p className="font-serif">This uses a serif font</p>
      <p className="font-mono">This uses a monospace font</p>
    </>
  );
}
```

### Font Size

You can change the font size:

```jsx
export default function Home() {
  return (
    <>
      <p className="text-sm">This is a small sentence</p>
      <p className="text-base">This is a normal sentence</p>
      <p className="text-lg">This is a large sentence</p>
      <p className="text-xl">This is an extra large sentence</p>
    </>
  );
}
```

You can make your sentences larger than `text-xl` by prefixing the `xl` with a number, e.g. `text-2xl`, `text-3xl` all the way up `text-9xl`.

### Font Weight

You can change the font weight:

```jsx
export default function Home() {
  return (
    <>
      <p className="font-light">This sentence is light</p>
      <p className="font-normal">This sentence is normal</p>
      <p className="font-medium">This sentence is medium</p>
      <p className="font-semibold">This sentence is semibold</p>
      <p className="font-bold">This sentence is bold</p>
    </>
  );
}
```

### Line Height

You can also set the line height.
This can be used to control the distance between the lines:

```jsx
export default function Home() {
  return (
    <>
      <p className="leading-normal">
        This is a really, really long sentence that spans multiple lines if you make the window of
        your browser small enough. Just keep resizing the browser window until this text spans
        multiple lines. Then you will be able to see the effect of line height.
      </p>
      <p className="leading-relaxed">
        This is a really, really long sentence that spans multiple lines if you make the window of
        your browser small enough. Just keep resizing the browser window until this text spans
        multiple lines. Then you will be able to see the effect of line height.
      </p>
      <p className="leading-loose">
        This is a really, really long sentence that spans multiple lines if you make the window of
        your browser small enough. Just keep resizing the browser window until this text spans
        multiple lines. Then you will be able to see the effect of line height.
      </p>
    </>
  );
}
```

You can also control the line height via `leading-{num}` utility classes (from `leading-3` to `leading-10`).

### Alignment

The text alignment can be set like this:

```jsx
export default function Home() {
  return (
    <>
      <p className="text-left">This text is left-aligned</p>
      <p className="text-center">This text is centered</p>
      <p className="text-right">This text is right-aligned</p>
    </>
  );
}
```

You can justify text with `text-justify`.

### Text Color

You can also set the text color.
These utility classes usually have the form `text-{color}-{number}`.
The higher the number, the darker the color will be.
The number should be one of the values `100`, `200`, `300` all the way up to `900`.

```jsx
export default function Home() {
  return (
    <>
      <p className="text-blue-300">Light blue</p>
      <p className="text-blue-800">Dark blue</p>
      <p className="text-red-300">Light red</p>
      <p className="text-red-800">Dark red</p>
      <p className="text-green-300">Light green</p>
      <p className="text-green-800">Dark green</p>
    </>
  );
}
```

### Font Style and Decoration

There are a few additional interesting utility classes for typography.

For example, font style can be controlled with the `italic` utility:

```jsx
export default function Home() {
  return <p className="italic">This is an italic sentence</p>;
}
```

You can also control text decoration with utilities like `underline`:

```jsx
export default function Home() {
  return <p className="underline">This text is underlined</p>;
}
```

You can change the text decoration color by using the `decoration-{color}-{number}` utility classes:

```jsx
export default function Home() {
  return <p className="underline decoration-blue-500">This text has a blue underline</p>;
}
```

And you can even change the decoration style:

```jsx
export default function Home() {
  return (
    <>
      <p className="underline decoration-solid">This text has a solid underline</p>
      <p className="underline decoration-double">This text has a double underline</p>
      <p className="underline decoration-dotted">This text has a dotted underline</p>
      <p className="underline decoration-dashed">This text has a dashed underline</p>
      <p className="underline decoration-wavy">This text has a wavy underline</p>
    </>
  );
}
```

You can also change the decoration thickness using one of the `decoration-1`, `decoration-2`, `decoration-4` or `decoration-8` attributes.
