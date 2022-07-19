## Project structure

### Splitting files

All this time we were working inside a single index.html. This is bad for three main reasons:

1. We want to split the HTML and JavaScript (and later the CSS) into separate files. This will improve the maintainability of the project.
2. We want to split the JavaScript files as well. For example it is very common to have a component per JavaScript file.
3. We want to avoid loading the scripts from a CDN and performing the Babel transpilation at run time. Instead we want to put everything into a _bundle_ and then simply use that bundle.

In order to be able to do all of this we need a _build toolchain_. Let us begin the setup of the toolchain by creating a directory public/ and moving the index.html file into public/. You can do this using your file explorer or using the command line:

```shell
mkdir public
mv index.html public/
```

The public/ directory will mostly just contain your index.html file and things like the favicon. We now create a src/ directory.

```
mkdir src
```

This is where all the JavaScript _source_ files (i.e. the files you use for development) will live.

Next we move the Javascript from `public/index.html` into `src/index.js`.

The `public/index.html` should therefore now look like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Easy Opus</title>
  </head>
  <body>
    <div id="root"> </div>
    <script src="../dist/bundle.js"></script>
  </body>
</html>
```

Note that we include a file called `dist/bundle.js` and not `src/index.js`. We will return to this in a second.

The `src/index.js` file should look like this:

```javascript
const TaskList = ({ tasks }) => {
  return (
    <div id="taskList">
      {tasks.map(({ summary, description }) => (
        <p>{`${summary}: ${description}`}</p>
      ))}
    </div>
  );
};

const tasks = [
  {
    summary: 'Read the MERN book',
    description: 'Read and understand the MERN book.',
  },
  {
    summary: 'Write a website',
    description: 'Create a new and cool website.',
  },
];

const app = (
  <div id="app">
    <h1>Tasks</h1>
    <TaskList tasks={tasks} />
  </div>
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);
```

Your folder structure should look as follows:

```
easy-opus/
└── client/
    ├── public/
    │   └── index.html
    └── src/
        └── index.js
```

### Initialize a node.js project

In chapter 1 we always worked with either individual code snippets or JavaScript files. However now we want to create a Node.js project.

Initialize a Node.js project by running:

```shell
npm init -y
```

We pass the -y flag to avoid all kinds of annoying questions about things we currently don't care about.

If you inspect your root directory you will now see a package.json which looks approximately like this:

```json
{
  "name": "client",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

We already met babel. Instead of serving it from a CDN we now install it as a development dependency. In addition we install the react-preset to allow the transpilation of JSX:

```shell
npm install --save-dev @babel/cli @babel/core @babel/preset-react babel-loader
```

Next we install webpack and the webpack development server as a dev dependency:

```shell
npm install --save-dev webpack webpack-cli webpack-dev-server
```

If you look inside the project you will see that there are two new things. The first thing is a directory called node_modules. This contains the newly installed dependencies. The second thing is a file called package-lock.json which contains all the dependencies (include the dependencies of the dependencies) with their exact version. This file allows other developers to reconstruct your _exact dependencies_ - especially in large projects this can become extremely important. Hunting down errors that stem from dependendency problems is some of the worst pastime you can think of in software development.

> As a side note, the node_modules directory already contains approximately 45MB. Nothing to see here... This is an unfortunate artifact of JavaScript developers generally using _a lot_ of dependencies (not all of which are always necessary).

Next we create the webpack configuration in a file called _webpack.config.js_:

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        ],
      },
    ],
  },
};
```

Now we can build the project:

```shell
npx webpack build
```

This builds the project into `dist/bundle.js`. Remember that this is the file we are including in our `index.html`. Your project structure should look like this:

```
todo-app
├── node_modules
├── dist
│   └── bundle.js
├── public
│   └── index.html
├── src
│   └── index.js
├── package.json
├── package-lock.json
└── webpack.config.js
```

Open `index.html` in your browser and you will see a list of tasks.

### Add npm scripts

Instead of running command like `npx webpack serve` all the time, we can tell npm to map commands:

```shell
"scripts": {
  "build": "webpack build",
  "serve": "webpack serve"
}
```

Now instead of executing `npx webpack build` and `npx webpack serve` we simply do `npm run build` and `npm run serve` respectively. This will become especially important when we will migrate from webpack to other bundlers since we can then simply edit the package.json and the commands will not change.

Let us now further improve the project structure.

### Splitting the JavaScript

Instead of having a single JavaScript file for the entire application, we want to split the JavaScript code as well. It is common practice to put every JavaScript component into its own file.

We now move Task into a separate component and put that component into a file called _src/task.js_:

```javascript
const Task = ({ summary, description }) => {
  return <p>{`${summary}: ${description}`}</p>;
};

export default Task;
```

This looks like overkill at first glance. However the tasks will inevitably become more complicated (this is a task management application after all). It is therefore already clear that the task should be its own component. Don't just blindly implement the current requirements, think about probable scenarios for the future and what they mean for your code.

Next we move the TaskList component to src/task-list.js:

```javascript
const TaskList = ({ tasks }) => {
  return (
    <div id="taskList">
      {tasks.map(({ summary, description }) => (
        <Task summary={summary} description={description} />
      ))}
    </div>
  );
};

export default TaskList;
```

By now you know the drill. The App component goes into src/app.js:

```javascript
const App = () => {
  const tasks = [
    {
      summary: 'Item 1',
      description: 'Description of item 1',
    },
    {
      summary: 'Item 2',
      description: 'Description of item 2',
    },
  ];

  return (
    <div id="app">
      <h1>Tasks</h1>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default App;
```

Finally our src/index.js becomes really simple:

```javascript
import App from './app';

root.render(<App />);
```

### Install React as a dependency instead of serving from CDN

We no longer want to serve React from CDN, but install it as a dependency instead.

Run:

```shell
npm install react react-dom
```

We also need to change the webconfig:

```javascript
options: {
  presets: [
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
  ],
}
```

We now need to import ReactDOM at the top of src/index.js:

```javascript
import ReactDOM from 'react-dom/client';
```

Run the webpack build again (`npx webpack build`) and open `index.html` in a browser. You will again see the same task list. Note that not much has changed in terms of _features_, however the structure of our project is now _much_ cleaner. We will make some minor improvements later on (like using a _development server_), however all in all this is the project structure we will stick to for now.

### Summary

You learned about webpack and how to structure a JavaScript project.
