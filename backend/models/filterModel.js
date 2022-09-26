const { Schema, model } = require("../connection");



const myschema=new Schema({
    title: String,
    image: String,
    user: String,
    createdAt: Date

});

module.exports=model('filterCollection',myschema);