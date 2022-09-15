const express = require('express')
const route = express.Router()
const authorController = require('../Controllers/authorController')
const bookController = require('../Controllers/bookController')
const magazineController = require('../Controllers/magazineController')

//////////////////////// - AUTHOR- /////////////////////////
route.post('/create-author', authorController.createAuthor)

//////////////////////// - BOOK- /////////////////////////
route.post('/create-book', bookController.createBook)
route.post('/getBookByISBN', bookController.getBookByISBN)
route.post('/getBookByAuthorEmail', bookController.getBookByAuthorEmail)


//////////////////////// - MAGAZINE- /////////////////////////
route.post('/create-magazine', magazineController.createMagazine)
route.post('/getMagazineByISBN', magazineController.getMagazineByISBN)
route.post('/getMagazineByAuthorEmail', magazineController.getMagazineByAuthorEmail)

//////////////////////// -BOOKS AND MAGAZINES- /////////////////////////
route.get('/sortBookMagazineByTitle', bookController.sortBookMagazineByTitle)




module.exports = route