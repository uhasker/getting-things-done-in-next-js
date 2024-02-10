## Styling the Task Page

We will go for a standard blue look.

### Styling the Form

Here is how the form looks like right now:

```jsx
<form onSubmit={handleSubmit}>
  <label htmlFor="title">Title:</label>
  <input type="text" id="title" name="title" />
  <label htmlFor="description">Description:</label>
  <textarea id="description" name="description" />
  <button type="submit">Send</button>
</form>
```

First, let's give all the input fields some borders:

```jsx
<form onSubmit={handleSubmit}>
  <label htmlFor="title">Title:</label>
  <input type="text" id="title" name="title" className="border border-gray-400" />
  <label htmlFor="description">Description:</label>
  <textarea id="description" name="description" className="border border-gray-400" />
  <button type="submit">Send</button>
</form>
```

Now at least we can see where to type.

Next, we really need to fix the layout and the spacing of the form.
We want all elements to be below each other:

```jsx
<form onSubmit={handleSubmit} className="flex flex-col">
  {/*...*/}
</form>
```

Now we have the problem that the form is too wide:

```jsx
<form onSubmit={handleSubmit} className="flex flex-col w-64">
  {/*...*/}
</form>
```

Next we align the button left:

```jsx
<button type="submit" className="text-left">
  Send
</button>
```

This already looks much better, but the spacing is still really bad as it's way too little.
Let's fix that:

```jsx
<form onSubmit={handleSubmit} className="flex flex-col w-64 space-y-4">
  {/*...*/}
</form>
```

Let's fix the button:

```jsx
<button type="submit" className="text-center bg-blue-500 w-24 text-white p-2 font-bold rounded-md">
  Add Task
</button>
```

Finally, let's center the form horizontally:

```jsx
<form onSubmit={handleSubmit} className="... mx-auto">
  {/*...*/}
</form>
```

Let's also add some margin above and below the form:

```jsx
<form onSubmit={handleSubmit} className="... my-4">
  {/*...*/}
</form>
```

This is still not perfect, but let's style the tasks first.

### Styling the Tasks

Currently each task looks like this:

```jsx
<div>
  <h3>{task.title}</h3>
  <p>{task.description}</p>
  <p>{task.status}</p>
</div>
```

First let's create a border around each task for better separation:

```jsx
<div className="border border-gray-400">{/*...*/}</div>
```

Just like the form, the tasks shouldn't take up the entire width:

```jsx
<div className="border border-gray-400 w-96">{/*...*/}</div>
```

Let's center everything:

```jsx
<div className="border border-gray-400 w-96 mx-auto">{/*...*/}</div>
```

Finally, let's add some padding:

```jsx
<div className="border border-gray-400 w-96 mx-auto p-4">{/*...*/}</div>
```

Let's also style the task content a bit:

```jsx
<div className="border border-gray-400 w-96 mx-auto p-4">
  <h3 className="text-lg font-bold">{task.title}</h3>
  <p>{task.description}</p>
  <p className="text-sm">{task.status}</p>
</div>
```
