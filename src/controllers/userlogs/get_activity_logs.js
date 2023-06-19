const db = require("../../config/config");
const { Op } = require("sequelize");

// Get userlogs acitivity = user login to the system
exports.getLoginUsers = async (req, res) => {
    try {

        const result = await db.dbuserlogs.findAll({
            where: {
                activity: {
                    [Op.like]: '%login to the system%'
                }
            }
        });

        res.status(201).send({
            message: "Succesfully retrieved!",
            result
        })

    } catch (error) {
        res.status(500).send({
            error
        })
    }
}

// Get userlogs by firstname
exports.getUsernames = async (req, res) => {
    try {

        const result = await db.dbuserlogs.findAll({
            where: {
                first_name: req.params.first_name
            }
        });

        res.status(201).send({
            message: "Succesfully retrieved!",
            result
        })
        
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}

// Get userlogs acitivity = user added new members
exports.getUserUploadMemberCSV = async (req, res) => {
    try {

        const result = await db.dbuserlogs.findAll({
            where: {
                activity: {
                    [Op.like]: '%added new members%'
                }
            }
        });

        res.status(201).send({
            message: "Succesfully retrieved!",
            result
        })

    } catch (error) {
        res.status(500).send({
            error
        })
    }
}

// Get userlogs acitivity = user added new products
exports.getUserUploadProductCSV = async (req, res) => {
    try {

        const result = await db.dbuserlogs.findAll({
            where: {
                activity: {
                    [Op.like]: '%added new products%'
                }
            }
        });

        res.status(201).send({
            message: "Succesfully retrieved!",
            result
        })

    } catch (error) {
        res.status(500).send({
            error
        })
    }
}

// Get userlogs acitivity = user created a new product
exports.getUserCreateProduct = async (req, res) => {
    try {

        const result = await db.dbuserlogs.findAll({
            where: {
                activity: {
                    [Op.like]: '%created a new product%'
                }
            }
        });

        res.status(201).send({
            message: "Succesfully retrieved!",
            result
        })

    } catch (error) {
        res.status(500).send({
            error
        })
    }
}

// Get userlogs acitivity = user deleted a product
exports.getUserDeleteProduct = async (req, res) => {
    try {

        const result = await db.dbuserlogs.findAll({
            where: {
                activity: {
                    [Op.like]: '%deleted a product%'
                }
            }
        });

        res.status(201).send({
            message: "Succesfully retrieved!",
            result
        })

    } catch (error) {
        res.status(500).send({
            error
        })
    }
}

// Get userlogs acitivity = user updated a product
exports.getUserUpdateProduct = async (req, res) => {
    try {

        const result = await db.dbuserlogs.findAll({
            where: {
                activity: {
                    [Op.like]: '%updated a product%'
                }
            }
        });

        res.status(201).send({
            message: "Succesfully retrieved!",
            result
        })

    } catch (error) {
        res.status(500).send({
            error
        })
    }
}
