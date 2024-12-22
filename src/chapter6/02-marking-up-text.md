## Marking Up Text

<div style="text-align: right"> <i> Who needs semantic HTML anyway? <br> — Seconds before disaster </i> </div>

### The Paragraph Element

The most basic element for marking up text is the paragraph element `<p>`:

```html
<p>This is the first paragraph of many, many paragraphs.</p>
<p>This is the second paragraph of many, many paragraphs.</p>
<p>This is the third paragraph of many, many paragraphs.</p>
```

Visually speaking, paragraphs are represented as text blocks separated from surrounding content by blank lines.
Paragraphs are commonly used to group related text.

### Breaking Up Text

You can break up text with the line break element `<br>`:

```html
There is a line break here. <br />
This is some text after the line break.
```

Additionally, you can use the `<hr>` element for a thematic break of some text.
It will usually be visually presented as a horizontal line.

```html
Here is some text. <hr /> Here is some text about something totally different.
```

The `<hr>` element is often used to introduce thematic breaks between paragraphs.

### Heading Elements

There are six heading elements, `<h1>` to `<h6>`.
The different heading elements represent different "heading levels", e.g. `<h1>` is the main heading, `<h2>` a subheading and so on:

```html
<h1>Main heading</h1>

<h2>Subheading 1</h2>
<h3>Subsubheading 1.1</h3>
<p>Some content related to subheading 1.1</p>
<h3>Subsubheading 1.2</h3>
<p>Some content related to subheading 1.2</p>

<h2>Subheading 2</h2>

<h3>Subsubheading 2.1</h3>
<p>Some content related to subheading 2.1</p>
<h3>Subsubheading 2.2</h3>
<p>Some content related to subheading 2.2</p>
```

You will rarely need `<h4>` to `<h6>`—very few documents require such deeply nested heading levels.

Additionally, you should only use a single `<h1>` heading in a page since this is the top-level heading.

### Emphasis and Importance

If we want to emphasize a part of a text (like an important word) we can use the `<em>` and `<strong>` elements.
The `<em>` element marks that a text should be emphasized:

```html
The weather today is <em>very</em> hot.
```

The `<strong>` element marks that a text has strong importance:

```html
The weather today is not just hot, it's <strong>scorching</strong>.
```

As you probably guessed, deciding which of these two elements is appropriate is largely on you.
If you want to emphasize some part of a text, but it doesn't have strong urgency, you should use `<em>`.
If a text is very important, you should use `<strong>` instead.

> There are also the `<i>` and `<b>` elements.
> However, we will rarely use them, since `<em>` and `<strong>` have a semantic meaning (see below for what this means).

### Other Text Elements

We've only scratched the surface of the kind of text markup you can perform with HTML.
There are many, many other elements you can use.
For example, you can mark up subscripts and superscripts with `<sub>` and `<sup>` respectively:

```html
<p>The chemical formula for water is H<sub>2</sub>O.</p>
<p>The equation for energy is E = mc<sup>2</sup>.</p>
```

You can add quotes—both blockquotes (with `<blockquote>`) and inline quotes (with `<q>`):

```html
<p>As the famous physicist once said:</p>

<blockquote cite="https://some-random-quotes.com/">
  "Stop believing quotes you found on the internet"
</blockquote>

<p>
  As Einstein once said,
  <q>people who build their lifes around random internet quotes are stupid.</q>
</p>
```

Trying to learn every single HTML element for marking up text would be a pointless endeavour (you can look them up with a simple Google search anyway).
Just be aware that when it comes to marking up text there might be an HTML element for your use case.

### Semantic HTML

In a few chapters, we will introduce you to CSS, which will allow you to style your HTML elements however you see fit.
At this point most people forget that there are any elements besides the generic `<div>` container since they can now just _style_ the `<div>` to look however they want.

This is a _really bad idea_.

The problem is that _looking_ at a page is not the only way to browse the web.

First of all, there are a lot of visually impaired people in the world who use screen readers to navigate the internet.
Screen readers tend to focus on the HTML elements and not the styles (which makes sense, since reading out styles is not really something you want to do).

If you write a heading as a styled `<div>` instead of an `<h1>` you are not only doing more (unneccessary) work, you also give visually impaired people a worse experience.
Screen readers often interpret headings in a special way.
For example, you can ask most screen readers to read all headings on a page out loud and then jump to some heading you care about.
This is of course not possible with `<div>`s.

Second, your page will also be consumed by programs responsible for indexing and ranking.
If your website contains generic containers only, it will usually be downgraded resulting in the much dreaded _bad Search Engine Optimization_.

Therefore, you should _absolutely not_ forget about the _semantically correct_ HTML elements we've presented in this section.

> Also, if you don't use semantically correct HTML, your fellow developers will let you know about this in the _smuggest_ way possible.
