const stylelint = require('stylelint');

stylelint.lint({
  configFile: ".stylelintrc",
  formatter: "string",
  files: "./app/assets/styles/**/*.css"
}).then(function (data) {
  console.log(data.output);
  process.nextTick(function () {
    process.exit(2);
  });
}).catch(function (err) {
  console.error(err.stack);
});
