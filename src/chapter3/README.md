# Chapter 2: Leveling Up with TypeScript

<div style="text-align: right"> <i> To employ TypeScript is to light a lantern on the dim path of JavaScript, revealing the stones upon which one may trip. <br> - Ancient Chinese proverb </i> </div>

Now that we learned the basics of JavaScript, we could theoretically dive right into writing our application.
However, JavaScript as a language has a central problem - it does not come with type checking.
For example, there is nothing preventing you from trying to add two objects except the fact that - well - your application will crash and burn.

In general, one the most common error sources are what can be described as type errors: a certain kind of value was used where a different kind of value was expected.
This could be due to simple typos, a failure to understand how to use a library correctly, incorrect assumptions about runtime behavior etc.
The goal of TypeScript is to provide static type checking for JavaScript programs - in other words, TypeScript provides you with tooling that runs before your code is executed (static) and ensures that the types of the program are correct (typechecked).
