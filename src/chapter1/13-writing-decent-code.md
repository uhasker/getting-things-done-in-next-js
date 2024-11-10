## Writing Decent Code

<div style="text-align: right"> <i>He who writes JavaScript with simplicity, rides the dragon of efficiency; he who writes in confusion, invites the monkeys of bugs into his code. <br> — Ancient Chinese proverb </i> </div>

### It Just Works

A common misunderstanding among beginner programmers is that if the program runs correctly, then the code must automatically be fine.
A correctly running program is indeed better than a crashing program (a truly shocking insight for some developers).
However code should not only work, but also be maintainable _in the future_.

This **maintainability** has two aspects:

1. Code should be maintainable by future _you_ in (let's say) six months.
2. Code should be maintanable by other people that are not you.

> We wish to reiterate that there are indeed people that are not you in the world, some of which might even end up on your team.
> There are programmers that tend to forget that.

This section is aimed at giving you a few practical tips to achieve these goals.
It won't make you a great programmer, but it will help you to make your teammates hate you slightly less (which is why the section is called "writing decent code" and not "writing the greatest code of all time").

### Sensible Naming

The ultimate number one tip for writing better code is as obvious in theory, as it is complicated in practice:

**Your variables and functions should have sensible names that describe their purpose.**

Consider this simple example:

```js
function f(a, s) {
  const r = [];
  for (const i of a) {
    if (i.st === s) {
      r.push(i.su);
    }
  }
  return r;
}
```

Well, this code clearly sucks.
It's absolutely unreadable and the unreadability is solely down to really terrible variable names.

Let's rewrite it:

```js
function getTaskTitlesByStatus(tasks, status) {
  const taskTitles = [];
  for (const task of tasks) {
    if (task.status === status) {
      taskTitles.push(task.title);
    }
  }
  return taskTitles;
}
```

And suddenly the purpose of the code is clear as day.

The function `getTaskTitlesByStatus` gets all the titles of the tasks that have a certain status.
And we know that, because it is literally in the name of the function!

Not only does the function have a good name (which is important when trying to use this function), but so do the variables (which is important when we need to fix possible mistakes in this function).

Of course, this is a very extreme example (that's on purpose), but it's really incredible how often programmers give terrible names to functions and variables.

> This is the case even for developers that should know better.

Of course, naming things is usually not as easy as in this example.
There are many legitimate cases where giving something a good name is not trivial, but you should at least always _try hard_ to have sensible names.
The poor soul that will have to fix your bugs six months from now will really thank you for that.

> Note how we wrote _try hard_ and not just _try_.
> The worst code is code containing bad naming.
> You should therefore absolutely invest time into thinking about good names for your variables and functions.

### Write Small Helper Functions

Most of the time a function is not as simple as `getTaskTitlesByStatus`, which often leads to many lines of complex code that is hard to understand.
A common practice for such cases is this:

**Extract code from complicated functions into helper functions and then call the helper functions**.

Consider a function that takes an array of tasks and returns an array of generated notifications to be shown to the user.

The notifications are generated for urgent tasks (i.e. tasks where the deadline is in the next two days).
Additionally, we generate a notification with the number of uncompleted tasks.

You might write the function like this:

```js
function generateNotifications(tasks) {
  const urgentTasks = [];

  let uncompletedTaskCount = 0;

  tasks.forEach((task) => {
    const today = new Date();
    const twoDaysLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);

    if (task.deadline <= twoDaysLater) {
      urgentTasks.push(task);
    }

    if (task.status === 'todo' || task.status === 'inprogress') {
      uncompletedTaskCount++;
    }
  });

  const notifications = [];
  if (urgentTasks.length > 0) {
    notifications.push(
      `You have ${urgentTasks.length} urgent tasks. Here they are: ${urgentTasks}.`,
    );
  }

  if (uncompletedTaskCount > 0) {
    notifications.push(`You have ${uncompletedTaskCount} uncompleted tasks.`);
  }

  return notifications;
}
```

Try to read this function and understand it - this will probably take up quite some time.

We can massively improve this code by splitting the function into small helper functions:

```js
function findUrgentTasks(tasks) {
  const urgentTasks = [];

  const today = new Date();
  const twoDaysLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);

  tasks.forEach((task) => {
    if (task.deadline <= twoDaysLater) {
      urgentTasks.push(task);
    }
  });

  return urgentTasks;
}

function countUncompletedTasks(tasks) {
  let uncompletedTaskCount = 0;
  tasks.forEach((task) => {
    if (task.status === 'todo' || task.status === 'inprogress') {
      uncompletedTaskCount++;
    }
  });
  return uncompletedTaskCount;
}

function generateNotifications(tasks) {
  const urgentTasks = findUrgentTasks(tasks);
  const uncompletedTaskCount = countUncompletedTasks(tasks);

  const notifications = [];
  if (urgentTasks.length > 0) {
    notifications.push(
      `You have ${urgentTasks.length} urgent tasks. Here they are: ${urgentTasks}.`,
    );
  }

  if (uncompletedTaskCount > 0) {
    notifications.push(`You have ${uncompletedTaskCount} uncompleted tasks.`);
  }

  return notifications;
}
```

The `generateNotification` function is now much simpler to read.
Instead of a multiple potentially complex calculations, it contains functions where each function is responsible for exactly one complex calculation.

Note that the loops didn't really change, but they now do isolated things inside helper functions with sensible names.
For example the for loop that calculates the `uncompletedTaskCount` is now isolated inside the `countUncompletedTasks` function and therefore its purpose is immediately clear - even before you've read the actual loop.

### Make Functions Reusable

There are still some potential improvements that we could make here, one of which is to make the helper functions more reusable.
A practical hint for making functions more reusable is this:

**Extract values from function bodies into (default) parameters.**

For example `findUrgentTasks` calculates the future date by adding `2`.
But what if that changes, or even worse, different users can set a different number of added days for their notifications?

Let's move the number of added days into a default parameter:

```js
function findUrgentTasks(tasks, addedDays = 2) {
  const urgentTasks = [];

  const today = new Date();
  const laterDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + addedDays);

  tasks.forEach((task) => {
    if (task.deadline <= laterDate) {
      urgentTasks.push(task);
    }
  });

  return urgentTasks;
}
```

Note how we also renamed `twoDaysLater` to `laterDate` since that variable now has a more general purpose.

### Know and Use Your Language Features

JavaScript has drastically changed for the better in the past decade - there is no need to write code like it's 2012.
For example `getTaskTitlesByStatus` could be rewritten in a functional style:

```js
function getTaskTitlesByStatus(tasks, status) {
  return tasks.filter((task) => task.status === status).map((task) => task.title);
}
```

Same goes for `findUrgentTasks` and `countUncompletedTasks`.
You should in fact try to do that yourself.

Generally, the takeaway from the section is this:

**Programming languages have a wide variety of features, most of which can make your life easier. Use them.**

### Avoid Deep Nesting

Consider a function that filters tasks based on their status, user ID and days until deadline.
We could write it like this:

```js
function filterTasks(tasks, status, userId, daysUntilDeadline) {
  const filteredTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status === status) {
      if (tasks[i].assignee === userId) {
        const deadline = new Date(tasks[i].deadline);
        const today = new Date();
        const futureDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + daysUntilDeadline,
        );

        if (deadline <= futureDate) {
          filteredTasks.push(tasks[i]);
        }
      }
    }
  }

  return filteredTasks;
}
```

This looks supremely ugly and hard to read due to the deep nesting of the code.
Luckily, this is pretty easy to fix using two very specific tricks:

First, we can extract the body of the for loop into a helper function:

```js
function taskMatchesCriteria(task, status, userId, daysUntilDeadline) {
  if (task.status === status) {
    if (task.assignee === userId) {
      const today = new Date();
      const futureDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + daysUntilDeadline,
      );

      if (task.deadline <= futureDate) {
        return true;
      }
    }
  }

  return false;
}

function filterTasks(tasks, status, userId, daysUntilDeadline) {
  return tasks.filter((task) => taskMatchesCriteria(task, status, userId, daysUntilDeadline));
}
```

One level of nesting gone already.

For the second trick, we can simplify the `taskMatchesCriteria` by either flattening the conditions or using early exits.

Flattening the condition is simple:

```js
function taskMatchesCriteria(task, status, userId, daysUntilDeadline) {
  const today = new Date();
  const futureDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + daysUntilDeadline,
  );

  return task.status === status && task.assignee === userId && task.deadline <= futureDate;
}
```

However sometimes this is not possible or leads to a very complex logical expression.
In this case we can check the "inverted" conditions one by one and "early exit" if something doesn't match:

```js
function taskMatchesCriteria(task, status, userId, daysUntilDeadline) {
  // Early exit number 1
  if (task.status !== status) {
    return false;
  }

  // Early exit number 2
  if (task.assignee !== userId) {
    return false;
  }

  const today = new Date();
  const futureDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + daysUntilDeadline,
  );

  return task.deadline <= futureDate;
}
```

The general takeaway is this:

**Flatten deeply nested code by extracting helper functions and simplifying conditions.**

### Don't Repeat Yourself

This is probably one of the most well-known idioms in software development:

**Don't repeat yourself.**

For example, if you write a book, you shouldn't repeat the subsection heading in your text - that looks ugly and doesn't make any sense.
Only a fool would do that.

The same principle goes for writing code.
Consider the following example:

```js
function reportOverdueTasks(tasks) {
  const today = new Date();
  const overdueTasks = tasks.filter((task) => {
    return task.deadline < today && task.status !== 'done';
  });
  return overdueTasks.map((task) => `Task ID: ${task.id}, Title: ${task.title}`).join('\n');
}

function reportCompletedTasks(tasks) {
  const completedTasks = tasks.filter((task) => task.status === 'done');
  return completedTasks.map((task) => `Task ID: ${task.id}, Title: ${task.title}`).join('\n');
}
```

You might notice that the last line of both functions is essentially the same.
This leads to a problem: If the report format changes, we need to update it multiple times.

Not only does this mean more work, we might even forget to update the report format in some place, leading to inconsistencies in our code.

We can refactor `reportOverdueTasks` and `reportCompletedTasks` like this:

```js
function formatReport(tasks) {
  return tasks.map((task) => `Task ID: ${task.id}, Title: ${task.title}`).join('\n');
}

function reportOverdueTasks(tasks) {
  const today = new Date();
  const overdueTasks = tasks.filter((task) => {
    return task.deadline < today && task.status !== 'done';
  });
  return formatReport(overdueTasks);
}

function reportCompletedTasks(tasks) {
  const completedTasks = tasks.filter((task) => task.status === 'done');
  return formatReport(completedTasks);
}
```

Again, this is a very simple example, but the general principle holds for more complex situations as well.
If you find yourself repeating very similar code over and over, you should probably extract it into a function.

Remember, that's why we introduced functions in the first place.

### Think About Edge Cases

One of the big differences between junior programmers and more senior developers is that juniors tend to ignore edge cases and just focus on the "happy path".

Consider this piece of code:

```js
const task = tasks.find((task) => task.id === taskId);
task.assignee = userId;
task.status = 'inprogress';
```

This has a big problem: What if `taskId` is not present in the IDs of `tasks`?
Then `task` will be `undefined` and our program will crash when trying to assign the `assignee` property to `task`.

This edge case needs to be handled:

```js
const task = tasks.find((task) => task.id === taskId);
if (task === undefined) {
  console.log(`Task with ID ${taskId} not present`);
} else {
  task.assignee = userId;
  task.status = 'inprogress';
}
```

Example operations which can lead to problems if you don't consider edge cases are:

- division (because you could divide by zero)
- processing strings (because strings could be empty or have whitespace at the beginning or the end)
- extracting elements from arrays by a condition (because there might be no elements present that match the condition)
- processing user input (because users can and will type arbitrary garbage into your application)

And of course every time you work with an external resource (like `fetch`ing something), you need to handle potential errors.

The main takeaway from this sections is:

**Don't be satisfied by just writing the happy path. Think about the edge cases.**

### Additional Tips for Large Projects

Now that we gave you a couple of tips for writing better code, there a few things to consider as your project gets larger.

You should try to keep the names in your codebase close to the application domain.
If the client and the project managers talk about tasks and notifications and the UI shows big, fat texts called "Tasks" and "Notifications", then your variable names should probably not be `jobs` and `reports`.
You will just needlessly confuse everyone.

Split your code into well structured modules.
Try to follow the **Single Responsibility Principle** where every module is responsible for a particular part of the application.

Document your most important functions using docstrings.

Generally try to not outsmart yourself and stick to writing actual features instead of fancy abstractions that might or might not come in handy later.
Remember, reading and fixing code is much harder than writing it in the first place.
This means that if you write code as smart as you can, you are not going to be able to fix it.

### Final Remarks

Well, now that you made it through this section, are you a great programmer?
Unfortunately, the answer is a hard **no**.

If you could become a great programmer by just reading a couple of pages, then there wouldn't be entire book shelves devoted to that topic.

There is only one way to become a good programmer:

**You need to actually go out and write projects.**

There is no way around it and in the end, experience is king.

But there is one important caveat - you have to actually _learn_ from that experience and reflect on your mistakes.

So go out there, write features, make mistakes and learn something!
