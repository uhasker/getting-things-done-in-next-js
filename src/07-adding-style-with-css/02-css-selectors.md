## CSS Selectors

### The Document

We will use the following HTML document for our examples:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Easy Opus</title>
    <style>
      /* styles go here */
    </style>
  </head>
  <body>
    <div id="app">
      <div>
        <h1 id="title">My tasks</h1>
        <p>Here is a list of my tasks:</p>
        <div id="taskList">
          <p id="task1" class="task">Read the Next.js book</p>
          <p id="task2" class="task">Write a website</p>
        </div>
      </div>
    </div>
  </body>
</html>
```

### Type Selectors

CSS selectors are used to target the elements we want to style.

You can use **type selectors** (also called tag name selectors or element selectors) to target all elements of a certain type.

For example, the following CSS will style all `<p>` elements:

```css
p {
  color: red;
}
```

### ID Selectors

You can use **ID selectors** to target a specific element by its `id` attribute.
ID selectors begin with a `#` symbol.

For example, the following CSS will style the element with the `id` attribute set to `task1`:

```css
#task1 {
  color: blue;
}
```

If you would like to style the first task blue and the second task green, you can use the following CSS:

```css
#task1 {
  color: blue;
}

#task2 {
  color: green;
}
```

### Class Selectors

You can use **class selectors** to target all elements with a specific class.
Class selectors begin with a `.` symbol.

For example, the following CSS will style all elements with the `task` class:

```css
.task {
  color: blue;
}
```

### Selector Lists

You can target multiple selectors by separating them with a comma.

For example, the following CSS will style all `<p>` and `<h1>` elements:

```css
p,
h1 {
  color: red;
}
```

Selector lists don't need to consist of selectors of the same type.
For example, you can write a selector list that targets eleemnt by tag and ID:

```css
p,
#title {
  color: red;
}
```
