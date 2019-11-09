const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check,validationResult} = require('express-validator');
const user = require('../model/users');
const type = require('../model/type');
const key = require('../config/keys');
//const ValidateRegister = require('../helper/validation');
const router = express.Router();

router.get('/',function(req,res){
        res.send('Api Working');
});

router.get('/register',function(req,res){
        res.send('Register working');
})
//get user types
router.get('/userType',function(req,res){
    type.find().then(type =>    
        {res.status(200).json(type)}    
    )
})

//register user
router.post('/register',[
    check('firstname').not().isEmpty().withMessage('Name is Required'),
    check('lastname').not().isEmpty().withMessage('LastName is Required'),
    check('email').isEmail().withMessage('Enter Valid Email'),
    check('password').not().isEmpty().withMessage('Password Fild Required'),
    check('passwordConf').not().isEmpty().custom((value, { req }) => value === req.body.password).withMessage('Password Not Match'),
    check('type').not().isEmpty().withMessage('Select UserType')
],function(req,res){
    
    //validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
           {res.status(422).json(errors)};
        }else{
            
            user.findOne({email:req.body.email}).then(users =>{
                if(users){
                    return res.status(422).json({msg:"User Alredy Registered...!",param:"err"})
                }else{

                    const newUser = new user({
                        name:req.body.firstname,
                        lname:req.body.lastname,
                        email:req.body.email,
                        password:req.body.password,
                        typeid:req.body.type
                    });
        
                    bcrypt.genSalt(10,(err,salt)=>{
                            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                                newUser.password = hash;
                                newUser.save()
                                .then(user => {
                                    //console.log(user);
                                   return res.status(200).json(user);
                                })
                                .catch(err => {
                                   // console.log(err);
                                  return res.status(422).json(err);
                                })
                            })
                        }
                    )
                }
            })
           
        }
})

router.post('/login',[
    check('email').isEmail().withMessage('Enter Valid Email-ID'),
    check('password').not().isEmpty().withMessage('Password Fild Required')
],function(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
            return res.status(422).json(errors)
    }else{
        const email = req.body.email;
        const password = req.body.password;
        user.findOne({email:email}).then(user =>{
             if(!user){
                 return res.status(422).json({msg:"Userid or Password Not Match",param:"err"})
             }else{
                 bcrypt.compare(password,user.password).then(isMatch => {
                     if(!isMatch){
                            return res.status(422).json({msg:'Userid or Password Not Match',param:'err'})
                     }else{
                            const payload = {
                                id:user._id,
                                name:user.name,
                                lname:user.lname,
                                email:user.email,
                                typeid:user.typeid
                            };

                            jwt.sign(
                                payload,
                                key.secretOrKey,
                                (err,token)=>{
                                    res.json({
                                        success:true,
                                        token: "Bearer"+token
                                    });
                                }
                            );
                     }
                 })
             }           
        })
    }
})
module.exports = router;
