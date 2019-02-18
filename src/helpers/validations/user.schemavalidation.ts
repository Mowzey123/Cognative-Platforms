import Joi from 'joi';

const userschemavalidation ={
    signupvalidation:Joi.object().keys({
        username:Joi.string().alphanum().min(7).required().label('Username'),
        email:Joi.string().required().email().label('Email address'),
        password:Joi.string().min(8)
        .max(15).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])$/).options({
            language:{
                string:{
                    regex:{
                        base:"Password length (8-12 characters),Must have atleast one lowercase letter,one uppercase letter,one special character"
                    }
                }
            }
        })
    }),   
}

export default userschemavalidation;