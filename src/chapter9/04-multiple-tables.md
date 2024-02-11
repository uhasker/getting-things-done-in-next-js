## Multiple Tables

### Foreign Keys

Let's recreate the project and task table from the SQL chapter in Drizzle:

```ts
const projectTable = pgTable('project', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const taskTable = pgTable("task", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(),
  projectId: integer('projectId').notNull().references(() => projectTable.id);
});
```

### Inner Join

You can perform an inner join like this:

```ts
await db.select().from(projectTable).innerJoin(taskTable, eq(projectTable.id, taskTable.projectId));
```
