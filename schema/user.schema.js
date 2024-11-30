const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        required: true
    }
})

const userSchemaModel = mongoose.model("User", userSchema)

module.exports = userSchemaModel