## Hello World

<div style="text-align: right"> <i> A journey of a thousand miles begins with a single "Hello, World!" program. <br> — Ancient Chinese proverb </i> </div>

### Runtime Environments

Contrary to popular belief, code sadly doesn't run on pixie dust, magic spells, and unicorn tears.
Instead, it runs on something called a **runtime environment** (also referred to as _runtime system_ or just _runtime_).
Put simply, a runtime is a program capable of executing code written in some programming language.
It _provides the environment in which programs can run_.
In order to execute all the _awesome_ JavaScript code we're about to write, we therefore need a runtime first.

There are two runtimes capable of executing JavaScript code, which are relevant to this book—the browser and Node.js.

The browser, as well as the Node.js console, have **REPL** (read-eval-print-loop) capabilities.
This allows you to type code directly into the console and execute it.
REPLs are very nice because they allow you to quickly test new concepts.

Additionally, both runtimes can execute files containing JavaScript code.
This is how we will usually utilize the runtimes—we write a **script** (a file containing JavaScript code) and tell our runtime to execute it.

> As projects grow larger, we will often be dealing with multiple files at the same time.
> We will talk about this in the "Modules" section of this chapter.

Every runtime environment comes with a **console**.
This isn't a retro gaming console; rather, it's a special part of the runtime where you can input commands and see the results of your code in real-time.
Think of it as a conversation between you and the program—you tell it what to do (input commands) and it responds by executing those commands and showing you what happened (output).

In this section, we will set up the browser and Node.js runtimes.
Then we will output (alternatively, "log" or "print") "Hello, World!" both to the browser console and the Node.js console to test that our setup functions as intended.

### The Browser Environment

Open a browser, and open its console.
How you do this will depend on the browser.

If you're using _Firefox_, the shortcut for opening the console is <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>K</kbd> on Ubuntu/Debian and <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>K</kbd> on macOS.

If you're using _Chrome_ or _Microsoft Edge_, the shortcut is <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>J</kbd> on Ubuntu/Debian and <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>J</kbd> on macOS.

If you're using _Safari_ on macOS, you will need to enable the develop menu first by going to `Settings > Advanced` and ticking the box `Show Develop menu in menu bar`.
Then you can open the console using <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>K</kbd>.

> If you're using Internet Explorer, please navigate to `google.com` and search for "Firefox" or "Chrome" to install a _real_ browser.
> This line was originally intended to be a funny joke, but on June 15, 2022 Microsoft officially ended support for Internet Explorer, so it's not even a joke anymore.

This is approximately how the browser console will look like in Firefox:

![](images/browser-console.png)

> Note that if you see a bunch of scary error or warning messages upon opening the console, _don't panic_ (this is also good life advice in general).
> Most of these will probably come from various extensions you might have installed or the web page you are currently viewing.
> You can simply delete these messages, as we don't care about them.

Let's print something using the `console.log` method.
Type the following into the browser console:

```js
console.log('Hello, World!');
```

Now hit <kbd>Return</kbd> (you may also know this as <kbd>Enter</kbd> or simply <kbd>⏎</kbd>).
You will see the output `Hello, World!` in the console:

![](images/browser-console-log.png)

> Ignore the `undefined` for now.

Hooray, you've logged something to the browser console!
This is the point at which you can go tell everyone that you are now a *programmer*™.

### Executing JavaScript in the Browser

As we already mentioned, instead of executing JavaScript in the browser console directly, we can (and often will) execute it from a JavaScript _file_.
Since we're on the browser, we will need to create two files—an HTML file and a JavaScript file.

HTML is short for _HyperText Markup Language_ and is the standard markup language for documents that should be displayed in a browser.
We will cover HTML in detail in a later chapter.
For now we just want to create a very simple HTML document.

Here is how we can do this:
Create a new file.
We will call it _hello.html_.
However, you can name it whatever you want.
The filename should have an _html_ extension though.

Open the HTML file in any text editor (see below for text editors that are good choices for coding) and add the following text to the file:

```html
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <script src="hello.js"></script>
  </body>
</html>
```

Don't forget to save the file!

Now create another file called _hello.js_ in the same directory as _hello.html_ with the following content:

```js
console.log('Hello, World!');
```

> Note the semicolon after the `console.log`—it terminates the `console.log` statement.
> The semicolon is technically not required here and there are many JavaScript programmers who don't use semicolons.
> However, to avoid a bunch of pitfalls, we will use semicolons throughout this book and therefore we want you to get accustomed to them as soon as possible.

Now open this file in your browser by simply double-clicking the file.
After opening this file in your browser, open the console.
You should see the output `Hello, World!`.

Congratulations, you wrote your first script!

### Working With a Command Line

Now that we know how to use the browser runtime, we will move on to Node.js.
Before we can do that, we will need to learn how to interact with the **command-line interface** (also called command line, command prompt or CLI) on your computer.
A command line allows you to execute various tasks called **commands**.

If you're on Ubuntu, you can open the command line by pressing <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd>.

If you're on macOS, you can open the command line by pressing <kbd>Cmd</kbd> + <kbd>Space</kbd> to open _search_, typing _terminal_ and then hitting <kbd>Return</kbd>.

Now that you've opened a CLI, you can type a command and hit <kbd>Return</kbd> to execute it.
Try executing this command for starters:

```sh
echo 'Hello, World!'
```

> Generally, whenever we tell you to execute a command you need to type it in the CLI and hit <kbd>Return</kbd>.
> Therefore, we will omit saying that you need to hit <kbd>Return</kbd> from now on.

### The Node.js Runtime

For a long time, JavaScript was mostly used inside the browser runtime environment by programmers.
However, in 2009, Node.js came along and changed that by allowing programmers to easily run JavaScript outside the browser.

Node.js will probably not be installed on your machine, so let's fix that.
First, we have to install the **Node Version Manager** (**nvm** for short) which will allow us to manage Node.js versions in a simple and straightforward manner.

If you're on Ubuntu/Debian, you will need to run the following:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
```

If you're on macOS, you will need to run the following:

```sh
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | zsh
source ~/.zshrc
```

Check that `nvm` was successfully installed:

```sh
nvm --version
```

Finally, we will install Node.js (version 18):

```sh
nvm install 18
```

Verify that Node.js was successfully installed:

```sh
node --version
```

The installation script also automatically installed the **node package manager** (**npm** for short) which is a tool for managing dependencies in our projects.
Verify that `npm` was installed as well:

```sh
npm --version
```

Throughout this book we will use another package manager called `pnpm`, so let's install that too:

```sh
npm install -g pnpm
```

> The `-g` flag tells `npm` to install the package globally and not just for a particular project.

Verify that `pnpm` was installed:

```sh
pnpm --version
```

Now that Node.js is installed, you can open a Node.js console by typing `node` in the command line.

We can now output `Hello, World!` to the Node.js console using the `console.log` method.
Type the following into the console and hit <kbd>Return</kbd>:

```js
console.log('Hello, World!');
```

You should see the output `Hello, World!`.

To exit the Node.js console, simply type `.exit`.

### Executing a JavaScript File

We can also use Node.js to execute a JavaScript file.

Let's execute the `hello.js` we created earlier.
As a reminder, this file has the following content:

```js
console.log('Hello, World!');
```

Open a command line again and _change the current directory location to the directory containing the JavaScript file_.
You can do so using the _cd_ command.
For example, if `hello.js` is located at `/home/users/user` you would execute the following:

```sh
cd /home/users/user
```

Now execute the JavaScript file by running:

```sh
node hello.js
```

This should again print `Hello, World!`.

Note that for the remainder of this chapter you should follow along using the Node.js console.
Nevertheless, as we dive further into the Next.js stack, we will have to write JavaScript for the browser runtime environment on a regular basis.

### The Browser vs Node.js

We managed to execute some JavaScript on the browser and some JavaScript in Node.js.
Right now, these two runtime environments don't look too different because we've only logged something to the console.
However, in later sections you will learn that it's in fact extremely important which runtime you're on.

For example, in Node.js you can't access your browser window (which makes sense since there is no browser window).
On the other hand, if you're in the browser you can't write files to the computer (to protect users from malicious websites).
Often, people say that JavaScript code can be executed _on the client_ (in the browser) or _on the server_ (usually using Node.js).

Remember this point, since it will become extremely important later.

## Editors

In the previous paragraphs you had to create a few files containing code.
It should not come as a surprise that you will have to do this quite often throughout your programming journey.
You should therefore select a good editor that has features such as syntax highlighting, autocompletion etc.

> Coding in Notepad is in fact _not_ a good idea.

If you're a complete beginner, the [Visual Studio Code](https://code.visualstudio.com) editor is often an excellent first choice.

### Statements and Expressions

Before we dive into JavaScript, you should know that programs are made of statements and expressions.

A **statement** is a syntactic unit responsible for executing some action.
A **program** is then essentially a sequence of statements which should be executed when running the program.
For example, `console.log('Hello, World!')` is a statement which executes the action of logging `Hello, World!` to the console.

An **expression** is a syntactic unit that may be evaluated to get its value.
For example, `2 + 2` would be an expression which would evaluate to `4`.

You could put it this way: Statements are executed to make something happen, while expressions are evaluated to produce a value.

> Note that other authors might define statements and expressions in a slightly different manner (which is totally fine).
> However, we will stick to these definitions throughout this book.

### Comments

Everything that comes after a double slash on a line is a **comment** in JavaScript.
Comments are ignored by the runtime and therefore have no effect on the execution of your program:

```js
// This is just a comment
// Comments have no effect
console.log('Hello, World!');
// Therefore this program is equivalent to the
// program from the previous chapter
```

We will heavily utilize comments throughout this book inside our code blocks to highlight important ideas.

> There is a lot of discussion in the programming community on how much you should comment your programs.
> We will return to this when discussing functions.
> However, one rule is that if your code is so terrible that it requires _extensive commentary_ to explain its behavior or purpose, you should fix the code.
> Just like a work of art, your code should stand on its own merits.
> Imagine _commenting_ a work of art (oh, wait)...
> However, it's better to have terrible code and comments than have terrible code and no comments.
> And, of course, if your code does something particularly complicated, throwing in a comment might be a good idea.

We will also adopt the convention that if a comment is next to a line with a `console.log` statement, that comment shows the output that would be logged to the console if the code was executed.
For example:

```js
console.log('Hello, World!'); // Hello, World!
```

This is the point where we tell you that while you're reading this book you should _absolutely follow along in some runtime_ (probably Node.js, but a browser is fine too).
This is _very important_.
Go ahead and open a Node.js console _now_.

Come on, we will wait...

Waiting...

Waiting...

Waiting...

_Finally_.
Let's move on.
