# Chapter 5: Typesafe SQL with Drizzle

<div style="text-align: right"> <i> I hate Drizzle <br> — From Drizzles' official marketing page </i> </div>

Drizzle is a ORM (object relational mapping) framework written in TypeScript.
ORM frameworks allow you to convert data between regular (TypeScript) objects and SQL rows.

Basically, instead of writing SQL queries directly and then laboriously translating the results between TypeScript objects and SQL rows, you let the ORM do the translation for you.

Unfortunately, a lot of ORMs add a ton of (often unnecessary) abstractions.
Luckily, Drizzle decided to go the opposite direction—it provides you a very simple and intuitive collection of functions that closely mirror the way SQL works.
You can think of Drizzle as basically being typesafe SQL.

This makes Drizzle very simple to learn, simple to use and simple to debug problems.
