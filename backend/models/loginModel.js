const { Schema, model } = require("../connection");

const myschema=new Schema({
    email: String,
    password: String
});

module.exports=model('loginCollections',myschema);