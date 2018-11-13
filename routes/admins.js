const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('../config/config');
const Admin = require('../models/admin');
const Report = require('../models/reports');
const User = require('../models/users');

router.post('/login', (req, res, next)=>{
    const username= req.body.username;
    const password = req.body.password;

    Admin.getUserByName(username, (err, user)=>{
        if(err)return err;
        if(!user){
            return res.json({success: false, msg:'User not found'});
        }

        Admin.comparePassword(password, user.password, (err, isMatch)=>{ 
            if(err) return err;
            if(isMatch){
                const token= jwt.sign(user.name, config.secret);

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        username: user.username,
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                });
                //res.json({success: true, msg:'password match'})
            }else{
                return res.json({success: false, msg:'password wrong'});
            }
        });

    });
});

router.post('/signup', (req, res, next)=>{
    let newUser = new Admin({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    Admin.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success: false, msg: 'fail'});
        }else{
            res.json({success: true, msg:"added user success"});
        }
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req,res,next)=>{

});

router.post('/profile',  (req,res,next)=>{
    let newReport = new Report({
        title: req.body.title,
        category: req.body.category,
        body: req.body.body,
        author: req.body.author
    });

    Report.addReport(newReport, (err, user) =>{
        if(err){
            res.json({success: false, msg: 'fail'});
        }else{
            res.json({success: true, msg:"added report success"});
        }
    });
});

module.exports= router;
