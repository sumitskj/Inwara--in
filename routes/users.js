const express = require('express');
const router = express.Router();
const Customer = require('../models/users');

router.post('/', (req, res, next)=>{
    let newUser = new Customer({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });

    Customer.addCustomer(newUser, (err, user) =>{
        if(err){
            res.json({success: false, msg: 'fail'});
        }else{
            res.json({success: true, msg:"added user success"});
        }
    });
});

module.exports= router;
