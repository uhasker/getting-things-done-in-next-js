## Hypertext Markup Language

<div style="text-align: right"> <i> Hey guys, how do I parse HTML with a regular expression? <br> - Seconds before disaster </i> </div>

### A minimal HTML file

Create a project directory (_easy-opus_ for example) and within that, a directory for the website client.
Name it something descriptive, like _client_.
Your directory structure should now appear as follows:

```
easy-opus/
└─── client/
```

From here on, all work will be done within the _client_ directory.

Now, let's create your first webpage using **HTML**, a markup language designed for defining documents to be displayed in a browser.

> Markup languages provide rules for defining the type of information contained in a document.
> Markup languages differ from programming languages - while markup languages enable the creation of displayable documents, programming languages offer much more powerful capabilities.

Navigate to the client directory and create a file named `index.html` in there. Now write some minimal useful HTML to display two hardcoded tasks:

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
          <p> Read the MERN book: Read and understand the MERN book.</p>
          <p> Write a website: Create a new and cool website.</p>
        </div>
      </div>
    </div>
  </body>
</html>
```

When you open the HTML file in your browser you should see something like this:

![](images/minimal.png)

Hooray, you've created a simple HTML document!
Now you can close this book and go procrastinate.
What's that?
You're not budging?
Hm, that's weird.
Oh we see, you've been forced to read this book (blink _once_ for help).
Well, since we both have to be here anyway, let's march onwards and dissect the masterpiece you've just created!

### HTML elements

HTML is comprised of elements used to specify the type of content you want to render.
For example, the `p` element represents a paragraph:

```html
<p>Read the MERN book: Read and understand the MERN book.</p>
```

An HTML element usually has some _content_ between an _opening tag_ and a _closing tag_.
The opening tag is the name of the element wrapped in angle brackets (like `<p>`).
The closing tag is the name of the element wrapped in angle brackets with a _forward slash before the name_ (like `</p>`).

There are various HTML elements, such as `p` for paragraphs and `div` for generic containers.
We will discuss more elements later.

HTML's power lies in the fact that most elements can be nested.
For example, you could nest paragraphs within a generic container:

```html
<div>
  <p>Read the MERN book: Read and understand the MERN book.</p>
  <p> Write a website: Create a new and cool website.</p>
</div>
```

Elements can also have _attributes_.
Two particularly important attributes are `id` and `class`.

The `id` attribute is used to specify a _unique identity_ for an HTML element.
You can use that attribute to - well - uniquely identify an element.
This allows us to reference that element using JavaScript or CSS.

The `class` attribute is used to specify a _class_ for an HTML element.
Unlike unique identifiers, multiple HTML elements can share the same class, which is useful for applying consistent styles to multiple elements.
For example you could color all HTML elements of class `blue-text` blue.

There are many more attributes and different HTML elements often have different attributes.

Examining `index.html`, you can observe the structure of an HTML document.
An HTML document begins with `<!DOCTYPE html>` which is a _document type declaration_.
This is followed by an `html` element which contains all the content of the document.
The head element includes content not directly related to the displayed content, such as the page title and character encoding.
Finally the `body` element contains all the content that will actually be rendered on the page.
In our example, the task list is within the `body` element.

> We will discuss character encodings in greater detail later.

### Summary

You know what HTML is and how HTML elements look like.

### Further reading

- [Introduction to HTML - Getting started with HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started)
