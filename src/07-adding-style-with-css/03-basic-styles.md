## Basic Styles

### Typography

You can change the typeface of your text using the `font-family` CSS property.

For example, the following CSS will change the typeface of the text to sans-serif:

```css
font-family: sans-serif;
```

Here is how you could use this CSS in your HTML document:

```html
<p style="font-family: sans-serif;">This uses a sans-serif font</p>
<p style="font-family: serif;">This uses a serif font</p>
<p style="font-family: monospace;">This uses a monospace font</p>
```

You can change the size of your text using the `font-size` CSS property.

You can set sizes either in absolute units (pixels) or in relative units (em, rem).

Pixels are absolute units, meaning that the styling of the element will be independent of other elements on the page.
For example, the following CSS will change the size of the text to 16px:

```css
font-size: 16px;
```

Here is how you could use this CSS in your HTML document:

```html
<p style="font-size: 16px;">This uses a 16px font</p>
```

Unlike the absolute pixel unit, relative units are relative to something.
The `em` unit is relative to the font size of the element and the `rem` unit is relative to the font size of the root element.

For example, the following CSS will change the size of the text to 1em:

```css
font-size: 1em;
```

Here is how you could use this CSS in your HTML document:

```html
<p style="font-size: 1em;">This uses a 1em font</p>
```

Similarly, the following CSS will change the size of the text to 1rem:

```css
font-size: 1rem;
```

Here is how you could use this CSS in your HTML document:

```html
<p style="font-size: 1rem;">This uses a 1rem font</p>
```

You can change the weight of your text using the `font-weight` CSS property.

For example, the following CSS will change the weight of the text to bold:

```css
font-weight: bold;
```

Here is how you could use this CSS in your HTML document:

```html
<p style="font-weight: bold;">This uses a bold font</p>
```

You can change the height of the line of text using the `line-height` CSS property.

For example, the following CSS will change the height of the line of text to 1.5:

```css
line-height: 1.5;
```

Here is how you could use this CSS in your HTML document:

```html
<p style="line-height: 1.5;">This uses a 1.5 line height</p>
```

You can change the alignment of your text using the `text-align` CSS property.

For example, the following CSS will change the alignment of the text to center:

```css
text-align: center;
```

Here is how you could use this CSS in your HTML document:

```html
<p style="text-align: left;">This text is left-aligned</p>
<p style="text-align: center;">This text is centered</p>
<p style="text-align: right;">This text is right-aligned</p>
<p style="text-align: justify;">This text is justified</p>
```

You can change the color of your text using the `color` CSS property.

For example, the following CSS will change the color of the text to red:

```css
color: red;
```

Here is how you could use this CSS in your HTML document:

```html
<p style="color: red;">This text is red</p>
<p style="color: blue;">This text is blue</p>
<p style="color: green;">This text is green</p>
```

You can change the decoration of your text using the `text-decoration` CSS property.

For example, the following CSS will change the decoration of the text to underline:

```css
text-decoration: underline;
```

Here is how you could use this CSS in your HTML document:

```html
<p style="text-decoration: underline;">This text is underlined</p>
<p style="text-decoration: none;">This text is not underlined</p>
```

### Background

You can change the background of an element using the `background` CSS property.

For example, the following CSS will change the background of the element to red:

```css
background: red;
```

Here is how you could use this CSS in your HTML document:

```html
<div style="background: red; color: white;">This is a red background</div>
```
