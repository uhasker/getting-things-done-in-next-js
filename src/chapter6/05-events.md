## Events

<div style="text-align: right"> <i> What was the difference between target and currentTarget again? <br> — Seconds before disaster </i> </div>

### The Basics

**Events** can be used to react to "interesting changes" like user input.
For example, you might want to do something if the user clicks a button, presses a key or resizes the window.

Consider the following simple HTML example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example</title>
  </head>
  <body>
    <a id="example-link" href="http://example.com/">Go to example page</a>
    <button id="example-button">Click me!</button>
    <div id="parent">
      <button id="child">Click the child!</button>
    </div>
    <script>
      /* Our JavaScript code will go here. Note that the script tag must be at the end of the body. */
    </script>
  </body>
</html>
```

We can use the `addEventListener` to register an **event listener** on the button to set up a function that should be called if the button is clicked.

The `addEventListener` function takes two arguments.
The first argument is the event to listen to (which in this case will be `'click'`).
The second argument is a function that takes the specific event and handles it.

```js
document.querySelector('#example-button').addEventListener('click', () => {
  console.log('Button was clicked!');
});
```

If you click the button, the text `Button was clicked!` will appear in the console.

> The `addEventListener` is a typical example of a higher-order function since it takes a function as one of its arguments.

You can remove an event listener using the `removeEventListener` function:

```js
const clickFunction = () => {
  console.log('Button was clicked!');
};

document.querySelector('#example-button').addEventListener('click', clickFunction);
document.querySelector('#example-button').removeEventListener('click', clickFunction);
```

The registered function can take the `event` object as an argument which is useful if you need to gather more information about the event:

```js
document.querySelector('#example-button').addEventListener('click', (e) => {
  console.log(e);
});
```

### Preventing Default Actions

Many events have default actions.
For example, clicking a link will navigate you to a new page.

You can prevent the default action using `event.preventDefault()`:

```js
document.querySelector('#example-link').addEventListener('click', (e) => {
  e.preventDefault();
  console.log("You can't click this link, harharhar.");
});
```

While you should definitely not break links in this manner, `event.preventDefault()` is useful with other elements as we will see in the next sections.

### Event Targets

An event object has two important properties that are a common source of confusion for beginners—`target` and `currentTarget`.

The `target` is the element that triggered the event.

However, the `currentTarget` is a reference to the element to
which the event handler was attached in the first place.
Put simply, `currentTarget` is the element that listens to the event.

The `target` and `currentTarget` can be the same element if the element that triggers the event is also the element that listens to the event.
However, that doesn't have to be the case.

Consider our setup with a `<div>` element containing a `<button>`:

```html
<div id="parent">
  <button id="child">Click the child!</button>
</div>
```

Let's put a `click` event listener on the parent `<div>`:

```js
document.querySelector('#parent').addEventListener('click', (e) => {
  console.log('event.target:', event.target);
  console.log('event.currentTarget:', event.currentTarget);
});
```

Here, the `target` would be the child `<button>` because that was the element that actually triggered the event.
After all, you click the child `<button>` and not the parent `<div>`.

However, the `currentTarget` would be the parent `<div>` because that was the element to which we attached the event handler.

You can verify this yorself.
If you click the `child` button, you will see that `event.target` refers to the child `<button>` while `event.currentTarget` refers to the parent `<div>`.

It's also important to note that the value of `event.currentTarget` is only available while the event is being handled.
This means that if you `console.log()` the event, store in a variable and then look at `event.currentTarget` in the console, you will get `null`.
This can be extremely confusing if you're trying to debug events.

### A Simple Example

Here is how we could create a button that dynamically adds a new task every time we click it:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example</title>
  </head>
  <body>
    <div id="task-list">
      <button id="addTask">Add a task</button>
    </div>
    <script>
      function addTask() {
        const paragraph = document.createElement('p');
        paragraph.classList.add('task');
        paragraph.innerHTML = 'New task';
        const taskList = document.querySelector('#task-list');
        taskList.appendChild(paragraph);
      }
      document.querySelector('#task-list').addEventListener('click', () => {
        addTask();
      });
    </script>
  </body>
</html>
```

Note that all the new tasks will be lost if you refresh the page or close your browser.
That's because they are currently only stored in the client (and not on the server).
