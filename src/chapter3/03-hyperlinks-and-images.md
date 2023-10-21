## Hyperlinks and Images

### Hyperlinks

One of the most important elements of most websites are **hyperlinks**.
You are probably already familiar with them - hyperlinks allow you to link web pages, documents or other resources from your page.
If the link is clicked, the linked page is opened in your browser.

Here is how you can create a hyperlink:

```html
<a href="https://example.com/">Example</a>
```

This creates link with the text "Example" that links the resource mentioned in the `href` attribute (which in this case is `"https://example.com/"`).
The text becomes blue and gets underlined.
If you click the text, the web browser opens the page `"https://example.com/"`.

Note that HTML element can also be made into links, for example:

```html
<a href="https://example.com/">
  <h1> Example </h1>
</a>
```

### Images

To show an image, you can use the `<img>` element:

```html
<img src="image.jpg" alt="An example image" />
```

The `src` attribute contains the path to the image you want to show.
The `alt` attribute holds a textual replacement for the image and is necessary in case the image can't be shown.
Try misspelling the filename on purpose an you will see the textual replacement.

In practice the textual replacement is useful if:

- there is a network error and the image can't be fetched
- the user is using a screen reader (in this case the textual replacement is read out loud to him)
- the browser doesn't support the image type
- the user has turned off images to reduce data transfer

Additionally search engines will usually look at the `alt` attributes of images.

You should therefore _always_ include the `alt` attribute for every image.

> The `alt` attribute is a typical example of semantically correct HTML.
> Sure, you page will usually look right even if you don't use it, but the user experience for some users will be much worse.

### Image Links

You can use the fact that HTML elements can be made into links to create image links:

```html
<a href="https://example.com/">
  <img src="example.png" alt="An example image" />
</a>
```

This will show a clickable image - if the image is clicked, the browser will open `"https://example.com/"`.
