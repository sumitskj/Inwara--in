const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.send(index);//Serves the index.html file from dist folder
});

module.exports= router;
