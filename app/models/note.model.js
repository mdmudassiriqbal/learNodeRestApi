const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});



const UserSchema = mongoose.Schema({
    first_name : String,
    last_name : String,
    name: String,
    email: String,
    password : String,
    phone : Number,
    status : Number

}, {
    timestamps: true
});
const user = mongoose.model('User', UserSchema);
const note = mongoose.model('Note', NoteSchema);
  module.exports = {
      user : user,
      note : note
  } ;


