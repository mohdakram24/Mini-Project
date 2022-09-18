const { Schema, model } = require("../connection");



const myschema=new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String

});

module.exports=model('usersCollection',myschema);