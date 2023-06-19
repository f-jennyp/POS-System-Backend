const db = require("../../config/config");
const { Op } = require("sequelize");

exports.getProducts = async (req, res) => {
    try {
        const result = await db.dbproducts.findAll();

        res.status(201).send({
            message: "Succesfully retrieved all products!",
           result 
        })

    } catch (error) {
        res.status(500).send({
            error
        })
    }
}

exports.getOne = async (req, res) => {
    try {
        const result = await db.dbproducts.findOne({
            where: {
                product_id: req.params.product_id
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

exports.countProducts = async (req, res) => {
    try {
        const result = await db.dbproducts.count();

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

// Get all categories
exports.getAllCategory = async (req, res) => {
    try {
        const results = await db.dbproducts.findAll({
            attributes: ['product_category'],
            order: [['product_category', 'ASC']]
        });
        const categoryArray = results.map(result => result.product_category);

        const uniqueCategories = [...new Set(categoryArray)];

        res.status(201).send({
            message: "Succesfully retrieved!",
            results: uniqueCategories
        })
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}

// Get one category
exports.getOneCategory = async (req, res) => {
    try {
        const result = await db.dbproducts.findOne({
            where: {
                product_category: req.params.product_category
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

// Get products by date range (createdAt)
exports.getProductDate = async (req, res) => {
    try {
       
        const result = await db.dbproducts.findAll({
            where: {
                createdAt: {
                [Op.between]: [req.params.start, req.params.end ]
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