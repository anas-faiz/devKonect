const validator = require('validator');


function validSignUpData (req){
    const {email,password,firstName,lastName} = req.body;
    if(!firstName || !lastName){
        throw new Error ("name is not given")
    }
    else if(!validator.isEmail(email)){
        throw new Error ("Not a valid Email : "+email)
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error ("enter a strong password : weak password "+ password)
    }
            
}

module.exports = {
    validSignUpData,
}