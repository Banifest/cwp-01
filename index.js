const fs = require("fs");

let name = process.argv[2];

let file = fs.writeFileSync(`${name}/summary.js`);

