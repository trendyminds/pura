# 💧 Pura
Pura is an opinionated project starter kit powered by Node.js, Webpack, PostCSS, React and more!

## ⭐️ Requirements
Node 10.15.3 (use [nvm](https://github.com/creationix/nvm) to manage your Node versions!)

## 🛠 Setting up
1. Clone/download to your machine
2. Run `npm i` to install dependencies

## 🌐 Accessing your project
Pura uses [webpack-dev-server](https://github.com/webpack/webpack-dev-server/) and will run server on http://localhost:3000 when you've initiated `npm start`. As Pura compiles your changes your CSS and JavaScript will live-reload.

### For dynamic, server-side websites (CMSs, etc)
If your site uses a server-side language you'll view your project on the domain you setup within MAMP, Docker, Vagrant, etc.

### For static HTML websites
If your site requires no server-side languate you can visit http://localhost:3000 to view your static HTML, CSS and JavaScript.

## 📦 Deploying
In order to live-reload your CSS and JavaScript these files are explicitly served from http://localhost:3000 within your template:
```html
<link rel="stylesheet" href="http://localhost:3000/_compiled/main.css">

<!-- ... -->

<script src="http://localhost:3000/_compiled/runtime~main.js"></script>
<script src="http://localhost:3000/_compiled/vendors~main.js"></script>
<script src="http://localhost:3000/_compiled/main.js"></script>
```

Make sure to change the domain of these URLs when deploying your project.

🔥 **Tip**: If this uses a server-side language use an environment variable to set this dynamically:
- [Craft environment variables](https://docs.craftcms.com/v3/config/environments.html)
- [PHP Environment Variables using phpdotenv](https://github.com/vlucas/phpdotenv)

## ✅ Tasks
| Task              | Description                                      |
|:------------------|:-------------------------------------------------|
| `npm start`       | Watch for changes to new files                   |
| `npm test`        | Runs Jest test suite                             |
| `npm run lint`    | Lints code using Stylelint and ESLint            |
| `npm run build`   | Compiles CSS/JS                                  |
| `npm run deploy`  | Compiles CSS/JS and revvs file names for caching |
