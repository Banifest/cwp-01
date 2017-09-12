const fs = require("fs");
const path = require("path")

let name = process.argv[2];

let file = fs.writeFileSync(`${name}/summary.js`);

console.log(
    fs.readdir(name, (err, files) => {
        files.forEach(file => {
            console.log(file);
        });
    })
);