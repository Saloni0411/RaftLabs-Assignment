const bookModel = require("../Models/bookModel")
const magazineModel = require("../Models/magazineModel")

//========================================VALIDATION FUNCTIONS==========================================================

const isValid = function(value) {
    if (!value || typeof value != "string" || value.trim().length == 0) return false;
    return true;
}

const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}

////////////////// CREATE BOOK //////////////////////////

const createBook = async(req, res) => {
    try {

        let data = req.body;
        const { title, isbn, authors, description } = data;

        const ISBN_ValidatorRegEx = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
        const emailValidator = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/

        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Body is required" })
        }
        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: "Title is required" })
        }
        if (!isValid(isbn)) {
            return res.status(400).send({ status: false, message: "ISBN is required" })
        }

        if (ISBN_ValidatorRegEx.test(isbn)) {
            return res.status(400).send({ status: false, message: "Please enter a valid 13 digit ISBN No." });
        }

        let isRegisteredISBN = await bookModel.findOne({ isbn })

        if (isRegisteredISBN) {
            return res.status(404).send({ status: false, message: "ISBN No. is already registered" });
        }
        if (!isValid(authors)) {
            return res.status(400).send({ status: false, message: "Authors is required" })
        }

        if (!emailValidator.test(authors)) {
            return res.status(400).send({ status: false, message: "Please enter a valid Email" });
        }

        const isRegisteredEmail = await bookModel.findOne({ authors })
        if (isRegisteredEmail) {
            return res.status(400).send({ status: false, message: "Author's Email already Exists" });
        }

        if (!isValid(description)) {
            return res.status(400).send({ status: false, message: "Description is required" })
        }
        const createBook = await bookModel.create(data)

        return res.status(201).send({ status: true, message: "Your book has been created successfully!", data: createBook })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}

////////////////// GET BOOK BY ISBN //////////////////////////

const getBookByISBN = async(req, res) => {
    try {

        let data = req.body;
        let { isbn } = data

        const ISBN_ValidatorRegEx = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;

        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Body is required" })
        }
        if (!isValid(isbn)) {
            return res.status(400).send({ status: false, message: "ISBN is required..." })
        }

        if (ISBN_ValidatorRegEx.test(isbn)) {
            return res.status(400).send({ status: false, message: "Please enter a valid 13 digit ISBN No." });
        }

        let isRegisteredISBN = await bookModel.findOne({ isbn })

        if (!isRegisteredISBN) {
            return res.status(404).send({ status: false, message: "Book with ISBN No.does not Exists" });
        }

        let findBook = await bookModel.find(data)
            // let specific = await restaurantModel.find({ borough: 'Bronx', $or: [{ 'cuisine': 'Bakery' }, { 'cuisine': 'Cake' }] })

        return res.status(200).send({ status: true, message: "Your book has found successfully!", data: findBook })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}


////////////////// GET BOOK BY EMAIL //////////////////////////

const getBookByAuthorEmail = async(req, res) => {
    try {

        let data = req.body;
        let { authors } = data

        const emailValidator = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/

        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Body is required" })
        }
        if (!isValid(authors)) {
            return res.status(400).send({ status: false, message: "Email is required" })
        }

        if (!emailValidator.test(authors)) {
            return res.status(400).send({ status: false, message: "Please enter a valid Email" });
        }

        const isRegisteredEmail = await bookModel.findOne({ authors })
        if (!isRegisteredEmail) {
            return res.status(400).send({ status: false, message: "Book with this Author's Email does not Exists" });
        }
        let findBook = await bookModel.find(data)

        return res.status(200).send({ status: true, message: "Your book has found successfully!", data: findBook })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}

////////////////// SORT BOOK AND MAGAZINE BY TITLE  //////////////////////////

const sortBookMagazineByTitle = async(req, res) => {
    try {
        const getAllBook = await bookModel.find().sort({ title: 1 })

        const getAllMagazine = await magazineModel.find().sort({ title: 1 })

        const getAllBooksMagazine = {
            books: getAllBook,
            magazine: getAllMagazine
        };
        res.status(200).send({ status: true, data: getAllBooksMagazine });


    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}


module.exports = { createBook, getBookByISBN, getBookByAuthorEmail, sortBookMagazineByTitle }