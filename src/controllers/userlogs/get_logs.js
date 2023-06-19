const db = require("../../config/config");
const { Op } = require("sequelize");

exports.getUserlogs = async (req, res) => {
    try {
        const result = await db.dbuserlogs.findAll();

        res.status(201).send({
            message: "Succesfully retrieved all userlogs!",
            result
        })
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}

exports.getOneUserlog = async (req, res) => {
    try {
        const result = await db.dbuserlogs.findOne({
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

exports.countUserlogs = async (req, res) => {
    try {
        const result = await db.dbuserlogs.count();

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

// Get userlogs by date range
exports.getUserlogsDate = async (req, res) => {
    try {
       
        const result = await db.dbuserlogs.findAll({
            where: {
                date: {
                [Op.between]: [req.params.start, req.params.end]
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