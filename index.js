const express = require('express')
const path = require("path")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

const app = express()
dotenv.config()
const PORT = process.env.PORT || 4000


app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname,"public","try.html"))
    res.json({ message: "Hello World" })
})


app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is up and running on port ${PORT}`)
        mongoose.connect(process.env.DB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
            .then(() => console.log("Db connected successfully"))
            .catch((err) => console.log("Some error occured while connecting with DB:", err))
    }
})