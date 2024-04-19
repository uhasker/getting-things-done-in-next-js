## Setup

### Persisting Data

A database is nothing more than a collection of data that supports persistent storage and updates.
If you store a value, it will be available to you regardless of whether you refresh the page, close your browser or even move to a different country altogether.

In this book, we will restrict ourselves to **relational databases** only.
These consist of multiple tables with optional relations between the tables.

The **SQL** language allows us to interact with a relational database.

There are many different relational databases that support different dialects of SQL.
In this book, we will stick to a relational database called **PostgreSQL**.

> We will use the PostgreSQL term to refer both to the database and to the specific SQL dialect supported by the database.

### Create a Database

First, we need to create a new database.
For this book, we will use **Supabase**, a service that will manage our relational databases for us.

Go to [Supabase](https://supabase.com).
Create a new project, give it a name and select a database password (which you should write down somewhere).

Once you create the new project, go to "Project Settings > Database" and copy and paste the URI connection string.
Replace `[YOUR-PASSWORD]` with the password you gave the database in the previous step.

Save the connection string somewhere, you will need it to - well - connect to the database.

Next, you should navigate to the Supabase SQL editor of your project to be able to execute queries.

### Table Creation

Consider a simple `task` table whose purpose is to persistently store created tasks.

Let's think about the columns we might need for that table.

First, we should have an `id` column which would store a unique identifier for every task.

Second, we will probably need a `title` and `description` column which would store the title and description of the tasks respectively.

We will also add two more columns for educational purposes.
The `status` column will hold the status of the task.
Additionally, the `duration` column will store the estimated duration of the task in minutes.

Finally, it is good practice to always create a `created_at` column in every table, where we will stored the time at which the row was created.

Let's create the `task` table.
We can use the `create table` SQL statement to accomplish this.

```sql
create type status as enum ('todo', 'inprogress', 'done');

create table task (
    id serial primary key,
    title text not null unique,
    description text not null,
    status status,
    duration integer check (duration > 0),
    created_at timestamp default current_timestamp not null
);
```

Note that each column has a name, a data type and optional constraints.
Let's talk about data types and optional constraints in more detail in the next section.

### Inserting and Selecting Data

Now that we have created the table, we can use SQL statements to create, read, update or delete data.

For example, we can insert some data using the `insert` statement:

```sql
insert into task (title, description, duration, status) values
('Read the Next.js book', 'Read and understand the Next.js book.', 60, 'inprogress');
```

We can select that data using the `select` statement:

```sql
select * from task;
```

This will return:

```
| id | title                 | description                           | status     | duration | created_at                 |
| -- | --------------------- | ------------------------------------- | ---------- | -------- | -------------------------- |
| 1  | Read the Next.js book | Read and understand the Next.js book. | inprogress | 60       | 2024-04-17 11:34:06.502155 |
```

We can also delete data using the `delete` statement.
Let's delete the data we have inserted so far to have a clean setup for the next section:

```sql
delete from task;
```

We will discuss these statement in more detail in later sections.

> Note that when executing an SQL statement in Supabase, you don't necessarily need to provide the semilicon.
> However in other SQL clients you will need to semicolon and so we will always write it for consistency.
