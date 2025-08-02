## Web Forms

<div style="text-align: right"> <i> A 10-page registration form seems reasonable, right? <br> — Seconds before disaster </i> </div>

### Why Web Forms?

**Web forms** (or just **forms** for short) provide a tool for accepting user input.
They're one of the key components that make your pages interactive.
A web form contains one or more **form controls** which are usually paired with text labels that describe the purpose of the control.
For example, a textual form control for providing a message might be paired with a label explaining that the textual form control represents a message.

Consider a very common example—the contact form.

Such a contact form should probably have:

- a text input for the name of the user submitting the form
- a text input for the email of the user submitting the form
- a multiline text input for the message to submit
- a submit button

### Creating a Form

Forms can be created using the `<form>` element:

```html
<form> ... </form>
```

> Note that usually `<form>` elements contain an `action` attribute which defines the URL where the form's data should be submitted.
> However, in this book we will handle form submissions manually, so we won't go into detail on the `action` attribute.

Let's now add the form control for the username along with a label (note that the elements should go in between the `<form></form>` tags):

```html
<!-- The label -->
<label for="name">Name:</label>
<!-- The form control-->
<input type="text" id="name" name="name" />
```

There are two HTML elements at play here—`<input>` and `<label>`.

The form control is represented by the `<input>` element.
It has a lot of possible attributes, but the two most important ones (apart from the `id` attribute) are the `type` and `name` attribute.

The `type` attribute represents the type of the form control.
For example, a plaintext input field would have the type `text` while a checkbox would have the type `checkbox` (surprise).

The `name` attribute specifies a name for the form control.
This attribute is important when submitting the form (usually by clicking the submit button) as it will identify the submitted value.

The label is represented by the `<label>` element.
The `for` attribute of the label must be an ID of a form control.
In this case the ID of the `<input>` element is `name` and therefore the `for` attribute of the `<label>` element has `name` as its value.

Now let's add the form control for the email.
We could theoretically use the `text` type again, however HTML provides us a custom email type called `email`.
This field looks like a regular text input, but has a few additional nice properties—for example the email is validated on submission:

```html
<!-- The label -->
<label for="email">Email:</label>
<!-- The form control-->
<input type="email" id="email" name="email" />
```

Finally, for the multiline text, we will use the `<textarea>` element:

```html
<!-- The label -->
<label for="message">Message:</label>
<!-- The form control-->
<textarea id="message" name="message"></textarea>
```

The last element we need is the submit button:

```html
<button type="submit">Send</button>
```

Here is how the final form will look like:

```html
<form id="contact">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" />
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" />
  <label for="message">Message:</label>
  <textarea id="message" name="message"></textarea>
  <button type="submit">Send</button>
</form>
```

### Structuring Forms with `<fieldset>` and `<legend>`

We can use the `<fieldset>` and `<legend>` attributes to further improve our form:

```html
<form id="contact">
  <fieldset>
    <legend>Message Form</legend>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" />
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" />
    <label for="message">Message:</label>
    <textarea id="message" name="message"></textarea>
    <button type="submit">Send</button>
  </fieldset>
</form>
```

### Handling a Form Submission

If you click the button right now, the page will refresh, the URL will change and your inputs will be cleared.
This is the default behaviour of a form submission, however we often want to intercept and modify this.

To achieve this, let's add an event listener to the form that will listen for `submit` events:

```js
const contactForm = document.getElementById('contact');
contactForm.addEventListener('submit', function (event) {
  // Prevent default form submission behaviour
  event.preventDefault();

  console.log({ currentTarget: event.currentTarget });
});
```

Note how the `event.currentTarget` object contains our inputs (among other properties).
