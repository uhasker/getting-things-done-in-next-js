## Deployment

Now that we're done writing the first version, let's get our application out into the world.
We will use **GitHub** and **Vercel** to deploy our application.

### Creating a Git Repository

GitHub is a platform that allows developers to upload, store, manage and share their code.

If you look at `easy-opus` you will see a directory `.git` and a file `.gitignore`.
This is because `pnpm create next-app` has initialized a git repository for you.

Let's update the index with our current content:

```sh
git add .
```

If you run `git status` you will see the changes to be committed.
To actually commit them, run:

```sh
git commit -m "feat: initial commit"
```

Next, create a new repository on GitHub and push your changes there:

```sh
git remote add origin $YOUR_REPOSITORY_URL
git push --set-upstream origin main
```

### Deploying on Vercel

Finally, we will deploy this project on Vercel.
Simply go to `vercel.com`, create a new project and import the git repository that we've just created.

Next, you need to add the environment variables in the "environment variables" section.

Finally, Vercel will deploy your application and automatically set up a domain for it.

Congratulations, you can now access `easy-opus` from anywhere in the world!

> Note that normally we would also protect our webpage with authentication precisely in order to prevent everyone in the world from making changes to your tasks.
> However, authentication is out of scope for this book.

### More Features

Congratulations, you now have a working minimal task application.

You should try adding more features, most importantly:

- make the status field in the tasks a dropdown that allows you to change the status
- add a button that allows you to delete the tasks
- arrange the tasks in columns by their status
- show the creation date of the tasks in the UI

And more!
