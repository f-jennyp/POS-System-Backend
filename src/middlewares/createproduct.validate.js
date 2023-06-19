const Joi = require("joi");

const validator_product = require('express-joi-validation').createValidator({ passError: true });

const productSchema = Joi.object({


    image: Joi.string().allow(""),

    product_name: Joi.string().required(),

    original_price: Joi.number().required(),

    markup_price: Joi.number().required(),

    product_category: Joi.string().required(),

    expiration_date: Joi.date().required(),

    quantity: Joi.string().required(),

    variation: Joi.string(),

    updated_by: Joi.string().required()


});

module.exports = { validator_product, productSchema }