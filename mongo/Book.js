const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const consts = require('../config.js').consts;

mongoose.connect(consts.MLAB_CONNECTION,function(err){
  console.log("mLab connected succsfully");
});

var BookSchema = new Schema({
  _id: {type: String, required: true},
  bookName: String,
  bookAuthor: String,
  pages: Number,
  trans: [{
      lang: String,
      translator: String
  }]
},{collection: 'books'})

module.exports = mongoose.model('books',BookSchema);
