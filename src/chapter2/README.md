# Chapter 2: Leveling Up with TypeScript

<div style="text-align: right"> <i> To employ TypeScript is to light a lantern on the dim path of JavaScript, revealing the stones upon which one may trip. <br> - Ancient Chinese proverb </i> </div>

Now that we learned the basics of JavaScript, we could theoretically dive right into writing our application.
However, JavaScript as a language has a central problem - it does not come with type checking.
For example, there is nothing preventing you from trying to add two objects except the fact that you will get a runtime error.

We would like to be able to see this during development.
Enter TypeScript which allows us to annotate our objects and functions.
If we make a mistake, we will see it immediately.

The most common kinds of errors that programmers write can be described as type errors: a certain kind of value was used where a different kind of value was expected. This could be due to simple typos, a failure to understand the API surface of a library, incorrect assumptions about runtime behavior, or other errors. The goal of TypeScript is to be a static typechecker for JavaScript programs - in other words, a tool that runs before your code runs (static) and ensures that the types of the program are correct (typechecked).
