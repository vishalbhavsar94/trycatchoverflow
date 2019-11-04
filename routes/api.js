const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check,validationResult} = require('express-validator');
const user = require('../model/users');
const key = require('../config/keys');
const router = express.Router();

router.get('/',function(req,res){
        res.send('Api Working');
});

router.get('/register',function(req,res){
        res.send('Register working');
})
//register user
router.post('/register',[
    check('name').not().isEmpty().withMessage('Name is Required'),
    check('email').isEmail().withMessage('Enter Valid Email'),
    check('pass1').not().isEmpty().withMessage('Password Fild Required'),
    check('pass2').not().isEmpty().custom((value, { req }) => value === req.body.pass1).withMessage('Password Not Match')
],function(req,res){

    //validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
           res.status(422).json({errors:errors});
        }else{
            
            user.findOne({email:req.body.email}).then(user =>{
                if(user){
                    return res.status(422).json({msg:"User Alredy Registered...!",param:"err"})
                }else{

                    const newUser = new user({
                        name:req.body.name,
                        email:req.body.email,
                        password:req.body.pass1
                    });
        
                    bcrypt.genSalt(10,(err,salt)=>{
                            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                                newUser.password = hash;
                                newUser.save()
                                .then(user => {
                                    console.log(user);
                                   return res.status(200).json(user);
                                })
                                .catch(err => {
                                    console.log(err);
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
            return res.status(422).json({errors:errors})
    }else{
        const email = req.body.email;
        const password = req.body.password;
        user.findOne({email:email}).then(user =>{
             if(!user){
                 return res.status(422).json({msg:"password Not Match",param:"err"})
             }else{
                 bcrypt.compare(password,user.password).then(isMatch => {
                     if(!isMatch){
                            return res.status(422).json({msg:'Password Not Match',param:'err'})
                     }else{
                            const payload = {
                                id:user.id,
                                name:user.name,
                                email:user.email
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
