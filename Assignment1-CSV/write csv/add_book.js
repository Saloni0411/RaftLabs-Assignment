const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'newbook.csv',
    header: [
        {id: 'title', title: 'title'},
        {id: 'isbn', title: 'isbn'},
        {id: 'authors', title: 'authors'},
        {id: 'description', title: 'description'}
    ]
});
 
const records = [
    {title: 'Provide Insight',  isbn: '5145-8548-4325', authors: 'null-william@echocat.org', description: 'Detailed descriptive copy that is good for public display, used for your book marketing, book discovery, and for sales purposes'},
];
 
csvWriter.writeRecords(records)       
    .then(() => {
        console.log('...Done');
    });