# Pura
Pura is an opinionated, but lightweight project starter kit. Powered by ES2015, Node.js, Webpack and more!

## Requirements
- Node 7.8.0 (use [nvm](https://github.com/creationix/nvm) to manage your Node versions!)
- [Yarn](https://yarnpkg.com) `npm i -g yarn`

## Setting up
1. Clone/download to your machine
2. Run `yarn` to install dependencies

## 🚨 IMPORTANT! Using Yarn vs. NPM
**Please note:** We are using Yarn on this project and not using NPM. This means **you should not use npm commands when adding/removing dependencies**! Please refer to the [Yarn's documentation](https://yarnpkg.com/en/docs/migrating-from-npm#toc-cli-commands-comparison) to ensure you are running the correct `yarn` command to:

- Add new dependencies
- Remove dependencies
- Reinstall dependencies

## Tasks
| Task                | Role                                        |
|:--------------------|:--------------------------------------------|
| yarn start/yarn dev | Watch for changes to new files.             |

## A single `src/` directory
Pura no longer has separate `app/` and `dist/` folders. This old strategy forced developers to build assets locally, commit them to the repository, and deploy them out. Working out of a single `src/` directory allows us to ignore the compiled assets and setup deployment/CI tools to run the build tasks before deploying to servers.

### Deployment/CI Tasks
| Task                | Role                                        |
|:--------------------|:--------------------------------------------|
| yarn build          | Lints and compiles your CSS/JS              |
| yarn deploy         | Revs CSS/JS files and minifies images       |

## Deploying
Pura expects that your deployment/CI process will run `yarn build` and `yarn deploy` to compile the assets, rev them, and minify the images before deploying to your server. If you do not have a deployment/CI tool that will do this, you may simply deploy the `src/` directory. You can easily do this by removing it from the `.gitignore` file and committing it back to the repo.

## Documentation
| Section                                                                                          | Description                                                           |
|:-------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------|
| [Settings](https://github.com/trendyminds/pura/wiki/Settings)                         | When you need to change project-wide settings in your project         |
| [Webpack & JS Modules](https://github.com/trendyminds/pura/wiki/Webpack-&-JS-Modules) | How to utilize Webpack for functionality like code splitting and more |
