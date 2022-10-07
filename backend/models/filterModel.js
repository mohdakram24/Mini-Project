const { Schema, model, Types } = require("../connection");



const myschema=new Schema({
    title: String,
    image: String,
    filter: Array,
    user: {type : Types.ObjectId, ref: 'usersCollection'},
    createdAt: Date

});

module.exports=model('filterCollection',myschema);