const db = require("../../config/config");
const fs = require("fs");

exports.updateProduct = async (req, res) => {
    try {
        //req.body.image = req.file?.originalname;

        const variationArray = req.body.variation.split(',')

        req.body.variation = variationArray;

        let bufferFile = "";
        if (req.file && req.file.buffer) {
            req.body.image = req.file.originalname;
            console.log({buffer: req.file.buffer, file: req.file});
            bufferFile = req.file.buffer.toString("base64");
        } else {
            req.body.image = "";
        }

        req.body.product_name = req.body.product_name.charAt(0).toUpperCase() + req.body.product_name.slice(1);
        req.body.product_category = req.body.product_category.charAt(0).toUpperCase() + req.body.product_category.slice(1);


        req.body.buffer_file = bufferFile;

        const product = await db.dbproducts.findOne({
            where: {
                product_id: req.body.product_id
            }
        });

        const productName = product.product_name;
        const result = await db.dbproducts.update(req.body, {
            where: {
                product_id: req.body.product_id
            }
        });

        const { last_name, first_name, user_id } = req.user;
        const userlog = await db.dbuserlogs.create({
            user_id,
            first_name,
            last_name,
            activity: `${first_name} ${last_name} updated a product: ${productName}`,
            date: new Date(),
            time: new Date()
        });

        console.log(userlog);

        res.status(201).send({
            message: "Product successfully updated!",
            result
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error
        })
    }
}