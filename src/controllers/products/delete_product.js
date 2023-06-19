const db = require("../../config/config");

exports.deleteOneProduct = async (req, res) => {
    try {
        const product = await db.dbproducts.findOne({ // Find the product with the given product_id
            where: {
                product_id: req.params.product_id
            }
        });
        
        const productName = product.product_name; // Retrieve the product_name from the product
        const result = await db.dbproducts.destroy({ // Delete the product
            where: {
                product_id: req.params.product_id
            }
        });
        
        const { last_name, first_name, user_id } = req.user;
        const userlog = await db.dbuserlogs.create({
            user_id,
            first_name,
            last_name,
            activity: `${first_name} ${last_name} deleted the product: ${productName}`, // Add the product_name to the activity field
            date: new Date(),
            time: new Date()
        });
        

        console.log(userlog);
        
        res.status(201).send({
            message: "Product successfully deleted!",
            result
        })
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}
