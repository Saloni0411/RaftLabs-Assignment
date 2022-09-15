const authorModel = require('../Models/authorModel')

////////////////// -Create Author- /////////////////////

const createAuthor = async(req, res) => {
    try {

        let data = req.body;

        const { firstname, lastname, email } = data;
        const emailValidator = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/

        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Body is required" })
        }
        if (!isValid(firstname)) {
            return res.status(400).send({ status: false, message: "firstname is required" })
        }
        if (!isValid(lastname)) {
            return res.status(400).send({ status: false, message: "lastname is required" })
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Email is required" })
        }

        if (!emailValidator.test(email)) {
            return res.status(400).send({ status: false, message: "Please enter a valid Email" });
        }

        const isRegisteredEmail = await authorModel.findOne({ authors })
        if (isRegisteredEmail) {
            return res.status(400).send({ status: false, message: "Author's Email already Exists" });
        }

        const createAuthor = await authorModel.create(data)

        return res.status(201).send({ status: true, message: "Author has been created successfully!", data: createAuthor })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}

module.exports = { createAuthor }