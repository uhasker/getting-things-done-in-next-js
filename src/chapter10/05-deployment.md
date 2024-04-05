# Deployment

Now that we're done writing the first version, let's get our application out into the world.
We will use **GitHub** and **Vercel** to deploy our application.

## Creating a Git Repository

GitHub is a platform that allows developers to upload, store, manage and share their code.

If you look at `easy-opus` you will see a directory `.git` and a file `.gitignore`.
This is because `pnpm create next-app` has initialize a git repository for you.

Let's update the index with our current content:

```sh
git add .
```

If you run `git status` you will a bunch of change to be committed.
To actually commit them, run:

```sh
git commit -m "feat: initial commit"
```

Next, create a new repository on GitHub and push your changes there:

```sh
git remote add origin $YOUR_REPOSITORY_URL
git push --set-upstream origin master
```

## Deploying on Vercel

Finally, we will deploy this project on Vercel.
Simply go to `vercel.com`, create a new project and import the git repository that we just created.

Next, you need to add the environment variables in the "environment variables" section.

Finally, Vercel will deploy your application and automatically set up a domain for it.

Congratulations, you can now access `easy-opus` from anywhere in the world!
