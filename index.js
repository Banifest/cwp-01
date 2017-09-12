console.log('Hello World');

const name = process.argv[2];

console.log(`Hi ${name}!`);

for(let i = 2; i<process.argv.length; i++)
{
    console.log(` ${process.argv[i]} `);
}