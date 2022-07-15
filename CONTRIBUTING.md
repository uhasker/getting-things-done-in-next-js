# Contributing

## Setup

To get a preview of the book you need to install the [mdBook CLI](https://rust-lang.github.io/mdBook/guide/installation.html).

```shell
cargo install mdbook
```

Start a development server, which will serve the book on http://&lt;your-ip-address&gt;:3000 (e.g. http://localhost:3000).

```shell
mdbook serve --open
```

This will build the project to the `book` directory.

```shell
mdbook build
```

## Guidelines

### Commits

Please adhere to https://www.conventionalcommits.org/en/v1.0.0/ when writing commit messages.

### Branches

Branch names should be `lisp-case` and should start with the chapter name the feature of fix applies to.

For example if you fix a typo in Chapter 1.5, the branch name should be `c-01-05-fix-typo`.
