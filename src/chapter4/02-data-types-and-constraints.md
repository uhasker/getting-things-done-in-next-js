## Data Types and Constraints

<div style="text-align: right"> <i> A primary key is the compass of a table; it guides every row to its unique destiny. <br> — Ancient Chinese proverb </i> </div>

### Numeric Data Types

The `integer` data type allows you to store integers.
You usually use this data type for counts, identifiers etc.

In our example, we use `integer` for the `duration` column of the `task` table.

Note that there are actually multiple integer data types in PostgreSQL.
The `smallint` data type allows you to store "small-range integers" and the `bigint` data type allows you to store "large-range integers".

The difference between `smallint`, `integer` and `bigint` is basically the number of bytes they contain which impacts the minimum and maximum integers that can be stored.

A `smallint` value has 2 bytes, i.e. it can store values from `-32768` up to `32767`.

An `integer` value has 4 bytes, i.e. it can store values from `-2147483648` up to `2147483647`.

A `bigint` value has 8 bytes, i.e. it can store values from `-9223372036854775808` up to `9223372036854775807`.

For most regular web applications, `integer` values are more than enough, and by default, PostgreSQL uses `integer` values for numbers.
Consider this example:

```sql
select 41234, pg_typeof(41234);
```

This will return:

```
| ?column? | pg_typeof |
| -------- | --------- |
| 41234    | integer   |
```

> The `pg_typeof` operator returns the data type of an expression.
> Additionally, you should ignore the column names in this section—only the column values are relevant for us here.

Note that by default integers have the type `integer` even if they could be `smallint`.
Consider this example:

```sql
select 42, pg_typeof(42);
```

This will return:

```
| ?column? | pg_typeof |
| -------- | --------- |
| 42       | integer   |
```

You could use the `::` operator to convert a value into a different data type:

```sql
select 42::smallint, pg_typeof(42::smallint);
```

> Note that `::` is a PostgreSQL-specific operator and not part of the official SQL standard.

This will return:

```
| int2 | pg_typeof |
| ---- | --------- |
| 42   | smallint  |
```

Of course, if you provide a `bigint` value, PostgreSQL will use the `bigint` data type, since `bigint` doesn't fit into `integer`:

```sql
select 2147483652, pg_typeof(2147483652);
```

This will return:

```
| ?column?   | pg_typeof |
| ---------- | --------- |
| 2147483652 | bigint    |
```

If you would try to convert this value to an `integer`, you would get an error.
For example, trying to execute `select 2147483652::integer` would result in the error `ERROR: 22003: integer out of range`.

The `serial` data type allows you to represent _autoincrementing_ integers (along with `smallserial` and `bigserial`).
This makes `serial` very useful for unique identifiers since you don't need to handle the incrementing logic yourself.

In the `task` table, the `id` column has the `serial` data type.

> Note that there are many other data types and strategies for automatically handling unique identifiers.
> For _simple_ applications it doesn't matter, so in this chapter we will stick to the `serial` data type.

PostgreSQL knows four data types for storing real numbers—`decimal`, `numeric`, `real` and `double precision`.

The `decimal` and `numeric` types are equivalent and allow you to store numbers with a very large number of digits.
These data types are recommended for quantities where your floating-point calculations need to be exact (e.g. when working with money).

By default, PostgreSQL will use `numeric` for floating-point numbers:

```sql
select 0.5::double precision, pg_typeof(0.5);
```

This will return:

```
| float8 | pg_typeof |
| ------ | --------- |
| 0.5    | numeric   |
```

Note that because of the arbitrary precision requirement, calculations on values of the `numeric` data type are relatively slow.

The `real` and `double precision` data types allow you to store floating-point numbers with a precision of `6` and `15` digits, respectively.
Consider this example:

```sql
select 0.123456789123456789::real, pg_typeof(0.123456789123456789::real);
```

This will return:

```
| float4   | pg_typeof |
| -------- | --------- |
| 0.123457 | real      |
```

Note that you only have a precision of `6` digits left after the conversion.

Something similar happens for the `double precision` data type:

```sql
select 0.123456789123456789::double precision, pg_typeof(0.123456789123456789::double precision);
```

This will return:

```
| float8            | pg_typeof        |
| ----------------- | ---------------- |
| 0.123456789123457 | double precision |
```

Note that you have a precision of `15` digits now (which is more than the `real` data type, but still not enough to represent the number in the given example).

### Character Data Types

PostgreSQL supports the `char(n)`, `varchar(n)` and `text` data types for storing characters and strings.

The `char(n)` and `varchar(n)` data types can store strings up to `n` characters in length.

For example, conversions to `char(n)` and `varchar(n)` would silently truncate the string:

```sql
select 'Next.js book'::char(3), pg_typeof('Next.js book'::char(3));
```

This will return:

```
| bpchar | pg_typeof |
| ------ | --------- |
| Nex    | character |
```

You will get a similar result if you use `varchar`:

```sql
select 'Next.js book'::varchar(3), pg_typeof('Next.js book'::varchar(3));
```

This will return:

```
| varchar | pg_typeof         |
| ------- | ----------------- |
| Nex     | character varying |
```

The `text` data type allows you to store strings of arbitrary length.
For example:

```sql
select 'Next.js book'::text, pg_typeof('Next.js book'::text);
```

This will return:

```
| text         | pg_typeof |
| ------------ | --------- |
| Next.js book | text      |
```

Note that while theoretically `char(n)` and `varchar(n)` have minor performance advantages over `text`, these performance advantages are usually irrelevant in practice (at least for PostgreSQL), so throughout this book we will simply always use the `text` data type.

In our `task` table we use `text` both for the `title` and the `description` column.

> If you're interested in more details about the tradeoffs between `char(n)`, `varchar(n)` and `text`, check out the [official PostgreSQL documentation](https://www.postgresql.org/docs/current/datatype-character.html).

### Date/Time Data Types

Dates and times are a famously dreaded topic among programmers, especially in combination with persistent data storage.
We will only look at the very tip of the iceberg here.
However, you should keep in mind that there are many complexities that we will skip for now.

The three most important date/time data types are `date`, `time` and `timestamp`.

The `date` data type allows you to store the date part (year, month, day) without the time information.
Consider this example:

```sql
select '2023-07-04'::date, pg_typeof('2023-07-04'::date);
```

This will return:

```
| date       | pg_typeof |
| ---------- | --------- |
| 2023-07-04 | date      |
```

The `time` data type is basically the "complement" to the `date` type and allows you to store the time part (hours, minutes, seconds) without the date information.
Consider this example:

```sql
select '07:05:16'::time, pg_typeof('07:05:16'::time);
```

This will return:

```
| time     | pg_typeof |
| -------- | --------- |
| 07:05:16 | time      |
```

Finally, the `timestamp` data type allows us to store a date and a time.
This is also the most commonly used date/time data type (since you usually care about the date _and_ time).
Consider this example:

```sql
select '2023-07-04 07:05:16'::timestamp, pg_typeof('2023-07-04 07:05:16'::timestamp);
```

This will return:

```
| timestamp           | pg_typeof                   |
| ------------------- | --------------------------- |
| 2023-07-04 07:05:16 | timestamp without time zone |
```

In our `task` table, we use the `created_at` column to store the time at which a task has been created.
Since we care about the date and the time, we use the `timestamp` data type here.

There are additional data types like `timestamp with time zone` (if we want to store the time zone with the timestamp), however for now we have enough data types to confidently work with dates and times in _simple_ applications.

### Enums

Enumerated data types are data types which comprise a static (and also ordered) set of values.
This is a bit similar to creating a union of literal types in TypeScript (although enums and union types _are not the same_).

You can define an enum using the `create type` statement.
For example, this is how we defined the `status` enum:

```sql
create type status as enum ('todo', 'inprogress', 'done');
```

Once the enum is defined, it can be used like every other data type:

```sql
create table task (
    -- code
    status status,
    -- code
);
```

### Constraints

Often, we want to limit the kind of data that can be stored in a table beyond just limiting the data types.
This can be accomplished with **constraints**.

The `unique` constraint is used to ensure that the data in a column is unique among all the rows in a table.

For example, we gave the `title` column the `unique` constraint to ensure that there will never be two tasks with the same title:

```sql
create table task (
    -- code
    title text unique,
    -- code
);
```

Another important constraint is the `not null` constraint.

By default, you can insert a `null` value as data, where `null` is basically a special marker indicating that the given data doesn't exist (a bit similar to `null` and `undefined` in TypeScript).
The `not null` constraint quite sensibly indicates that the inserted value can't be `null`.

In our example, we want every task to have a `title`, a `description` and a `status` so we mark these columns as `not null`:

```sql
create table task (
    -- code
    title text not null,
    description text not null,
    -- code
);
```

However, we allow a task to not have a `duration` and don't mark that column as `not null`.

Basically, we apply the `not null` constraint if we want to ensure that a value is always present in this column.

The `primary key` constraint means that the column should be used to identify the rows of the table.
If a column is marked as `primary key`, its values must be `unique` _and_ they can't be `null`.

Since we want the `id` to uniquely identify each task, we apply the `primary key` constraint to the `id` column:

```sql
create table task (
    id serial primary key,
    -- code
);
```

The `check` constraint is used to specify a condition that each row must satisfy for the value to be accepted into a column.

We could have used this for the `status` column by writing `check in ('todo', 'inprogress', 'done')`.
However, since we knew the values in advance, we were able to use an enum instead.
Unlike enums though, check constraints allow more flexibility.

For example, we can give the `duration` column a constraint that its values must be greater than 0:

```sql
create table task (
    -- code
    duration integer check (duration > 0),
    -- code
);
```

The `default` constraint allows us to specify a default value for a column.
If an insert operation doesn't provide a value for a column, PostgreSQL will automatically insert the specified value.

In our example, we want the `created_at` value to simply be the current time and use the `default` constraint together with `current_timestamp` to accomplish that:

```sql
create table task (
    -- code
    created_at timestamp default current_timestamp
);
```
