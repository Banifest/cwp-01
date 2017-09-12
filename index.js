const fs = require("fs");
const path = require("path")

let name = process.argv[2];

let file = fs.writeFileSync(`${name}/summary.js`,'a');

console.log(

    fs.readdir(name, (err, files) => {
        files.forEach(file => {
            console.log(file);
            let str = name + '/' + file;
            fs.stat(str, function(err, stats){
                if(stats.isDirectory())
                {
                    fs.readdir(str, function (err, deepFiles) {
                        deepFiles.forEach(deepFile => {
                            console.log(file + '/' + deepFile);
                        })
                    })
                }
            })
        });
    })
);