const csv = require('csv-parser')
const fs = require('fs')
const result = [];
const result1 = [];
const result2 = [];

fs.createReadStream('authors.csv').pipe(csv({}))
.on('data', (data) => result.push(data))
.on('end', () => {console.log(result);
});



fs.createReadStream('books.csv').pipe(csv({}))
.on('data', (data) => result1.push(data))
.on('end', () => {console.log(result1);
});


fs.createReadStream('magazines.csv').pipe(csv({}))
.on('data', (data) => result2.push(data))
.on('end', () => {console.log(result2);
});