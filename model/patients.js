const mongoose = require("mongoose");
const validator = require('validator')


const patientSchema = new mongoose.Schema({
    cardID:{
type: Number,
required: [true, 'please provide a Card ID'],
unique: [true, 'the Card ID is allready in the System']
    },
    firstname: {
        type:String,
        required: [true, 'please provide First Name']
    },
    middlename: {
        type:String,
        required:[true, 'please provide Middle Name']
    },
    lastname:{
        type:String,
        required: [true, 'please provide Last Name']
    },
    age:{
        type: Number,
        required: [true, 'please provide Age']
    },
    email: {
        type: String,
        validate: [validator.isEmail, 'please provide a valid Email Address']
    },
    phone: {
        type: Number,
        required: [true, 'please provide a Phone Number']
    },
    Address:{
        type: String,
        required:[true, 'please provide Address']
    }


})

module.exports = mongoose.model('Patients', patientSchema)