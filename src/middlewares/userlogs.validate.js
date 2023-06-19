const Joi = require("joi");

const validator_logs = require('express-joi-validation').createValidator({ passError: true });

const userlogsSchema = Joi.object({

    first_name: Joi.string().required(),

    last_name: Joi.string().required(),

    activity: Joi.string().required()

});

module.exports = { validator_logs, userlogsSchema }