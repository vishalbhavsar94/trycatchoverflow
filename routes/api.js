const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check,validationResult} = require('express-validator');
const user = require('../model/users');
const type = require('../model/type');
const key = require('../config/keys');
const {profileNameValidation,profilelNameValidation,
        profileEmailValidation,validate} = require('../helper/validation');
const router = express.Router();
const multer = require('multer');
//set multer for file uploading
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null,'/public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
var upload = multer({ storage: storage }).single('file')

router.get('/',function(req,res){
        res.send('Api Working');
});

router.get('/register',function(req,res){
        res.send('Register working');
})
router.get('/profile/username',function(req,res){
    res.send('profile working');
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
                           const token = genrateToken(user);
                           res.json({
                            success:true,
                            token: "Bearer"+token
                        });
                     }
                 })
             }           
        })
    }
})
genrateToken = (data) =>{
    var token='';
    const payload = {
                id:data._id,
                name:data.name,
                lname:data.lname,
                email:data.email,
                typeid:data.typeid
            };

           token = jwt.sign(
                payload,
                key.secretOrKey
            );

         return token;
           
}
router.post('/profile/name',profileNameValidation(),validate,function(req,res){ 
    const where = {_id:req.body.id}
    const value = {$set:{name:req.body.firstname}}
    user.updateOne(where,value, function(err,response){
        if(err){
            res.status(422).json(err)
        }else{
            user.findOne({_id:req.body.id}).then(user =>{
                const token = genrateToken(user);
                res.status(200).json({success:true,token: "Bearer"+token})
            })
        }
    })
})
router.post('/profile/lname',profilelNameValidation(),validate,function(req,res){ 
    const where = {_id:req.body.id}
    const value = {$set:{lname:req.body.lastname}}
    user.updateOne(where,value, function(err,response){
        if(err){
            res.status(422).json(err)
        }else{
            user.findOne({_id:req.body.id}).then(user =>{
                const token = genrateToken(user);
                res.status(200).json({success:true,token: "Bearer"+token})
            })
        }
    })
})
router.post('/profile/email',profileEmailValidation(),validate,function(req,res){ 
    const where = {_id:req.body.id}
    const value = {$set:{email:req.body.email}}
    user.updateOne(where,value, function(err,response){
        if(err){
            res.status(422).json(err)
        }else{
            user.findOne({_id:req.body.id}).then(user =>{
                const token = genrateToken(user);
                res.status(200).json({success:true,token: "Bearer"+token})
            })
        }
    })
})
router.post('/profile/upload',function(req,res){
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
   return res.status(200).send(req.file)
 })
})
module.exports = router;
