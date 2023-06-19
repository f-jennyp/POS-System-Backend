const db = require("../../config/config");

exports.deleteOneUser = async (req, res) => {
    try {
        const result = await db.dbuser.destroy({
            where: {
                user_id: req.params.user_id
            }
        });

        res.status(201).send({
            message: "User deleted successfully!",
            result
        })
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}
