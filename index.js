const fs = require("fs");
const path = require("path");

let name = process.argv[2];

let lastDir = path.normalize(name).split('\\').pop();

let file = fs.writeFile(`${name}/summary.js`,'','',function (err) {
    fs.mkdir(`${name}/${lastDir}`, () => {});
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
                            fs.stat(`${str}/${deepFile}`, (err, deepStats) => {
                                if(deepStats.isFile())
                                {
                                    if (deepFile.length >= 4 && deepFile.indexOf('.txt') != -1) {
                                        console.log(deepFile);
                                        fs.createReadStream(`${name}/${file}/${deepFile}`)
                                            .pipe(fs.createWriteStream(`${name}/${lastDir}/${deepFile}`));
                                    }
                                }
                            })
                        })
                    })
                }
                else
                {
                    if (file.length >= 4 && file.indexOf('.txt') != -1) {
                        console.log(file);
                        fs.createReadStream(`${name}/${file}`).pipe(fs.createWriteStream(`${name}/${lastDir}/${file}`));
                    }
                }
            })
        });
    })
});