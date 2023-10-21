## A Simple Client

<div style="text-align: right"> <i> Why use a framework? I'll just write my own in a weekend. <br> - Seconds before disaster </i> </div>

### The Requirements

One day you sit around and dream about some sunshine as suddently the dreaded _Project Manager_ approaches you and asks you to build a small task application.
The application should consist of a list showing the current tasks.
Additionally, a web form should allow the user to create a new task (which should then be displayed in the list of current tasks).

### The Initial HTML

You get to work and quickly come up with the initial document:

```html
<!doctype html>
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
Note that `addEventListener` is a typical example of a higher-order function since it takes a function as one of its arguments.

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

Now you click the button, you will see that a task will be added.

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
