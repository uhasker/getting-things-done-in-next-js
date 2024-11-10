### Classes

Instead of manually constructing objects, you can also use classes.

**Classes** are templates for creating objects.
For example, you could define a `Task` class that would serve as a template for creating task objects:

```js
class Task {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}
```

Note the presence of the special `constructor` method.
This method allows you to correctly initialize the object with some values.
Specifically, you can construct a task object from the `Task` class using the `new` operator:

```js
const task = new Task(1, 'Read the Next.js book', 'Read and understand the Next.js book.');
```

> If an object is constructed from a class `X`, we often say that the object is an `X` object.
> For example, the `task` variable is a `Task` object.

You can then access the instance properties as you normally would:

```js
console.log(task.id); // 1
console.log(task.title); // Read the Next.js book
console.log(task.description); // Read and understand the Next.js book.
```

Another important keyword for working with classes is the `this` keyword.
The `this` keyword allows you to point to the current instance of the class.
For example, we could write a method that gets a short description by combining the ID and title of a task like this:

```js
class Task {
  // constructor

  getShortDescription() {
    return `Task ${this.id} (${this.title})`;
  }
}
```

Let's now construct two tasks:

```js
const task1 = new Task(1, 'Read the Next.js book', 'Read and understand the Next.js book.');
const task2 = new Task(2, 'Write a task app', 'Write an awesome task app.');
```

We can now log the short description of the first task:

```js
console.log(task1.getShortDescription());
```

This will log:

```
Task 1 (Read the Next.js book)
```

Similarly, we can log the short description of the second task:

```js
console.log(task2.getShortDescription());
```

This will log:

```
Task 2 (Write a task app)
```

Why does this work?
Put differently, how does `getShortDescription` know whether it should refer to `task1` or `task2`?

The answer is the `this` keyword.
In the case of `task1.getShortDescription()`, `this` will refer to `task1` and so your code will access `task1.id` and `task1.title`.
However, in the case of `task2.getShortDescription()`, `this` will refer to `task2` and so your code will access `task2.id` and `task2.title`.

### Instance Methods

An **instance method** (often just **method** for short) is a function which is a property of an object.

```js
const greeter = {
  greet: function () {
    console.log('Hello, world!');
  },
};
```

You can call a method like this:

```js
greeter.greet(); // Hello, world!
```

Methods can refer to the properties of an object using the `this` keyword which is simply a reference to the current object:

```js
const task = {
  id: 1,
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
  longDescription: function () {
    return `${this.title}(ID = ${this.id}): ${this.description}`;
  },
};
```

You can call the method by writing `task.longDescription()`.
This would output:

```
Read the Next.js book(ID = 1): Read and understand the MERN book.
```

Methods can also change properties of objects.

We will not dwell on methods for too long, since we will not use them all that often as this would lead to a _ghastly_ thing called _Object-Oriented Programming_ (OOP for short).
Instead we want you to think _functionally_, which is what we will talk about in a few sections.

> Inevitable disclaimer for _certain_ Java/C#/... people:
> The sentence about OOP was a joke and used correctly, OOP has its merits.
> We just wanted to be funny.
> We're very sorry about that and will now perform the appropriate penance procedure.

### Static Methods

Static methods are methods that are like regular functions which need to be prefixed with a name.
For example you can use `Number.parseInt` to parse a string argument:

```js
console.log(Number.parseInt('123')); // 123
```

Static methods will become important in a few sections, when we introduce a few useful static methods that deal with arrays and objects.

> Our definition of static methods is a bit ugly because the technically correct definition would require the concept of a class, which we're not going to introduce in this book.
