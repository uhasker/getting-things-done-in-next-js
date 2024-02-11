## Styling the Task Page

### Thinking about the Style

Before we style anything, we should establish how the page should look like.
This normally involves thinking about typography, color, spacing as well as establishing a design system and much more.

Since this is only a small example project to tie together the things you've learned we will no go full "UI Design" on you.
However, we will set a few rules:

- we will go for a standard "blue" look
- we will use borders (especially for input fields)
- we will use relatively aggressive spacing to separate elements
- we will use font size to indicate importance of elements

Note that right now we mostly care about UI design in so far as it will make the page _usable_.
Making it _pretty_ is the subject of other books.

### Styling the Form

The default styling of the form is so bad, that it's borderline unusable.
Right now, it's not even clear, where we should be typing the title and description.

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

Now we can at least see where to type.

Next, we really need to fix the layout and the spacing of the form.
We want all elements to be below each other:

```jsx
<form onSubmit={handleSubmit} className="flex flex-col">
  {/*...*/}
</form>
```

Now we fix the problem that the form is too wide:

```jsx
<form onSubmit={handleSubmit} className="... w-64">
  {/*...*/}
</form>
```

This already looks much better, but there is too little spacing.
Let's fix that:

```jsx
<form onSubmit={handleSubmit} className="... space-y-4">
  {/*...*/}
</form>
```

Let's also make the button, give it rounded corners and improve the general look & feel a bit:

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

Does this look great?
No.

But at least it's usable and the user knows where to enter things.

### Styling the Tasks

Currently each task looks like this:

```jsx
<div>
  <h3>{task.title}</h3>
  <p>{task.description}</p>
  <p>{task.status}</p>
</div>
```

First, let's create a border around each task for better separation:

```jsx
<div className="border border-gray-400">{/*...*/}</div>
```

Just like the form, the tasks shouldn't take up the entire width:

```jsx
<div className="... w-96">{/*...*/}</div>
```

Let's center everything:

```jsx
<div className="... mx-auto">{/*...*/}</div>
```

Finally, let's add some padding:

```jsx
<div className="... p-4">{/*...*/}</div>
```

Let's also style the task content a bit:

```jsx
<div className="border border-gray-400 w-96 mx-auto p-4">
  <h3 className="text-lg font-bold">{task.title}</h3>
  <p>{task.description}</p>
  <p className="text-sm">{task.status}</p>
</div>
```

Again, it doesn't look pretty, but at least it's functional.
