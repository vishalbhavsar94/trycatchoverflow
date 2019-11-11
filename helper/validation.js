const {body,validationResult} = require('express-validator');
const profileNameValidation = () => {
    return [ 
        body('firstname').not().isEmpty().withMessage('name Require')
    ]
  }
  const profilelNameValidation = () => {
    return [ 
        body('lastname').not().isEmpty().withMessage('lastname Require')
    ]
  }
  const profileEmailValidation = () => {
    return [ 
        body('email').isEmail().withMessage('Enter Valid Email')
    ]
  }
  const registerValidationRules =() => {
      return [
        body('firstname').not().isEmpty().withMessage('Name is Required'),
        body('lastname').not().isEmpty().withMessage('LastName is Required'),
        body('email').isEmail().withMessage('Enter Valid Email'),
        body('password').not().isEmpty().withMessage('Password Fild Required'),
        body('passwordConf').not().isEmpty().custom((value, { req }) => value === req.body.password).withMessage('Password Not Match'),
        body('type').not().isEmpty().withMessage('Select UserType')
    ]
  }
  const loginValidationRules =() => {
    return [
      body('email').isEmail().withMessage('Enter Valid Email-ID'),
      body('password').not().isEmpty().withMessage('Password Fild Required')
    ]
  }
  const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ param: err.param ,msg:err.msg}))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
  }
  module.exports = {
    profileNameValidation,
    profilelNameValidation,
    profileEmailValidation,
    registerValidationRules,
    loginValidationRules,
    validate,
  }  