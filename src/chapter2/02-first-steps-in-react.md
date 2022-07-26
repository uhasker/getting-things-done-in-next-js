## First steps in React

<div style="text-align: right"> <i> The last thing the world needs is another JavaScript library. <br> - Ancient Chinese proverb </i> </div>

### Rendering a React element

Let us import React using a **content delivery network** (CDN for short). Open `client/index.html` and insert the following `<script>` between the `<head>` tags:

```html
<head>
  ...
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
</head>
```

This instructs our browser to obtain and execute the respective JavaScript files enabling us to use React.

Now we remove the `<h1>` in the `<div>` element (since we are about to insert it dynamically). We also add a pair of `<script>` tags - all the JavaScript we are about to write will go between those `<script>` tags. The body now looks like this:

```html
<body>
  <div id="root"></div>
  <script></script>
</body>
```

First we need create a React **root**. This the container in which we will render all our fancy UI elements. React DOM provides a `createRoot` function to accomplish that. The function takes a container, creates a React root for the container and returns the root:

```javascript
const root = ReactDOM.createRoot(document.querySelector('#root'));
```

Next we want to actually create our React elements using the `React.createElement` function. A **React element** is essentially a building block describing some part of your UI. For example we could create a heading containing the text "Tasks" like this:

```javascript
const element = React.createElement('h1', undefined, 'Tasks');
```

Let's have a look at the arguments here. The first argument is the _type_ of the element. This can for example be the name of a regular HTML tag - however other types are possible and will in fact become very important soon. The second argument describes the _props_ of the element. Here we could e.g. pass the ID of the element - if we need one. If we don't want to pass any props, we simply pass `undefined`. The third argument contains the _children_ of the element. In this case we only have one child which is the text inside the heading.

> Note that quite often you will see people passing `null` as the second argument if no props are present. This goes back to our discussion regarding `null` and `undefined` - in this book we always use `undefined` to indicate value absence.

Now that we have created a root and an element, we can render the element inside the root by using the conveniently named `render` function:

```javascript
root.render(element);
```

This is how it all looks together (remember that this code should be between the `<script>` tags):

```javascript
const element = React.createElement('h1', undefined, 'Tasks');
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(element);
```

This is how the entire HTML file should look like:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Easy Opus</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const element = React.createElement('h1', undefined, 'Tasks');
      const root = ReactDOM.createRoot(document.querySelector('#root'));
      root.render(element);
    </script>
  </body>
</html>
```

Now open the HTML file in your browser. You should see a heading "Tasks". Let us now inspect the resulting HTML using the browser inspector (press <kbd>F12</kbd> and open the tab labeled "Inspector" _or_ "Elements"). This is how the HTML inside the body looks like:

```html
<div id="root">
  <h1>Tasks</h1>
</div>
```

As you can see our element has been rendered inside the root. Great! Now you know how to manipulate the DOM with React. Go head and add React to your resume (unless of course you actually want to _learn_ it which we _highly disapprove of_)!

### Add children to React elements

Let us now add some tasks and render them just like we did in the previous section. Every member of the list will in turn be a child of the list itself. This looks as following:

```javascript
const task1 = React.createElement(
  'p',
  undefined,
  'Read the MERN book: Read and understand the MERN book.',
);
const task2 = React.createElement(
  'p',
  undefined,
  'Write a website: Create a new and cool website.',
);
const taskList = React.createElement('div', { id: 'taskList' }, task1, task2);
const heading = React.createElement('h1', undefined, 'Tasks');
const app = React.createElement('div', { id: 'app' }, heading, taskList);
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(app);
```

Here we create two tasks (`task1` and `task2`). Then we create a `<div>` (`taskList`) containing those tasks. Then we create a heading element (`heading`). Finally we create a div containing the list of tasks and the heading (`app`) and render that element inside the root.

At this point you are probably asking yourself: _Didn't you just promise me that manipulating the DOM in React will be simple, you liars? This looks just like regular Javascript™®℠._ You have a point (the one after the trademark symbols) and we will indeed vastly simplify this code in the next section via black magic called **JSX**.

### Summary

Now you know how to import React using a CDN and how to dynamically manipulate the DOM using `React.createElement` and `ReactDOM.createRoot`. You also know you shouldn't actually do this.

## Further reading

There is no further reading for this section.
