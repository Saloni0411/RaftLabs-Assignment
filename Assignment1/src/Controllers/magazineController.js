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

const createMagazine = async(req, res) => {
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

        let isRegisteredISBN = await magazineModel.findOne({ isbn })

        if (isRegisteredISBN) {
            return res.status(404).send({ status: false, message: "ISBN No. is already registered" });
        }
        if (!isValid(authors)) {
            return res.status(400).send({ status: false, message: "Authors is required" })
        }

        if (!emailValidator.test(authors)) {
            return res.status(400).send({ status: false, message: "Please enter a valid Email" });
        }

        const isRegisteredEmail = await magazineModel.findOne({ authors })
        if (isRegisteredEmail) {
            return res.status(400).send({ status: false, message: "Author's Email already Exists" });
        }

        if (!isValid(description)) {
            return res.status(400).send({ status: false, message: "Description is required" })
        }
        const createMagazine = await magazineModel.create(data)

        return res.status(201).send({ status: true, message: "Your magazine has been created successfully!", data: createMagazine })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}


////////////////// GET MAGAZINE BY ISBN //////////////////////////

const getMagazineByISBN = async(req, res) => {
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

        let isRegisteredISBN = await magazineModel.findOne({ isbn })

        if (!isRegisteredISBN) {
            return res.status(404).send({ status: false, message: "Magazine with ISBN No.does not Exists" });
        }

        let findMagzine = await magazineModel.find(data)

        return res.status(200).send({ status: true, message: "Your magazine has found successfully!", data: findMagzine })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}

////////////////// GET magazine BY EMAIL //////////////////////////

const getMagazineByAuthorEmail = async(req, res) => {
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

        const isRegisteredEmail = await magazineModel.findOne({ authors })
        if (!isRegisteredEmail) {
            return res.status(400).send({ status: false, message: "Magazine with this Author's Email does not Exists" });
        }
        let findMagazine = await magazineModel.find(data)

        return res.status(200).send({ status: true, message: "Your Magazine has found successfully!", data: findMagazine })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}


module.exports = { createMagazine, getMagazineByISBN, getMagazineByAuthorEmail }