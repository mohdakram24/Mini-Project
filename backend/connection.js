const mongoose = require('mongoose');

const databaseName="akram"
const url=`mongodb+srv://mohdakram24:areebkhan@cluster0.xzyije3.mongodb.net/${databaseName}?retryWrites=true&w=majority`

mongoose.connect(url)
.then((result) => {
    console.log('connect to database');
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;