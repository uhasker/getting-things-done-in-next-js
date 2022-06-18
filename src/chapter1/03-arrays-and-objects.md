## Arrays and objects

<div style="text-align: right"> <i> The object of the superior programmer is truthy. <br> — Confucius </i> </div>

### Arrays

Let's say you are writing a task application (*just how did I come up with that example?*) and you need to store a bunch of tasks. You could of course declare a separate variable for every task like so:

```javascript
const task1 = 'First task';
const task2 = 'Second task';
const task3 = 'Third task';
```

However this would quickly become very *tedious*. In addition you may want to add or delete tasks. Adding and deleting variables will become even more *tedious*. It would become almost as *tedious* as repeating the word *tedious* over and over. Did we mention that this is really *tedious*? As you can see, we need a way to store multiple objects in a single variable.

A JavaScript **array** is an ordered collection of multiple values. You can declare an array using square brackets:

```javascript
const tasks = ['First task', 'Second task', 'Third task'];
```

Note that an array is no longer a primitive type, instead arrays have type `object`:

```javascript
console.log(typeof tasks); // object
```

You can access individual elements of an array using the index notation. You simply write the name of the array, followed by the position of the element you want to retrieve inside square brackets. Note that when we count the indices (positions), we starts at `0`, *not* at `1`:

```javascript
console.log(tasks[0]); // First task
console.log(tasks[1]); // Second task
console.log(tasks[2]); // Third task
```

If the array index is too big, trying to access the element at that index will return `undefined`:

```javascript
console.log(tasks[3]); // undefined
```

You can get the length of an array by using `.length`:

```javascript
console.log(tasks.length); // 3
```

You can change an array element using the index notation and the assignment operator. For example here is how you would change the second element of the `tasks` array (remember that the second element has index `1`):

```javascript
tasks[1] = 'Some other task';
console.log(tasks[1]); // Some other task
```

> Note that even despite the fact the `tasks` array is declared as a constant here, you can still change the *contents* of the array. However you can't *reassign* `tasks` to something else, i.e. you can't write something like `tasks = [1]`.

JavaScript has some elegant syntax for working with arrays. If you want to assign variables based on values of an array, you would normally have to do something like this:

```javascript
const firstTask = tasks[0];
const secondTask = tasks[1];
const thirdTask = tasks[2];
```

This is (you guessed it) *tedious*. Instead you can do this:

```javascript
const [firstTask, secondTask, thirdTask] = tasks;
```

This is called **array destructuring assignment**. If you only care about some of the elements, you can use the **spread** (`...`) syntax:

```javascript
const [firstTask, ...otherTasks] = tasks;
```

Something that commonly trips up beginners is trying to *copy* an array. Let's say you have an array of numbers called `arr` and you want to create a copy called `arr2`. You would probably try something like

```javascript
const arr = [1, 2, 3, 4];
const arr2 = arr;
```

This is *wrong*. Let's try changing the first element of `arr` and look at `arr[0]` and `arr2[0]`:

```javascript
arr[0] = 5;
console.log(arr[0]); // 5
console.log(arr2[0]); // 5
```

Uh-oh! That's probably not what we want. The reason for this behaviour is that `arr` and `arr2` both point to the same array. Remember how we were careful to introduce a variable *as a storage location together with a symbolic name*? Well, it turns out that *different symbol names* may refer to the *exact same storage location*. You can visualize it like this:

![](images/array-copy-incorrect.png)

Here we have a storage location containing the values `1`, `2`, `3` and `4` somewhere. We also have two symbolic names `arr` and `arr2`. While the symbolic names are different, they point to the same storage location. Therefore if we change the storage location, we will observe a change via both symbolic names.

In order to actually copy the storage location as well, we can in fact use the spread syntax as this will *copy* the values:

```javascript
const copied = [...arr];
```

Let's check that this indeed an actual copy:

```javascript
arr[0] = 5;
console.log(arr[0]); // 5
console.log(copied[0]); // 1
```

This looks good. This is the mental picture you should have in your head for copying an array:

![](images/array-copy-correct.png)

> If you only briefly skimmed the section on array destructuring and the spread syntax, go right back and read it carefully. These two concepts will come up *a lot* in the following chapters (much more often than you think right now). 

### Objects

Let's return to our (yet) imaginary task application. A task will probably be something more than just a string. For example it might contain an ID, a summary and a description. We could again store these in constants:

```javascript
const taskId = 1;
const taskSummary = 'Read the MERN book';
const taskDescription = 'Read and understand the MERN book.';
```

As you can probably guess, this will quickly become *tedious* (oh no, not this again). **Objects** to the rescue! These allow us to store name-value pairs inside a single variable:

```javascript
const task = {
  id: 1,
  summary: 'Read the MERN book',
  description: 'Read and understand the MERN book.'
};
```

Every such value is called a **property**. We can access properties using the dot notation or the square bracket notation. For example to access the `summary` property of the `task` object, you would write `task.summary` or `task['summary']`. Try it out:

```javascript
console.log(task.id); // 1
console.log(task.summary); // Read the MERN book
console.log(task.description); // Read and understand the MERN book.
console.log(task['id']); // 1
console.log(task['summary']); // Read the MERN book
console.log(task['description']); // Read and understand the MERN book.
```

Properties don't have to be primitive values. They can also be other objects. Generally speaking, you can arbitrarily nest objects and arrays. For example, here is how you can nest an object inside an object:

```javascript
const person = {
  name: 'Max Mustermann',
  task: {
    id: 1,
    summary: 'Read the MERN book',
    description: 'Read and understand the MERN book.'
  }
};
```

In this case you can use the `.` notation to access properties at any nesting level. Let's you want to get the summary of the task that's been assigned to the `person`. Then you can write `person.task.summary`:

```javascript
console.log(person.task.summary); // Read the MERN book
```

If you try to access a property that doesn't exist, the result will be `undefined` (there it is again):

```javascript
console.log(task.date); // undefined
```

Sometimes you want to explicitly indicate that a property may be absent. For example a person may not have a task assigned to them. You could do something like this:

```javascript
const person = {
  name: 'Max Mustermann',
  task: undefined
};
```

This has the *potential* problem that someone referring to `person.task` will have no idea whether it is `undefined` because the property is not supposed to exist at all or because it it simply absent for this particular person. This is why JavaScript introduced `null`:

```javascript
const person = {
  name: 'Max Mustermann',
  task: null
};
```

Basically `null` allows you to say - "hey, this property does exist in principle, it's just absent for this particular variable". However note that this is only a convention. There is nothing that prevents you from using `undefined` to denote absence all the time and in fact we will do so in this very book. Just keep in mind that `null` exists and that some developers use it to indicate absence (and that it's totally fine to do so).

Remember how we said that there is one more primitive data type left? Well - there it is. The final primitive data type is `null`. This is something a lot of people are really confused about, because `typeof null` returns `object` (and not e.g. `null`). However this is primarily a technical detail. Despite the fact that `null` is a separate data type it doesn't hurt to think of it as an object (namely an absent one).

Just as with arrays, you can use **destructuring assignment** when working with objects:

```javascript
const task = {
  id: 1,
  summary: 'Read the MERN book',
  description: 'Read and understand the MERN book.'
};
const { id, summary, description } = task;
```

And just like with arrays, you can use the spread syntax:

```javascript
const taskWithAssignee = {
  assignee: 'Max',
  ...task
};
console.log(taskWithAssignee);
```

This will print:

```
{
  assignee: 'Max',
  id: 1,
  summary: 'Read the MERN book',
  description: 'Read and understand the MERN book.'
}
```

> Note that objects are more than just containers for values. We will talk about this in the section on functions.

### Summary

You have learned how to work with arrays and objects. You have also learned about (array and object) destructuring and the spread syntax.

### Further reading

There is no further reading for this section.
