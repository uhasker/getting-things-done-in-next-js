## Introducing JSX

### Add JSX

Instead of writing increasingly convoluted `React.createElement` calls until we lose the last scraps of our sanity, we would like to use syntax that looks like HTML. For example we would _really like_ to be able to write stuff like this:

```javascript
const element = <li id="task1">Task 1</li>;
```

Unfortunately this is not possible as the above is not valid JavaScript (no trademarks this time, we promise). Feel free to try it out and add the above JavaScript to your `<script>` tags inside `index.html`. When you open the page you will see the following error in your console:

```shell
Uncaught SyntaxError: expected expression, got '<'
```

**Babel** to the rescue! This tool allows us to _transpile_ **JSX** (which looks like HTML) to JavaScript.

First we need to import Babel. We will use a CDN for now (like we did with React). Add this below the React script tags:

```html
<script src="https://unpkg.com/@babel/standalone/babel.js"></script>
```

Next set the `type` _attribute_ of the `<script>` tag inside the body to "text/babel" and replace the calls to `React.createElement` with JSX:

```html
<script type="text/babel">
  const task1 = <p>Task 1</p>;
  const task2 = <p>Task 2</p>;
  const taskList = <div id="taskList" children={[task1, task2]} />;
  const heading = <h1>Tasks</h1>;
  const app = <div id="app" children={[heading, taskList]} />;
  const root = ReactDOM.createRoot(document.querySelector('#root'));
  root.render(app);
</script>
```

Now open the `index.html` in your browser. Incredibly enough, it *just works*™.

But why does it work? Let us again open the browser inspector and look inside the head element of the document. We will see that Babel _sneakily_ added another script tag below the title. If we take a look inside, we will see that this script tag just contains a bunch of `React.createElement` calls.

Babel _transpiled_ our JSX into `React.createElement` calls. Sneaky indeed! But this is _the good kind of sneaky_ as it allows us to write _more readable code_. And as we all know - writing readable code makes you both a better programmer and a better person.

### Inline JSX

The new code looks much better, but is still a bit ugly. Luckily, we can inline the JSX. This simply means that we can nest JSX elements inside each other (similar to HTML). This is how the new JavaScript inside our script tag looks like:

```javascript
const app = (
  <div id="app">
    <h1>Tasks</h1>
    <div id="taskList">
      <p>Task 1</p>
      <p>Item 2</p>
    </div>
  </div>
);
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(app);
```

This looks pretty much exactly like regular HTML. However, it is important to remember that JSX is _emphatically not_ HTML. Instead it is a **syntax extension** to JavaScript that can be transpiled to _normal_ JavaScript. This will lead to a number of important consequences down the road (namely that JSX can express things HTML can not).

Right now you are probably wondering why we are bothering with React at all. We took perfectly fine HTML and for some reason insisted on doing a bunch of complex things just to get essentially the same HTML, but dynamically. However, this setup will now payoff in a _huge_ way, as we introduce React components.

### Summary

You know how to dynamically manipulate the DOM using JSX and that you should write JSX instead of `React.createElement` calls.
