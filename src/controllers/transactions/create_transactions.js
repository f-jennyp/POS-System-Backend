const db = require("../../config/config");

exports.createOrders = async (req, res) => {
    try {
        
        const result = await db.dbtransactions.create(req.body);

        res.status(201).send({
            message: "Order successfully created!",
            result
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error
        })
    }
}