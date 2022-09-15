const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'newmagazine.csv',
    header: [
        {id: 'title', title: 'title'},
        {id: 'isbn', title: 'isbn'},
        {id: 'authors', title: 'authors'},
        {id: 'publishedAt', title: 'publishedAt'}
    ]
});
 
const records = [
    {title: 'Provide Insight',  isbn: '5145-8548-4325', authors: 'null-william@echocat.org', publishedAt: '15.09.2022'},
];
 
csvWriter.writeRecords(records)       
    .then(() => {
        console.log('...Done');
    });