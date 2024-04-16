## Events

<div style="text-align: right"> <i> What was the difference between target and currentTarget again? <br> - Seconds before disaster </i> </div>

### The Basics

**Events** can be used to react to "interesting changes" like user input.
For example, you might want to do something if the user clicks a button, presses a key or resizes the window.

Cosnider the following simple HTML example:

```html
<!doctype html>
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
      /* Our JavaScript code go be here. Note that the script tag must be at the end of the body. */
    </script>
  </body>
</html>
```

We can use the `addEventListener` to register an **event listener** on the button to set up a function that should be called if the button is clicked.

The `addEventListener` function takes two arguments.
The first argument is the event to listen to (which is `'click'` in this case).
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

While you should definitely not break links, `event.preventDefault()` is useful with other elements as we will see in the next sections.

### Event Target

A event object has two important properties that are a common source of confusion for beginners - `target` and `currentTarget`.

The `target` property is a reference to the object onto which the event was dispatched.
The `currentTarget` property is a reference to the element to which the event handler was attached in the first place.

The difference is important, as you can see in the following example:

```js
document.querySelector('#parent').addEventListener('click', (e) => {
  console.log('event.target:', event.target);
  console.log('event.currentTarget:', event.currentTarget);
});
```

If you click the `child` button, you will see that `event.target` refers the `child` button, however `event.currentTarget` is the `parent` div.
This is because the `child` button is the object onto which the event was actually dispatched (because you clicked the child button, and not the div).
However, the `parent` div is the element to which we attached the event handler.

### A Simple Example

Here is how we could create a button that dynamically adds a new task every time we click it:

```html
<!doctype html>
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
