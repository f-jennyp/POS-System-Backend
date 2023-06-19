const db = require("../../config/config");

exports.getUsers = async (req, res) => {
    try {
        const result = await db.dbuser.findAll();

        res.status(201).send({
            message: "Succesfully retrieved all users!",
            result
        })
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}

exports.getOneUser = async (req, res) => {
    try {
        const result = await db.dbuser.findOne({
            where: {
                user_id: req.params.user_id
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

exports.countUsers = async (req, res) => {
    try {
        const result = await db.dbuser.count();

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

// Get user by batch
exports.getBatch = async (req, res) => {
    try {

        const result = await db.dbuser.findAll({
            where: {
                batch: req.params.batch
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

// Get all batch
exports.getAllBatch = async (req, res) => {
    try {
        const results = await db.dbuser.findAll({
            attributes: ['batch']
        });
        const batchArray = results.map(result => result.batch);

        const uniqueBatch = [...new Set(batchArray)];

        res.status(201).send({
            message: "Succesfully retrieved!",
            results: uniqueBatch
        })
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}