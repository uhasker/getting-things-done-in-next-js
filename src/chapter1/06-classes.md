## Classes

<div style="text-align: right"> <i> A class without methods is like a sword without edge — all form, no function. <br> — Ancient Chinese proverb </i> </div>

### Defining Classes

Instead of manually constructing objects, you can also use classes.
We will not write our own classes in this book since we adopt a functional style, so we will keep this as brief as possible.

Nevertheless, you still have to roughly understand what a class is in order to use the pre-built classes like `Error` or `Map` that we will discuss in the following sections.

At its core, **classes** are templates for creating objects.
For example, you could define a `Task` class that would serve as a template for creating new task objects like this:

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

If an object is constructed from a class `X`, we often say that the object is an instance of `X` or just an `X` object.
For example, the `task` variable is an instance of the `Task` class or just a `Task` object.

You can then access the instance properties as you normally would:

```js
console.log(task.id); // 1
console.log(task.title); // Read the Next.js book
console.log(task.description); // Read and understand the Next.js book.
```

Another important keyword for working with classes is the `this` keyword.
The `this` keyword allows you to point to the current instance of the class.
Put simply, `this` is a reference to the current object.

Therefore, when we write `this.id = id` in the constructor, we want to initialize the `id` of the _current object_ to the `id` that was passed as an argument to the constructor.

The `this` keyword is particularly important in the context of instance methods.

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

Just like constructors, methods can refer to the properties of an object using the `this` keyword:

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

We can also define instance methods for an entire class.
In that case, the instance method is available for all objects of that class.

For example, we could write an instance method that gets a short description by combining the ID and title of a task like this:

```js
class Task {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

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

Notice how `getShortDescription` is available for both `task1` and `task2`.

But how does this work?
Put differently, how does `getShortDescription` know whether it should refer to `task1` or `task2`?

The answer lies in the `this` keyword.
In the case of `task1.getShortDescription()`, `this` will refer to `task1` and so your code will access `task1.id` and `task1.title`.
However, in the case of `task2.getShortDescription()`, `this` will refer to `task2` and so your code will access `task2.id` and `task2.title`.

### Static Methods

Static methods are methods that can't be accessed on instances of a class, but must be accessed directly on the class itself.
For example, you can use `Number.parseInt` to parse a string argument:

```js
console.log(Number.parseInt('123')); // 123
```

Static methods will become important in a few sections, when we introduce a few useful static methods that deal with arrays and objects.
