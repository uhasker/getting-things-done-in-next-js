## Setup

### Create a Database

First, we need to create a new database.
For this book, we will use Supabase.

Go to [Supabase](https://supabase.com).
Create a new project, give it a name and select a database password (which you should write down somewhere).

Once you create the new project, go to "Project Settings > Database" and copy past the URI connection string.
Replace `[YOUR-PASSWORD]` with the password you gave the database in the previous step.

Save the connection string, we will need it in a second.

### Table Creation

Let's also create a table:

```sql
create table task (
    id serial primary key,
    title varchar(255) not null,
    description text not null,
    status varchar(255) not null,
    duration integer not null
)
```

This table schema defines the columns of the table.
Each column has a name, a data type, an optional constraints.

### Data Types

The **integer** data type allows you to store integers.

The **float** and **double** data types allow you to store floats and doubles.

The **varchar(num_chat)** data type allows you to store strings with a maximum number of characters.
The **text** data type allows you to store strings of arbitrary length.

### Constraints

The **primary key** constraint means that the column should be used to identify the rows of the table.

The **not null** means that the inserted value can't be null.
