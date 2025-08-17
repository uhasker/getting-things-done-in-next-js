## The Box Model

### The Basics of the Box Model

Every element in HTML is a rectangular "box" made up of four nested areas:

![The Box Model](https://developer.mozilla.org/de/docs/Web/CSS/CSS_box_model/boxmodel.png)
_Credit: MDN_

The **content area** (bounded by the content edge) contains the actual content of the element, such as text, images, or other media.
The content area has a width (the content width) and a height (the content height).

The content area can be controlled using the `width` and `height` CSS properties.

The **padding area** extends the content area by a certain distance.
The padding area can be controlled using the `padding` CSS property as well as the `padding-top`, `padding-right`, `padding-bottom`, and `padding-left` CSS properties.

The **border area** extends the padding area by a certain distance.
The border area can be controlled using the `border` and `border-width` CSS properties.

The **margin area** (bounded by the margin edge) extends the border area by a certain distance.
This is useful if you want to separate an element from its neighbors.
The margin area can be controlled using the `margin` CSS property as well as the `margin-top`, `margin-right`, `margin-bottom`, and `margin-left` CSS properties.

### The Content Area

To control the content area, you can use the `width` and `height` CSS properties.

For example, the following CSS will set the width of the content area to 100 pixels and the height to 50 pixels:

```css
width: 100px;
height: 50px;
```

Here is how you could use this CSS in your HTML document:

```html
<div style="width: 100px; height: 50px; background: red; color: white;">This is a content area</div>
```

### The Padding Area

To control the padding area, you can use the `padding` CSS property.

For example, the following CSS will set the padding of the element to 10 pixels:

```css
padding: 10px;
```

You can also use the `padding-top`, `padding-right`, `padding-bottom`, and `padding-left` CSS properties to control the padding of the element.

For example, the following CSS will set the padding of the element to 10 pixels on the top, right, bottom, and left:

```css
padding-top: 10px;
padding-right: 20px;
padding-bottom: 30px;
padding-left: 40px;
```

Alternatively, you can use the `padding` CSS property to set the padding of the element to 10 pixels on the top, right, bottom, and left:

```css
padding: 10px 20px 30px 40px;
```

Here is how you could use this CSS in your HTML document:

```html
<div style="padding: 10px 20px 30px 40px; background: red; color: white;"
  >This is a padding area</div
>
```

### The Border Area

To control the border area, you can use the `border` CSS property.

For example, the following CSS will set the border of the element to 10 pixels wide and red:

```css
border: 10px solid red;
```

You can also use the `border-width` CSS property to control the width of the border.

For example, the following CSS will set the width of the border to 10 pixels:

```css
border-width: 10px;
```

You can also use the `border-style` CSS property to control the style of the border.

For example, the following CSS will set the style of the border to solid:

```css
border-style: solid;
```

Here is how you could use this CSS in your HTML document:

```html
<div style="border-width: 10px; border-style: solid; border-color: red;">This is a border area</div>
```

### The Margin Area

To control the margin area, you can use the `margin` CSS property.

For example, the following CSS will set the margin of the element to 10 pixels:

```css
margin: 10px;
```

You can also use the `margin-top`, `margin-right`, `margin-bottom`, and `margin-left` CSS properties to control the margin of the element.

For example, the following CSS will set the margin of the element to 10 pixels on the top, right, bottom, and left:

```css
margin-top: 10px;
margin-right: 20px;
margin-bottom: 30px;
margin-left: 40px;
```

Here is how you could use this CSS in your HTML document:

```html
<div style="margin: 10px 20px 30px 40px; background: red; color: white;">This is a margin area</div>
```
