# MERN book

## Contributing

If you want to contribute, **read the `CONTRIBUTING.md` first**. We will reject PRs that fail to adhere to the `CONTRIBUTING.md` without further review.

## Installation

To get a preview of the book you need to install the [mdBook CLI](https://rust-lang.github.io/mdBook/guide/installation.html).

```shell
cargo install mdbook
```

## Writing

Start a development server, which will serve the book on http://&lt;your-ip-address&gt;:3000 (e.g. http://localhost:3000).

```shell
mdbook serve --open
```

## Building

This will build the project to the `book` directory.

```shell
mdbook build
```
