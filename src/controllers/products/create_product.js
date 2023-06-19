const db = require("../../config/config");
const fs = require("fs");

exports.createProduct = async (req, res) => {
    try {
        console.log(req.body)

        const variationArray = req.body.variation.split(',')

        req.body.variation = variationArray;
        console.log(req.body)
        
        let bufferFile = "";
        if (req.file && req.file.buffer) {
            req.body.image = req.file.originalname;
            console.log({buffer: req.file.buffer, file: req.file});
            bufferFile = req.file.buffer.toString("base64");
        } else {
            req.body.image = "";
        }

        // Capitalize the first letter of the product name and category
        req.body.product_name = req.body.product_name.charAt(0).toUpperCase() + req.body.product_name.slice(1);
        req.body.product_category = req.body.product_category.charAt(0).toUpperCase() + req.body.product_category.slice(1);

        req.body.buffer_file = bufferFile;

        const result = await db.dbproducts.create(req.body);

        const { last_name, first_name, user_id } = req.user;

        const userlog = await db.dbuserlogs.create({
            user_id,
            first_name,
            last_name,
            activity: `${first_name} ${last_name} added a new product: ${req.body.product_name}`,
            date: new Date(),
            time: new Date(),
        });

        res.status(201).send({
            message: "Product successfully created!",
            result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error,
        });
    }
};