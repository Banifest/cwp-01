const fs = require("fs");
const path = require("path");

let name = process.argv[2];

let lastDir = path.normalize(name).split('\\').pop();

if (name != undefined){

    fs.stat(name, function(err, stats) {
        if (err || !(stats.isDirectory())) {
            console.error("Неверный путь!");
        }
    });
} else {
    console.error("Не указан путь к папке");
}

fs.writeFile(`${name}/summary.js`,'const fs = require("fs");\n' +
    'const path = require("path");\n' +
    '\n' +
    `let name = \'../${lastDir}\';\n` +
    `let lastDir = \'${lastDir}\';\n` +
    '\n' +
    'fs.mkdir(`${lastDir}`, () => {});\n' +
    'fs.readdir(name, (err, files) => {\n' +
    '    for (const file of files) {\n' +
    '        if (file !== `${lastDir}`) {\n' +
    '            console.log(file);\n' +
    '            let str = `${name}/${file}`;\n' +
    '            fs.stat(str, function (err, stats) {\n' +
    '                if (stats.isDirectory()) {\n' +
    '                    fs.readdir(str, function (err, deepFiles) {\n' +
    '                        for (const deepFile of deepFiles) {\n' +
    '                            console.log(file + \'/\' + deepFile);\n' +
    '                            fs.stat(`${str}/${deepFile}`, (err, deepStats) => {\n' +
    '                                if (deepStats.isFile() && deepFile.length >= 4 && deepFile.indexOf(\'.txt\') !== -1) {\n' +
    '                                    fs.readFile(\'C:\\\\Users\\\\banif\\\\WebstormProjects\\\\cwp-01\\\\config.json\', (err, strLast) => {\n' +
    '                                        fs.readFile(`${str}/${deepFile}`, (err, deepStr) => {\n' +
    '                                            fs.writeFile(`${name}/${lastDir}/${deepFile}`, `${strLast.toString()}\n' +
    '                                        ${deepStr.toString()}${strLast.toString()}`, () => {\n' +
    '                                            });\n' +
    '                                        })\n' +
    '                                    })\n' +
    '                                }\n' +
    '                            });\n' +
    '                        }\n' +
    '                    })\n' +
    '                }\n' +
    '                else if (file.length >= 4 && file.indexOf(\'.txt\') !== -1) {\n' +
    '                    fs.readFile(\'C:\\\\Users\\\\banif\\\\WebstormProjects\\\\cwp-01\\\\config.json\', (err, strLast) => {\n' +
    '                        fs.readFile(`${name}/${file}`, (err, deepStr) => {\n' +
    '                            fs.writeFile(`${name}/${lastDir}/${file}`, `${strLast.toString()}${deepStr.toString()}${strLast.toString()}`, () => {\n' +
    '                            });\n' +
    '                        })\n' +
    '                    })\n' +
    '                }\n' +
    '            })\n' +
    '        }\n' +
    '    }\n' +
    '    fs.watch(`${name}/${lastDir}`, {encoding: \'buffer\'}, (eventType, filename) => {\n' +
    '        if (filename) { console.log(filename.toString()); }\n' +
    '    });\n' +
    '});'
    , (error)=> {
        if (error)
            console.error("Ошибка создания файла!");
    });