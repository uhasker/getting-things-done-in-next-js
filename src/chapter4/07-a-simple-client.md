## A Simple Client

<div style="text-align: right"> <i> Why use a framework? I'll just write my own in a weekend. <br> - Seconds before disaster </i> </div>

### The Requirements

One day you sit around and dream about sunshine as suddently the dreaded _Project Manager_ approaches you and asks you to build a small task application.
The application should consist of a list showing the current tasks.
Additionally, a web form should allow the user to create a new task (which should then be displayed in the list of current tasks).

### The Initial HTML

You get to work and quickly come up with the initial document:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Task List App</title>
  </head>
  <body>
    <h1>Task List</h1>

    <!-- Task List -->
    <ul id="task-list"> </ul>

    <!-- Form to Add Tasks -->
    <h2>Add a Task</h2>
    <form id="task-form">
      <label for="task-input">Task:</label>
      <input type="text" id="task-input" placeholder="Enter your task" />
      <button type="submit">Add Task</button>
    </form>

    <!-- JavaScript will go here -->
    <script></script>
  </body>
</html>
```

You now have a heading, a list and a form.
However if you click the submit button, not a whole lot happens - this is because we haven't added any submit logic to the form yet.

### Grabbing the Items

Lets first grab the relevant items (remember that the code goes between the `<script></script>` tags).
This can be done using the `querySelector` method.
In this case we want to select by ID, so we use the `#` selector:

```js
const taskList = document.querySelector('#taskList');
const taskForm = document.querySelector('#taskForm');
```

### Adding an Event Listener

Next, we need to add an event listener to `taskForm`.

The `event.currentTarget` will have the property `elements` which contains `taskInput` whose property `value` contains our input:

```js
taskForm.addEventListener('submit', function (event) {
  // Prevent default form submission
  event.preventDefault();

  console.log({ inputValue: event.currentTarget.taskInput.value });
});
```

This should log the input.

Lets now store it in a variable and use `trim` to remove whitespace from both ends:

```js
taskForm.addEventListener('submit', function (event) {
  // Prevent default form submission
  event.preventDefault();

  const task = event.currentTarget.taskInput.value.trim();
});
```

Finally we will use the `createElement` method to create a new `li` element and the `appendChild` method to add the newly created element to our task list:

```js
taskForm.addEventListener('submit', function (event) {
  // Prevent default form submission
  event.preventDefault();

  const task = event.currentTarget.taskInput.value.trim();

  const li = document.createElement('li');
  li.textContent = task;
  taskList.appendChild(li);

  // Clear the input field
  event.currentTarget.taskInput.value = '';
});
```

When you now click the button, you will see that a new task will be added.

### Adding a Delete Button

As you complete the project, the _Project Manager_ once again walks up to you and remembers that it might be a good idea to allow the user to delete tasks.
So now you need to add a delete button.

This means that whenever you create a new element, you need to add a delete button to it.
To accomplish this we first need to create the delete button:

```js
const li = document.createElement('li');
li.textContent = task;

// New code starts here

const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
```

Then we need to attach an event listener to the delete button:

```js
deleteButton.addEventListener('click', function () {
  taskList.removeChild(li);
});
```

Finally we need to add the delete button to the task item:

```js
li.appendChild(deleteButton);
```

Quite a lot of work to just add a little delete button.
Additionally our code is now all over the place and not really reusable.
This doesn't seem like it will scale to a larger application.

To simplify our lives, we will use a library called **React**.
The idea behind React is to create declarative UIs with nicely separated components.
Basically we only define how the application should look like (hence the _declarative_ aspect) and React takes care of the rest, such as determining the necessary DOM manipulations.
As you will see soon, this is an incredibly useful feature.
