## Multiple Tables

<div style="text-align: right"> <i> Y'all should just copy everything Eloquent has <br> - From Drizzles official page </i> </div>

### Foreign Keys

Let's recreate the project and task table from the SQL chapter in Drizzle:

```ts
export const projectTable = pgTable('project', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const taskTable = pgTable('task', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  status: varchar('status', { length: 255 }).notNull(),
  duration: integer('duration'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  projectId: integer('project_id').notNull().references(() => projectTable.id);
});
```

### Inner Join

You can perform an inner join like this:

```ts
await db.select().from(projectTable).innerJoin(taskTable, eq(projectTable.id, taskTable.projectId));
```
