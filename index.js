const fs = require("fs");
const path = require("path");

let name = process.argv[2];

let lastDir = path.normalize(name).split('\\').pop();

/*

if (pathDirectory != undefined){

    fs.stat(pathDirectory, function(err, stats) {

        if (err || !(stats.isDirectory())) {
            console.error("Неверный путь!");
        }
        else {

            fs.writeFile(pathDirectory + '\\summary.js', stringScript, function(error){
                if (error)
                    console.error("Ошибка создания файла!");
            });

            console.log('node ' + pathDirectory + '\\summary.js');
    }
    });
} else {
    console.error("Введите путь к файлу!");
}
 */

let file = fs.writeFile(`${name}/summary.js`,function (err,
                                                       ) {
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
    });
    fs.readFile('config.json', (err, str) => {
        fs.readdir(`${name}/${lastDir}`, (err, files) => {
            files.forEach(file => {
                fs.readFile(`${name}/${lastDir}/${file}`, (err, deepStr) => {
                    fs.writeFile(`${name}/${lastDir}/${file}`, `${str.toString()}${deepStr.toString()}${str.toString()}`, () => {});
                });
            })
        })
    });
    let filesArrInfo = [];
    fs.readdir(`${name}/${lastDir}`, (err, files) =>{
        files.forEach(file => {
            fs.readFile(`${name}/${lastDir}/${file}`, (err, info) => {
                filesArrInfo.append(info);
            })
        })
    });
    while (true) {
        fs.readdir(`${name}/${lastDir}`, (err, files) =>{
            let iter = 0;
            files.forEach(file => {
                fs.readFile(`${name}/${lastDir}/${file}`, (err, info) => {
                    if(filesArrInfo[iter] != info)
                    {
                        console.log(`changed file - ${file}`);
                        filesArrInfo[iter] = info;
                    }
                    iter++;
                })
            })
        })
    }
});