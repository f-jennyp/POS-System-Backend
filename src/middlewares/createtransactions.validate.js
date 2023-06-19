const Joi = require("joi");

const validator_transactions = require('express-joi-validation').createValidator({ passError: true });

const transactionSchema = Joi.object({

    product: Joi.array().items(Joi.string()),

    quantity: Joi.number().required(),

    total: Joi.number().required(),

    tendered: Joi.number().required(),

    change: Joi.number().required()

});

module.exports = { validator_transactions, transactionSchema }