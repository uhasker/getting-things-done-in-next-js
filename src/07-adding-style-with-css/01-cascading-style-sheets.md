## Cascading Style Sheets

### Internal Style Sheets

CSS is the language that describes the styling of an HTML document.

The simplest way to add CSS to an HTML document is by using the `<style>` tag inside the `<head>` section of the HTML document.
This is called an **internal style sheet**.

Consider the HTML document from the HTML chapter:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Easy Opus</title>
  </head>
  <body>
    <div id="app">
      <div>
        <h1>My tasks</h1>
        <div id="taskList">
          <p>Read the Next.js book</p>
          <p>Write a website</p>
        </div>
      </div>
    </div>
  </body>
</html>
```

Let's make the h1 element red and the p elements blue.

To do this, we can add the following CSS to the `<head>` section of the HTML document:

```html
<style>
  h1 {
    color: red;
  }

  p {
    color: blue;
  }
</style>
```

Here is how the full HTML document looks like:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Easy Opus</title>
    <style>
      h1 {
        color: red;
      }

      p {
        color: blue;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <div>
        <h1>My tasks</h1>
        <div id="taskList">
          <p>Read the Next.js book</p>
          <p>Write a website</p>
        </div>
      </div>
    </div>
  </body>
</html>
```

### External Style Sheets

Internal style sheets are fine for small projects, but as the project grows, it can become cumbersome to have all the CSS in the `<head>` section of the HTML document.

To solve this problem, we can use **external style sheets**.

An external style sheet is a separate CSS file that can be linked to an HTML document.

Create a CSS file `styles.css` in your project directory:

```css
h1 {
  color: red;
}

p {
  color: blue;
}
```

Now, you can link the CSS file to the HTML document by adding the following line to the `<head>` section of the HTML document:

```html
<link rel="stylesheet" href="styles.css" />
```

The `<link>` element is used to link an external resource to the HTML document.
We use the `rel` attribute to specify the relationship between the HTML document and the linked resource.
In this case, we use the `stylesheet` value to indicate that the linked resource is a CSS stylesheet.
Finally, we use the `href` attribute to specify the path to the CSS file.

Here is how the full HTML document looks like:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Easy Opus</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div id="app">
      <div>
        <h1>My tasks</h1>
        <div id="taskList">
          <p>Read the Next.js book</p>
          <p>Write a website</p>
        </div>
      </div>
    </div>
  </body>
</html>
```

### Inline Styles

You can also use **inline styles** to style an element.

Inline styles are defined inside the `style` attribute of the element.

For example, the following CSS will style the h1 element red:

```html
<h1 style="color: red">My tasks</h1>
```

Here is how the full HTML document looks like:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Easy Opus</title>
  </head>
  <body>
    <div id="app">
      <div>
        <h1 style="color: red">My tasks</h1>
        <div id="taskList">
          <p>Read the Next.js book</p>
          <p>Write a website</p>
        </div>
      </div>
    </div>
  </body>
</html>
```

Throughout this chapter, we will use either inline styles or internal style sheets for simplicity.
However, in the real world, you will most likely use external style sheets.
