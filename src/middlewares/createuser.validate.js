const Joi = require("joi");

const validator_user = require('express-joi-validation').createValidator({ passError: true });

const userSchema = Joi.object({

    batch: Joi.string().required(),

    first_name: Joi.string().required(),

    middle_name: Joi.string(),

    last_name: Joi.string().required(),
    
    email: Joi.string().required(),

    username: Joi.string().required(),

    password: Joi.string().required()

});

module.exports = { validator_user, userSchema }