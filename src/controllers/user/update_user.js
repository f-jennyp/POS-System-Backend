const db = require("../../config/config");

exports.updateUser = async (req, res) => {
    try {
        
        const result = await db.dbuser.update(req.body, {
            where: {
                user_id: req.body.user_id
            }
        });

        res.status(201).send({
            message: "User successfully updated!",
            result
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error
        })
    }
}