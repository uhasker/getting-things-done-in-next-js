## Web Forms

### Why Web Forms?

**Web forms** (or just **forms** for short) provide the standard tool for accepting user input.
A web form contains one or more **form controls** which are usually paired with text labels which describe the purpose of the control.

For example you might want to build a contact form.
This should have:

- a text input for the name
- a text input for the email
- a multiline text input for the message to submit
- a submit button

### Creating a Form

Forms can be created using the `<form>` element:

```html
<form> ... </form>
```

> Note that usually `<form>` elements contain an `action` attribute which defines the URL where the form's data should be submitted.
> However in this book we will handle form submissions manually, so we won't go in detail on the `action` attribute.

Let's now add the form control for the username along with a label:

```html
<label for="name">Name:</label> <input type="text" id="name" name="name" />
```

TODO: type, id, name, for

Now let's add the form control for the email.
We could theoretically use the `text` type again, however email is better because of semantic HTML:

```html
<label for="email">Name:</label> <input type="email" id="email" name="email" />
```

Finally for the multiline text we will use the `textarea` element:

```html
<label for="message">Message:</label> <textarea id="message" name="message"></textarea>
```

The last element we need is the submit button:

```html
<button type="submit">Send</button>
```

Here is how the final form will look like:

```html
<form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" />
  <label for="email">Name:</label>
  <input type="email" id="email" name="email" />
  <label for="message">Message:</label>
  <textarea id="message" name="message"></textarea>
  <button type="submit">Send</button>
</form>
```

### Structuring Forms with `<fieldset>` and `<legend>`

Better:

```html
<form>
  <fieldset>
    <legend>Message Form</legend>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" />
    <label for="email">Name:</label>
    <input type="email" id="email" name="email" />
    <label for="message">Message:</label>
    <textarea id="message" name="message"></textarea>
    <button type="submit">Send</button>
  </fieldset>
</form>
```

### Other Types

TODO: radio, choice, dropdown
