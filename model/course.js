const mongoose = require("mongoose");



const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Please provide course title'],
        unique: [true, 'Can not Create a Course with the same title'],
        minlength: 1
    },
    description: {
        type: String,
        required: [true, 'Please provide course description'],
        // minlength: 50
    },
    price: {
        type: Number,
        
    },
    photo: {
        type: String,
        // required: [true, 'Please provide course photo']
    }
})

module.exports = mongoose.model('Course', courseSchema)