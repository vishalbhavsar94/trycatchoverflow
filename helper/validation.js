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
    validate,
  }  