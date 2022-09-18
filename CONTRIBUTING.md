# Contributing Guide

## How to contribute

We welcome all contributions submitted as pull requests.

### Pull Requests

Before creating a pull request, please read these instructions:

- Make sure you have [Deno installed](https://deno.land/#installation).
- One pull request per feature. If you want to do more than one thing, send
  multiple pull requests.
- Ensure your code is working properly.
- Document any change in your PR description.
- Make sure to read the pre-commit hook instructions to format/lint your code.

### Using pre-commit hooks

We use [Velociraptor](https://velociraptor.run/) script runner to automate `fmt`
and `lint` code tasks with pre-commit hooks.

- Make sure you have
  [Velociraptor installed](https://velociraptor.run/docs/installation/).
- Fork/Clone the lume.land repository.
- Make sure to run `vr` at least once in the project folder, to activate hooks
  managed by Velociraptor.

```js
✅ Git hooks successfully installed
```

- To see a list of available scripts Velociraptor run: `vr`

When running `git commit` hook, Velociraptor will automatically format & lint
your code.

### Without pre-commit hooks

If you do not want to use Velociraptor, make sure to:

- Run `deno fmt` to fix the code format before committing.
- Run `deno lint` to check linting before committing.
