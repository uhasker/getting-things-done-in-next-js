## Arrays and Objects

<div style="text-align: right"> <i> The object of the superior programmer is truthy. <br> — Confucius </i> </div>

### Arrays

Let's say you are writing a task application (_just how did I come up with that example?_) and you need to store a bunch of tasks.
You could of course declare a separate variable for every task like this:

```js
const task1 = 'First task';
const task2 = 'Second task';
const task3 = 'Third task';
```

However this would quickly become very _tedious_.
In addition you may want to add or delete tasks.
Adding and deleting variables will become even more _tedious_.
It would become almost as _tedious_ as repeating the word _tedious_ over and over.
Did we mention that this is really _tedious_?
As you can see, we need a way to store multiple values in a single variable.

A JavaScript **array** is an ordered collection of multiple values.
You can declare an array using an **array literal** (also called an _array initializer_ in this context):

```js
const tasks = ['First task', 'Second task', 'Third task'];
```

Note that an array is no longer a primitive type, instead arrays have the type `object`:

```js
console.log(typeof tasks); // object
```

You can access individual elements of an array using the index notation.
This works by writing the name of the array, followed by the position of the element you want to retrieve inside square brackets.
Note that when we count the indices (positions), we start at `0`, _not_ at `1`:

````js
console.log(tasks[0]); // First task
console.log(tasks[1]); // Second taskhttps://uhasker.github.io/getting-things-done-in-next-js/chapter1/03-arrays-and-objects.html

If the array index is too big, trying to access the element at that index will return `undefined`:

```js
console.log(tasks[3]); // undefined
````

You can get the length of an array by using `.length`:

````js
console.log(tasks.length); // 3https://uhasker.github.io/getting-things-done-in-next-js/chapter1/03-arrays-and-objects.html

> Note that even despite the fact the `tasks` array is declared as a constant here, you can still change the _contents_ of the array.
> However you can't _reassign_ `tasks` to something else, i.e. you can't write something like `tasks = [1]`.

JavaScript has some elegant syntax for working with arrays. If you want to assign variables based on values of an array, you would normally have to do something like this:

```js
const firstTask = tasks[0];
const secondTask = tasks[1];
const thirdTask = tasks[2];
````

This is (you guessed it) _tedious_.
Instead you can use the **array destructuring assignment**:

```js
const [firstTask, secondTask, thirdTask] = tasks;
```

If you only care about some of the elements, you can use the **spread** (`...`) syntax:

```js
const [firstTask, ...otherTasks] = tasks;
```

Something that commonly trips up beginners is trying to _copy_ an array. Let's say you have an array of numbers called `arr` and you want to create a copy called `arr2`.
You would probably try something like

```js
const arr = [1, 2, 3, 4];
const arr2 = arr;
```

This is _wrong_. Let's try changing the first element of `arr` and look at `arr[0]` and `arr2[0]`:

```js
arr[0] = 5;
console.log(arr[0]); // 5
console.log(arr2[0]); // 5
```

Uh-oh!
That's probably not what we want.
The reason for this behaviour is that `arr` and `arr2` both point to the same array.
Remember how we were careful to introduce a variable _as a storage location together with a symbolic name_?
Well, it turns out that _different symbolic names_ may refer to the _exact same storage location_.
You can visualize it like this:

![](images/array-copy-incorrect.png)

Here we have a storage location containing the values `1`, `2`, `3` and `4` somewhere.
We also have two symbolic names `arr` and `arr2`.
While the symbolic names are different, they point to the same storage location.
Therefore if we change the storage location, we will observe a change via both symbolic names.

In order to actually copy the values, we can in fact use the spread syntax as this will _copy_ the values:

```js
const copied = [...arr];
```

Let's check that this indeed an actual copy:

```js
arr[0] = 5;
console.log(arr[0]); // 5
console.log(copied[0]); // 1
```

This looks good.
Here is the mental picture you should have in your head for copying an array:

![](images/array-copy-correct.png)

> If you only briefly skimmed the section on array destructuring and the spread syntax, go right back and read it carefully.
> These two concepts will come up _a lot_ in the following chapters (much more often than you think right now).

### Objects

Let's return to our (yet) imaginary task application.
A task will probably be something more than just a string.
For example it might contain an ID, a title and a description.
We could again store these in constants:

```js
const taskId = 1;
const taskTitle = 'Read the Next.js book';
const taskDescription = 'Read and understand the Next.js book.';
```

As you can probably guess, this will quickly become _tedious_ (oh no, not this again).
**Objects** to the rescue!
These allow us to store name-value pairs inside a single variable.
Here is how we might create a `task` object that contains all the information we want to know about a task:

```js
const task = {
  id: 1,
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
};
```

Every such value is called a **property**.
We can access properties using the dot notation or the square bracket notation.
For example to access the `title` property of the `task` object, you would write `task.title` or `task['title']`.
Try it out:

```js
console.log(task.id); // 1
console.log(task.title); // Read the Next.js book
console.log(task.description); // Read and understand the Next.js book.
console.log(task['id']); // 1
console.log(task['title']); // Read the Next.js book
console.log(task['description']); // Read and understand the Next.js book.
```

> Note that we will practically always use the dot notation.

Properties don't have to be primitive values.
They can also be other objects.
Generally speaking, you can arbitrarily nest objects and arrays.
For example, here is how you can nest an object inside an object:

```js
const person = {
  name: 'John Doe',
  task: {
    id: 1,
    title: 'Read the Next.js book',
    description: 'Read and understand the Next.js book.',
  },
};
```

You can access the `title` property of the `person.task` object like this:

```js
console.log(person.task.title); // Read the Next.js book
```

If you try to access a property that doesn't exist, the result will be `undefined` (there it is again):

```js
console.log(task.date); // undefined
```

Sometimes you want to explicitly indicate that a property may be absent.
For example a person may not have a task assigned to them.
You could do something like this:

```js
const person = {
  name: 'John Doe',
  task: undefined,
};
```

This has the _potential_ problem that someone referring to `person.task` will have no idea whether it is `undefined` because the property is not supposhttps://uhasker.github.io/getting-things-done-in-next-js/chapter1/03-arrays-and-objects.html
There is nothing that prevents you from using `undefined` to denote absence all the time and in fact we will do so in this very book.
Just keep in mind that `null` exists and that some developers use it to indicate absence (and that it's totally fine to do so).

Remember how we said that there is one more primitive data type left?
Well - there it is.
The final primitive data type is `null`.
This is something a lot of people are really confused about, because `typeof null` returns `object` (and not e.g. `null`).
However this is primarily a technical detail.
Despite the fact that `null` is a separate data type it doesn't hurt to think of it as an object (namely an absent one).

Just as with arrays, you can use **destructuring assignment** when working with objects:

```js
const task = {
  id: 1,
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
};
const { id, title, description } = task;
```

And just like with arrays, you can use the spread syntax:

```js
const taskWithAssignee = {
  assignee: 'Max',
  ...task,
};
console.log(taskWithAssignee);
```

This will print:

```json
{
  "assignee": "Max",
  "id": 1,
  "title": "Read the Next.js book",
  "description": "Read and understand the Next.js book."
}
```

> Note that objects are more than just containers for values.
> We will talk about this in the section on functions.
