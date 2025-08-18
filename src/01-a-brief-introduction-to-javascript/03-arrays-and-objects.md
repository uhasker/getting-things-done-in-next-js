## Arrays and Objects

<div style="text-align: right"> <i> The object of the superior programmer is truthy. <br> — Confucius </i> </div>

### Arrays

Let's say we are writing a task application and we need to store a collection of tasks.
We could declare a separate variable for every task like this:

```js
const task1 = 'First task';
const task2 = 'Second task';
const task3 = 'Third task';
```

However, this would quickly become very tedious.
Additionally, we likely want to add or remove tasks in our application, which makes managing separate variables even more cumbersome.
In other words, this approach is highly inefficient.

Therefore, we need a way to store multiple values in a single variable.
We can accomplish this with arrays.

A JavaScript **array** is an ordered collection of multiple values.
You can declare an array using an **array literal** which in this context is also called an **array initializer**:

```js
const tasks = ['First task', 'Second task', 'Third task'];
```

Note that an array is no longer a primitive type.
Instead, arrays have the type `object`:

```js
console.log(typeof tasks); // object
```

You can access individual elements of an array using the index notation.
This works by writing the name of the array, followed by the position of the element you want to retrieve inside square brackets `[]`.
Note that when we count array indices—meaning the positions of elements—we start at 0, not at 1:

```js
console.log(tasks[0]); // First task
console.log(tasks[1]); // Second task
```

If the array index is too big, trying to access the element at that index will return `undefined`:

```js
console.log(tasks[3]); // undefined
```

We can get the length of an array using `.length`:

```js
console.log(tasks.length); // 3
```

JavaScript has elegant syntax for working with arrays.
For example, if we want to assign variables based on values of an array, we would normally have to do something like this:

```js
const firstTask = tasks[0];
const secondTask = tasks[1];
const thirdTask = tasks[2];
```

This approach is, once again, quite tedious.

Instead, we can use the **array destructuring assignment**:

```js
const [firstTask, secondTask, thirdTask] = tasks;
console.log(secondTask); // Second task
```

If we only need some of the elements, we can use the **spread** (`...`) syntax:

```js
const [firstTask, ...otherTasks] = tasks;
```

A common pitfall occurs when attempting to copy an array.
For example, suppose we have an array of numbers called `arr` and we want to create a copy called `arr2`.
We could try something like this:

```js
const arr = [1, 2, 3, 4];
const arr2 = arr;
```

Unfortunately, this does not work as expected.
We can see that if we try to change the first element of `arr` and then have a look at `arr[0]` and `arr2[0]`:

```js
arr[0] = 5;
console.log(arr[0]); // 5
console.log(arr2[0]); // 5
```

Uh-oh!
That's probably not what we want.
The reason for this behavior is that `arr` and `arr2` both point to the same array.
Remember how we were careful to introduce a variable as a storage location together with a symbolic name?
Well, it turns out that different symbolic names may refer to the exact same storage location.

We can visualize it like this:

![](images/array-copy-incorrect.png)

Here we have a storage location containing the values `1`, `2`, `3` and `4`.
Two symbolic names, `arr` and `arr2`, both point to this same location.
Therefore, if we change the storage location, we will observe a change via both symbolic names.

In order to actually copy the values, we can use the spread syntax again:

```js
const copied = [...arr];
```

Let's check that this is indeed an actual copy:

```js
arr[0] = 5;
console.log(arr[0]); // 5
console.log(copied[0]); // 1
```

This looks much better.
Here is the mental picture you should have in your head for copying an array:

![](images/array-copy-correct.png)

> If you only briefly skimmed the section on array destructuring and the spread syntax, go back again and read it carefully.
> These two concepts will come up a lot in the following chapters (much more often than you think right now).

### Objects

Let's return to our imaginary task application, which for now exists only in theory.

A task will probably be something more than just a string.
For example, it might contain an ID, a title and a description.
We could, again, try to store these values in separate constants:

```js
const taskId = 1;
const taskTitle = 'Read the Next.js book';
const taskDescription = 'Read and understand the Next.js book.';
```

As you can probably guess, this approach will quickly become tedious—and yes, we've seen this problem before.

**Objects** to the rescue!
They allow us to store name–value pairs inside a single variable.
Here is how we might create a `task` object that contains all the information we want to know about a task:

```js
const task = {
  id: 1,
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
};
```

Every such name-value pair is called a **property**.
We can access properties either with dot notation `.` or with square bracket notation `[]`.
For example, we can access the `title` property of the `task` object by writing `task.title` or `task['title']`.
Try it out:

```js
console.log(task.id); // 1
console.log(task.title); // Read the Next.js book
console.log(task.description); // Read and understand the Next.js book.
console.log(task['id']); // 1
console.log(task['title']); // Read the Next.js book
console.log(task['description']); // Read and understand the Next.js book.
```

> In practice, we will almost always use the dot notation.

Remember how we accessed the length of an array using `arr.length`?
We can do that because every array has a property called `length` that indicates the length of that array.

Properties don't have to be primitive values.
They can also be other objects.

Generally speaking, we can arbitrarily nest objects and arrays.
For example, here is how we can nest an object inside an object:

```js
const user = {
  name: 'John Doe',
  task: {
    id: 1,
    title: 'Read the Next.js book',
    description: 'Read and understand the Next.js book.',
  },
};
```

We can access the `title` property of the `user.task` object like this:

```js
console.log(user.task.title); // Read the Next.js book
```

If we try to access a property that doesn't exist, the result will be `undefined`:

```js
console.log(task.date); // undefined
```

Sometimes we want to explicitly indicate that a property may be absent.
For example, a person may not have a task assigned to them.
We can write something like this:

```js
const person = {
  name: 'John Doe',
  task: undefined,
};
```

Instead of `undefined` we can also use `null` which represents the absence of an object value.
There is no separate `null` data type—`null` is simply a special object:

```js
console.log(typeof null); // object
```

Here is how we can use `null` to represent the absence of a property:

```js
const person = {
  name: 'John Doe',
  task: null,
};
```

Whether to use `undefined` or `null` in this situation is largely a matter of convention.
Throughout this book we will always use `undefined`.
Nevertheless, we want to emphasize that it's perfectly fine to use `null` instead of `undefined` in this situation.
The important thing is to choose one style and apply it consistently.

We can use **destructuring assignment** when working with objects, just as we did with arrays:

```js
const task = {
  id: 1,
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
};
const { id, title, description } = task;
```

And just as with arrays, we can also use the spread syntax with objects:

```js
const taskWithAssignee = {
  assignee: 'John Doe',
  ...task,
};
console.log(taskWithAssignee);
```

This will output:

```
{
  assignee: 'John Doe',
  id: 1,
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.'
}
```

> Keep in mind that objects are more than just containers for values.
> We will return to this idea later.

### Using `const` with Arrays and Objects

There is often confusion about the use of `const` with arrays and objects.

For example, it may seem strange that we can change the elements of a `const` array:

```js
const arr = [1];
arr[0] = 2; // Totally valid
arr.push(3); // Totally valid
```

It may also seem strange that we can change the properties of a `const` object:

```js
const obj = { prop: 1 };
obj.prop = 2; // Totally valid
```

These assignments are possible because `const` applies only to the variable binding itself, not to the contents of the array or object.
This means that the only thing we can't do is to change what the constant points to altogether.

For example, the following re-assignment is not allowed:

```js
const arr = [1];
arr = [2, 3]; // Not valid
```

Similarly, this re-assignment is also not allowed:

```js
const obj = { prop: 1 };
obj = { prop: 2 }; // Not valid
```

This means that `const` provides only a weak guarantee when working with arrays and objects.
In practice, we often modify the elements of arrays and objects but rarely reassign the entire array or object to something new.

Nevertheless, we recommend using `const` even when working with arrays and objects.
A weak guarantee is better than no guarantee at all.
