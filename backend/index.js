// Importing express
const express=require('express');
const userRouter=require('./routers/userRouter');

// CORS is a node.js package for providing a Connect/Express middleware
// that can be used to enable CORS with various options.

const cors=require('cors');
const filterModel = require('./models/filterModel');


// Initialing express
const app=express();

// Providing port name
const port=7000;


// This will parse JSON data to javascript
app.use(express.json());
app.use(cors({
    origin : ['http://localhost:3000']
}))

// Middleware
app.use('/user',userRouter);
app.use('/filter',filterModel);

app.get("/",(req,res)=>{
    res.send("Express has started");
})

app.listen(port,()=>{
    console.log("server has started");
});


