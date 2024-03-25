## Setup

### Persisting Data

A database is nothing more than a collection of data that supports persistent storage and updates.
If you store a value, it will be available to you regardless of whether you refresh the page, close your browser or even move to a different country altogether.

In this book, we will restrict ourselves to **relational databases** only.
These consist of multiple tables with optional relations between the tables.

We will use **SQL**, specifically **PostgreSQL** to perform the actual data manipulation.

### Create a Database

First, we need to create a new database.
For this book, we will use Supabase.

Go to [Supabase](https://supabase.com).
Create a new project, give it a name and select a database password (which you should write down somewhere).

Once you create the new project, go to "Project Settings > Database" and copy past the URI connection string.
Replace `[YOUR-PASSWORD]` with the password you gave the database in the previous step.

Save the connection string, we will need it later.

Next, you should navigate to the SQL editor of your project to be able to execute queries.

### Table Creation

Consider a simple `task` table whose purpose is to persistently store informations about created tasks.

Let's think about the columns we might need for the table.

First, we have the `id` column which would store a unique identifier for every task.

Second, we would have the `title` and `description` columns which would store the title and description of the tasks respectively.

Finally, we will add two more columns for learning purposes.
The `status` column will hold the status of the task.
Additionally, the `duration` column will store the estimated duration of the task in minutes.

Let's create the `task` table.
We can use the `create table` SQL statement to accomplish this.

```sql
create table task (
    id serial primary key,
    title varchar(255) not null,
    description text not null,
    status varchar(255) not null check (status in ('todo', 'inprogress', 'done')),
    duration integer,
    created_at timestamp default current_timestamp not null
)
```

Note that each column has a name, a data type, an optional constraints.
Let's talk about data types and optional constraints in more detail.

### Data Types

The `integer` data type allows you to store integers.
You usually use this data type for counts, identifiers etc.

Note that there are actually multiple integer data types in PostgreSQL.
The `smallint` data type allows you to store "small-range integers" and the `bigint` data type allows you to store "large-range integers".

The difference between `smallint`, `integer` and `bigint` is basically the minimum and maximum integers that can be stored.

A `smallint` value has 2 bytes, i.e. it can store values from `-32768` up to `32767`.

An `integer` value has 4 bytes, i.e. it can store values from `-2147483648` up to `2147483647`.

An `bigint` value has 8 bytes, i.e. it can store values from `-9223372036854775808` up to `9223372036854775807`.

For most regular web applications, `integer` values are more than enough.

In our example, we use `integer` for the `duration` column.

The `serial` data type allows you to represent _autoincrementing_ integers (along with `smallserial` and `bigserial`).
This makes `serial` very useful for unique identifiers since you don't need to handle the incrementing logic yourself.

This is why we store the `id` as a `serial`.

The `real` and `double precision` data types allow you to store floating-point numbers.
These two data types differ with respect to the number of digits that can be represented after the decimal.

The `real` data type has 4 bytes and allows you to represent 6 decimal digits.

The `double precision` data type has 8 bytes and allows you to represent 15 decimal digits.

The `varchar(n)` data type allows you to store strings with a maximum number of characters.
The `text` data type allows you to store strings of arbitrary length.

We want to limit the number of characters in a task title and status to `255`, so we use `varchar(255)` for both.

However we want to allow an _arbitrary_ amount of characters for the description, so we use the `text` data type here.

Finally, the `timestamp` data type allows us to store a date and a time.

The `created_at` column will store the time at which a task has been created and therefore has the `timestamp` data type.

### Constraints

The `primary key` constraint means that the column should be used to identify the rows of the table.
If a column is marked as `primary key`, its values must be unique and they can't be `null` (more about this in a second).

Since we want the `id` to uniquely identify each task, we apply the `primary key` constraint to the `id` column.

The `not null` constraint means that the inserted value can't be null.
Basically, we apply this constraint if we want to ensure that a value is always present in this column.

In our example, we want every task to have a `title`, a `description` and a `status` so we mark these columns as `not null`.
However, we allow a task to not have a `duration` and don't mark that column as `not null`.

The `check` constraint is used to specify a condition that each row must satisfy for the value to be accepted into a column.

In our example, we want the `status` column to only have the values `todo`, `inprogress` or `done` and use the `check` constraint to accomplish that.

The `default` constraint allows us to specify a default value for a column.
If an insert operation does not provide a value for a column, PostgreSQL will automatically insert the specified value.

In our example, we want the `created_at` value to simply be the current time and use the `default` constraint together with `current_timestamp` to accomplish that.
