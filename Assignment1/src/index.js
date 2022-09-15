const express = require('express')
const route = require('./Route/route.js')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://FunctionUp-Uranium:qmseBYMLCGiI917G@cluster0.je95k.mongodb.net/RaftLabs", {
    useNewUrlParser: true
}).then(()=> console.log("Mongodb is connected")).catch((err)=> console.log(err))

app.use('/', route);

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})

