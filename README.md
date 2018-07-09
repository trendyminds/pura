# Pura
Pura is an opinionated project starter kit powered by ES2015, React, Node.js, Webpack and more!

## Requirements
- Node 8.10.0 (use [nvm](https://github.com/creationix/nvm) to manage your Node versions!)
- [Yarn](https://yarnpkg.com) `npm i -g yarn`

## Setting up
1. Clone/download to your machine
2. Run `yarn` to install dependencies

## Deploying/compiling the project
By default, directories that contain compiled CSS and JavaScript are ignored. You may change this by altering the `.gitignore`. However, **we recommend not committing compiled assets to your project** and letting your continuous integration/deployment tool compile your project before deployment. This is for a couple reasons:

1. 🌀 You no longer need to track giant, minified files in Git
2. ⚠️ When you have merge conflicts they will _only_ occur in the source files and be simpler to resolve
3. ⏱ You no longer need to run a `build` task before deploying changes

## Tasks

| Task | Description |
|:-----|:------------|
| `yarn start` | Watch for changes to new files. |
| `yarn test` | Runs your test suite(s). |
| `yarn lint` | Lints your code using Stylelint and ESLint. |
| `yarn build && yarn deploy` | **Only run in deploy process!** Compiles CSS/JS and revs files |

## Previewing the compiled version of the site locally
There might be an occasion where you'd like to see what the compiled/minified/revved version of the site looks like on your local machine. To do this, you must:

1. Run `yarn build && yarn deploy`.
2. Review the site within `src/`.
3. ⚠️ **IMPORTANT!** Once you are finished reviewing, **do not commit these changes**. Revert them so the only files in the repo are source files.

## 🚨 IMPORTANT! Using Yarn vs. NPM
**Please note:** We are using Yarn on this project and not using NPM. This means **you should not use npm commands when adding/removing dependencies**! Please refer to the [Yarn's documentation](https://yarnpkg.com/en/docs/migrating-from-npm#toc-cli-commands-comparison) to ensure you are running the correct `yarn` command to:

- Add new dependencies
- Remove dependencies
- Reinstall dependencies
