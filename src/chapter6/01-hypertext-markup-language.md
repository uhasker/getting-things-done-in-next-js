## Hypertext Markup Language

<div style="text-align: right"> <i> Hey guys, how do I parse HTML with a regular expression? <br> — Seconds before disaster </i> </div>

### A Minimal HTML File

Let's create a webpage using **HTML**, a markup language designed for defining documents to be displayed in a browser.
We briefly touched on HTML in the first section of the JavaScript chapter, but now we will dive deeper.

> Markup languages provide rules for defining the type of information contained in a document.
> Markup languages differ from programming languages—while markup languages enable the creation of displayable documents, programming languages offer much more powerful capabilities.
> Therefore, HTML is a markup language and JavaScript is a programming language.

First, create a project directory.
From here on, all work will be done within that directory.

Now, create a file named `index.html` in the project directory and write some minimal useful HTML to display two hardcoded tasks:

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

When you open the HTML file in your browser you should see a heading and two tasks.

That's it, you've created a simple HTML document!
Now, you can close this book and go procrastinate.

What's that?
You're not budging?
Hm, that's weird.
Oh, we see, you've _unfortunately_ been _forced_ to read this book (blink _once_ for help).

Well, since we have to be here anyway, might as well continue and dissect the masterpiece you've just created!

### HTML Elements

HTML documents are comprised of **HTML elements** used to specify the type of content that should be rendered.
For example, the `p` element represents a paragraph:

```html
<p>Read the Next.js book</p>
```

An HTML element usually has some **content** between an **opening tag** and a **closing tag**.
The opening tag is the name of the element wrapped in angle brackets (like `<p>`).
The closing tag is the name of the element wrapped in angle brackets with a _forward slash before the element name_ (like `</p>`).

There are various HTML elements with different purposes, such as `p` for paragraphs and `div` for generic containers.
We will discuss a few important HTML elements in the following sections.

HTML's power lies in the fact that most elements can be nested.
For example, you could nest paragraphs within a generic container:

```html
<div>
  <p>Read the Next.js book</p>
  <p>Create a website</p>
  <p>???</p>
  <p>Profit!</p>
</div>
```

The nesting can go as deep as you want.
For example, we could use the `<em>` element to emphasize some of the words in the previous example:

```html
<div>
  <p>Read the <em>Next.js</em> book</p>
  <p>Create a <em>website</em></p>
  <p>???</p>
  <p>Profit!</p>
</div>
```

Note that the tags of the element being nested must be inside the tags of the element it's being nested in.
For example, the tags of the element `<em>Next.js</em>` are inside the element `<p>Read the <em>Next.js</em> book</p>`.

Some elements are so-called **void elements**, meaning that they can't have any nested child elements.
Void elements only have a start tag.
End tags must not be specified for such void elements.

For example, the line break `<br>` is a void element because it wouldn't make sense to put additional elements inside a line break.
It's common to write void elements by appending a trailing slash character to the element `<br />`.

> Note that technically self-closing tags do not exist in HTML.
> If a trailing slash is present, HTML parsers simply ignore that character.
> However, adding a trailing slash makes void elements more readable and is therefore common practice.

### HTML Attributes

Elements can also have **HTML attributes**.
Attributes contain further information about the element.
Two particularly important attributes are `id` and `class`.

The `id` attribute is used to specify a **unique identity** for an HTML element.
You can use that attribute to—well—uniquely identify an element.
This allows us to reference that element from places like JavaScript code or CSS stylesheets.

Here is how we can create an element with an `id` attribute:

```html
<p id="read-book">Read the Next.js book</p>
```

Generally speaking, you can specify attributes by writing the attribute name, followed by an equals sign `=`, followed by the attribute value wrapped inside double quotes.

The `class` attribute is used to specify a **class** for an HTML element.
Unlike unique identifiers, multiple HTML elements can share the same class, which is useful for applying consistent logic to multiple elements.
For example, you could give all HTML elements of class `blue-text` a blue text color.

Here is how we can create an element with a `class` attribute:

```html
<p class="blue-text">Read the Next.js book</p>
```

A common naming convention for IDs and classes is `dash-case` where each word is in lower case, and separated by dashes.

There are many more attributes and different HTML elements often have different attributes you can apply to them.
We will cover some of the most important elements together with their attributes in the next sections.

### Structure of an HTML Document

Let's have a look at `index.html` again and examine its structure in more detail:

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

The document begins with `<!doctype html>` which is a _document type declaration_.
It is there mainly for historical reasons—in the _olden days_ of HTML the doctype specified which rules the HTML page followed.
However, the olden days are no longer with us and we just use the shortest valid doctype which happens to be `<!doctype html>`.

The doctype is followed by an `<html>` element which contains all the content of the document.
This element is usually called the **root element**.
The `<html>` element contains a `<head>` and `<body>` elements (there is that nesting again).

The `<head>` element includes important information about the page that doesn't appear on the page itself.
Here is where we could specify how our page would appear in search results, which character encoding our website uses and more.

In this example, the `<head>` element includes a `<meta>` element with a `charset` attribute and a `<title>` element.

This particular `<meta>` element describes the character encoding for the HTML document and the `<title>` element sets the title of the page.
This title is displayed in the browser tab and is also used when you save the page in your bookmarks.

Finally, the `<body>` element contains all the content that will actually be rendered on the page.
In our example, the heading and the task list are within the `<body>` element.
