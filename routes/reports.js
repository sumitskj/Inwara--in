const express = require('express');
const router = express.Router();
const report = require('../models/reports');

router.get('/', (req, res, next)=>{
    console.log(req.query);
    const query = req.query;
    report.findOne(query, (err, content)=> {
        if(err) {
            res.json(err);
        } else {
            res.json(content);
        }
    })
});

module.exports= router;
