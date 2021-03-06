const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../config/keys');
const {profileNameValidation,profilelNameValidation,
        profileEmailValidation,registerValidationRules,
        loginValidationRules,validateQustionRules,
        valdiateAnswerRules,validateCommentRules,validate} = require('../helper/validation');
const router = express.Router();
const multer = require('multer');
//Model Require
const user = require('../model/users');
const type = require('../model/type');
const question = require('../model/question');
const answer = require('../model/answer');
const comments = require('../model/comments')

//set multer for file uploading
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null,'public/profile')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
var upload = multer({ storage: storage }).single('file')

router.get('/',function(req,res){
        res.send('Api Working');
});

//get user types
router.get('/userType',function(req,res){
    type.find().then(type =>    
        {res.status(200).json(type)}    
    )
})

//register user
router.post('/register',registerValidationRules(),validate,function(req,res){
             
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
})

router.post('/login',loginValidationRules(),validate,function(req,res){
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
})
genrateToken = (data) =>{
    var token='';
    const payload = {
                id:data._id,
                name:data.name,
                lname:data.lname,
                email:data.email,
                typeid:data.typeid,
                profile:data.profile
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
        const where = {_id:req.body.id}
        const filename = 'public/profile/'+req.file.filename;
        const value = {$set:{profile:filename}}
        user.updateOne(where,value,function(err,response){
            if(err){
                    res.status(422).json(err);
            }else{
                user.findOne({_id:req.body.id}).then(user =>{
                    const token = genrateToken(user);
                    res.status(200).json({success:true,token: "Bearer"+token})
                })
            }

        })
        
    })
})
router.post('/question',validateQustionRules(),validate,function(req,res){
       const newQuestion = new question({
           userid:req.body.id,
           question:req.body.Question,
           questionDesc:req.body.Editor,
           view:0,
       })
       newQuestion.save().then(question => {
                res.status(200).json(question);
            }
       )
})
router.get('/question/:id',function(req,res){
    question.find({userid:req.params.id}).then(question =>{
        res.status(200).json(question);
    })
})
router.get('/topquestions',function(req,res){
    question.find({},'question _id date').then(qtn => {res.status(200).json(qtn)})
})
router.get('/questiondetails/:id',function(req,res){
    const id = req.params.id
    question.findOne({_id:id}).then(qtn => {
        res.status(200).json(qtn);
    })
})
router.get('/questiondetails/answers/:id',function(req,res){
    const qtnid = req.params.id;
    answer.find({questionid:qtnid}).then(answer => {
            res.status(200).json(answer)
    })
})
router.get('/questiondetails/comments/:id',function(req,res){
    const qtnid = req.params.id;
    comments.find({questionid:qtnid}).then(comments => {
            res.status(200).json(comments)
    })
})
router.post('/questiondetails/answers',valdiateAnswerRules(),validate,function(req,res){
    const newAnswer = new answer({
        answer:req.body.answer,
        questionid:req.body.qtnid,
        userid:req.body.userid
    })
        newAnswer.save()
        .then(answer => { 
            return res.status(200).json(answer)
        })
        .catch(err => {
            return res.status(422).json(err)
        })
        
})
router.post('/questiondetails/comments',validateCommentRules(),validate,function(req,res){
    const newComment = new comments({
        comment:req.body.comment,
        questionid:req.body.qtnid,
        userid:req.body.userid,
        username:req.body.username
    })
    newComment.save()
    .then(comment =>{
        return res.status(200).json(comment)
    })
    .catch(error => {
        return res.status(422).json(error)
    })
})
module.exports = router;
