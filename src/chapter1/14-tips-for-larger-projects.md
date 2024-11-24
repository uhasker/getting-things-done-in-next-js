## Tips for Larger Projects

### Help, My Project is Growing

Once your project begins exceed a few hundred lines of code, additional considerations begin to matter.

The most important insight is:

**The product drives the code, not the other way around.**

A lot of software developers think it's their job to write code.
This is wrong.
The job of a software developer is to work on products.

This also means that your code should reflect the product and not some fancy abstraction that you thought would be fun to write.

We've talked about sensible naming, but once your project gets larger, **your names should also be as close to the application domain as possible**.
If the client and the project managers talk about tasks and notifications and the UI shows big, fat texts called "Tasks" and "Notifications", then your variable names should probably not be `jobs` and `reports`.
You will just needlessly confuse everyone.

### Keep It Simple, Stupid

The KISS principle (short for "keep it simple, stupid") states that you should keep your code as simple as possible, but not simpler.

Generally try to not outsmart yourself and stick to writing actual features instead of fancy abstractions that might or might not come in handy later.
Remember, reading and fixing code is much harder than writing it in the first place.
This means that if you write code as smart as you possibly can, you are not going to be able to fix it.

Of course, if you realize that you're writing the same thing for the tenth time, it might be a good idea to take a step back and think if you can abstract that thing in a straightforward way.
Unfortunately, many developers take this _way_ too far.
Don't be one of them.

### Follow the Single Responsibility Principle

Now that we gave you a couple of tips for writing better code, there a few things to consider as your project gets larger.
Split your code into well structured modules.
Try to follow the **Single Responsibility Principle** where every module is responsible for a particular part of the application.

### Use Docstrings

Document your most important functions using docstrings.

### Final Remarks

Well, now that you made it through the last two sections, are you a great programmer?
Unfortunately, the answer is a hard **no**.

If you could become a great programmer by just reading a couple of pages, then there wouldn't be entire book shelves devoted to that topic.

There is only one way to become a good programmer:

**You need to actually go out and write projects.**

There is no way around it and in the end, experience is king.

But there is one important caveat—you have to actually _learn_ from that experience and reflect on your mistakes.

So go out there, write features, make mistakes and learn something!
