const express = require('express');
const router = express.Router();
const Model=require('../models/filterModel'); 

router.post("/add", (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
    .then((result) => {
        console.log(result);
        res.json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        
    });
})

router.get("/getall", (req, res) => {
    console.log(req.body);

    Model.find({})
    .then((result) => {
        console.log(result);
        res.json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.get("/getbyuser/:userid", (req, res) => {
    

    Model.find({user : req.params.userid})
    .then((result) => {
        console.log(result);
        res.json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;