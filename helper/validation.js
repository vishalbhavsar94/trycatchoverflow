const {check,validationResult} = require('express-validator');
const  ValidateRegister=()=>{
    [
        check('firstname').not().isEmpty().withMessage('Name is Required'),
        check('lastname').not().isEmpty().withMessage('LastName is Required'),
        check('email').isEmail().withMessage('Enter Valid Email'),
        check('password').not().isEmpty().withMessage('Password Fild Required'),
        check('passwordConf').not().isEmpty().custom((value, { req }) => value === req.body.password).withMessage('Password Not Match'),
        check('type').not().isEmpty().withMessage('Select UserType')
    ]
}

module.exports = ValidateRegister