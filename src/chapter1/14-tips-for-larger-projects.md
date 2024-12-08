## Tips for Larger Projects

<div style="text-align: right"> <i>I would really like to say something wise, but this project is a total trainwreck. <br> — Ancient Chinese proverb </i> </div>

### The Product Drives the Code

The most important insight is:

**The product drives the code, not the other way around.**

A lot of software developers think it's their job to write code.
This is wrong.
The job of a software developer is to work on products.

This also means that your code should reflect the product and not some fancy abstraction that you thought would be fun to write.

If you're not working on a feature or something that supports the feature (like a test), you should think _very hard_ about what you're doing and why.

Additionally, when you're working on a product, your names should also be as close to the application domain as possible.
If the client and the project managers talk about tasks and notifications and the UI shows big, fat texts called "Tasks" and "Notifications", then your variable names should probably not be `jobs` and `reports`.
You will just needlessly confuse everyone.

### Keep It Simple, Stupid

The KISS principle (short for "keep it simple, stupid") states that you should **keep your code as simple as possible, but not simpler**.

Generally speaking, try to not outsmart yourself and stick to writing actual features instead of fancy abstractions that might or might not come in handy later.
You should always remember that reading and fixing code is much harder than writing it in the first place.
This means, that if you write code as smart as you possibly can, you aren't going to be able to fix it later.

Of course, if you realize that you're writing the same thing for the tenth time, it might be a good idea to take a step back and think if you can abstract that thing in a _straightforward_ way.
Unfortunately, many developers take this _way_ too far.
Don't be one of them.

The complexity of a codebase that doesn't _religiously_ adhere to the KISS principle grows much faster than you think and will quickly overwhelm you completely.

### Define Responsibilities Clearly

Split your code into well structured functions and modules.
Generally speaking, **a function should do one thing and do it well**.

Of course "one thing" can mean different levels of detail.
"One thing" might be everything from "add two numbers" to "simulate a universe".

If your function is simulating a universe, then it should probably call smaller, more focused functions internally (we've discussed this already).
Nevertheless, avoid writing functions that do two completely unrelated things.
For example, it's poor style to write a function that simulate a universe and then adds two numbers for some reason.

Similarly, try to follow the **Single Responsibility Principle** for modules.
Every module should be responsible for a particular part of the application.

### Use Docstrings

Document your most important functions using docstrings.
This will help both you and your fellow teammates.
Writing docstrings might seem tedious and unnecessary at first, but clear documentation can save hours of debugging later on.

Additionally, good documentation can help onboard new team members more quickly.

A good goal to strive for is that if I read the docstring of your function I should have a good understanding of how and when I can call it without having to read the implementation.

This is good because not only is it usually harder to read an implementation than a simple text (especially if the implementation is very long), but also because the implementation might change over time.

### Perfect is the Enemy of Good

A lot of beginners think that the main difference between a junior and a senior is that the senior always writes perfect code (for some vague definition of perfect).
That's not the case.

In fact, optimizing for perfect code is often a really terrible idea since that means that you will spend a lot of time "optimizing" code that was already good enough.
This is a problem, because you will throw most of your code away due to ever-changing requirements.

You should try to follow our tips from the previous section on writing decent code.
But in the end, your code won't be perfect and that's fine.

### Final Remarks

Well, now that you made it through the last two sections, are you a great programmer?
Unfortunately, the answer is a hard **no**.

If you could become a great programmer just by reading a couple of pages, then there wouldn't be entire bookshelves devoted to that topic.

There is only one way to become a good programmer:

**You need to actually go out and write projects.**

There is no way around it and in the end, experience is king.

But there is one important caveat—you have to actually _learn_ from that experience and reflect on your mistakes.

So go out there, write features, make mistakes and learn something!
