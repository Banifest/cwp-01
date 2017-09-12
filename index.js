const fs = require("fs");
const path = require("path");

let name = process.argv[2];

let lastDir = path.normalize(name).split('\\').pop();

let file = fs.writeFile(`${name}/summary.js`,'','',function (err) {
    fs.mkdir(`${name}/${lastDir}`, () => {});
    fs.readdir(name, (err, files) => {
        files.forEach(file => {
            console.log(file);
            let str = `${name}/${file}`;
            fs.stat(str, function(err, stats){
                if(stats.isDirectory())
                {
                    fs.readdir(str, function (err, deepFiles) {
                        deepFiles.forEach(deepFile => {
                            console.log(file + '/' + deepFile);
                            fs.stat(`${str}/${deepFile}`, (err, deepStats) => {
                                if (deepStats.isFile() && deepFile.length >= 4 && deepFile.indexOf('.txt') !== -1) {

                                }
                            })
                        })
                    })
                }
                else if (file.length >= 4 && file.indexOf('.txt') !== -1) {
                    fs.readFile(`${name}/${file}`, (err, deepStr) => {
                        fs.writeFile(`${name}/${lastDir}/${file}`, `${deepStr.toString()}`, () => {
                        });
                    })
                }
            })
        });
    })
    fs.readFile('config.json', (err, str) => {
       console.log(str.toString());
        fs.readdir(`${name}/${lastDir}`, (err, files) => {
            files.forEach(file => {
                fs.readFile(`${name}/${lastDir}/${file}`, (err, deepStr) => {
                    fs.writeFile(`${name}/${lastDir}/${file}`, `${str.toString()}${deepStr.toString()}${str.toString()}`, () => {});
                });
            })
        })
    });
});