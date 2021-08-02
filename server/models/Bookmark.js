const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookmarkSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        maxlength:50,
        ref: 'User'
    },
    bookmark: {
        type:String
    },
    title: {
        type:String,
        maxlength:50
    }, 
    description: {
        type:String
    }
    
}, {timestamps: true})


const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = { Bookmark }