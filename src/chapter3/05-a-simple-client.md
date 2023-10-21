## A Simple Client

### The Requirements

One day you sit around and dream about the sunshine outside as suddently the dreaded _Project Manager_ walks up to you and asks you to build a small task application.
The application should consist of a list showing the current tasks.
Additionally, a web form should allow the user to create a new task (which should then be showed in the list of current tasks).

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
    <ul id="taskList"> </ul>

    <!-- Form to Add Tasks -->
    <h2>Add a Task</h2>
    <form id="taskForm">
      <label for="taskInput">Task:</label>
      <input type="text" id="taskInput" placeholder="Enter your task" />
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

Lets first grab the relevant items (the code goes between the `<script></script>` tags).
This can be done using the `querySelector` method.
In this case we want to select by ID, so we use the `#` selector:

```js
const taskList = document.querySelector('#taskList');
const taskForm = document.querySelector('#taskForm');
```

### Adding an Event Listener

Next, we need to add an event listener to `taskForm`.
This can be done via the `addEventListener` function which takes two arguments.
The first argument is the event to listen to (which is `'submit'` in this case).
The second argument is a function that takes the specific event and handles it.
Note that `addEventListener` is a typical example of higher-order function since it takes a function as one of its arguments.

Let's just log the `currentTarget` of the event for now.
This property identifies the element to which the event handler has been attached (in this case it's the task form).

```js
taskForm.addEventListener('submit', function (event) {
  // Prevent default form submission
  event.preventDefault();

  console.log({ currentTarget: event.currentTarget });
});
```

The currentTarget has the proeprty `elements` which contains `taskInput` and that has a value:

```js
taskForm.addEventListener('submit', function (event) {
  // Prevent default form submission
  event.preventDefault();

  console.log({ inputValue: event.currentTarget.taskInput.value });
});
```

This should log the input.

Lets now store it in a variable and use `trim` to remove whitespace:

```js
taskForm.addEventListener('submit', function (event) {
  // Prevent default form submission
  event.preventDefault();

  const task = event.currentTarget.taskInput.value.trim();
});
```

Finally:

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

If you click the button, a task is added.

### Adding a Delete Button

We need to add a delete button:

```js
const li = document.createElement('li');
li.textContent = task;

// Create a delete button for the task
const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';

// Attach event listener to the delete button
deleteButton.addEventListener('click', function () {
  taskList.removeChild(li);
});

// Append the delete button to the task item
li.appendChild(deleteButton);

// Append the task item to the task list
taskList.appendChild(li);
```

### Problems

Our code is all over the place.
