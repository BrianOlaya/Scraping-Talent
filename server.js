const app = require("./src/app");

async function main() {
  await app.listen(app.set('port'));
  console.log("server on port", app.get('port'));
}

main();
