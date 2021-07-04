const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema({
    writer: {
        type:String,
        maxlength:50
    },
    bookmark: {
        type:String
    }
    
})


const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = { Bookmark }