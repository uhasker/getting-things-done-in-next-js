## Updating Rows

You can update rows using the `update` statement.
Here you need to specify which table, which columns and which rows to update:

```sql
update task
set status = 'Completed'
where id = 1;
```
