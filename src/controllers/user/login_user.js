const { bcrypthashed } = require("../../helpers/hash");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const db = require("../../config/config")

exports.loginUser = async (req, res) => {
    try {

        const user = await db.dbuser.findOne({
            where: {
                username: req.body.username
            },
            raw: true
        });

        if(!user) {
            return res.status(400).send({
                message: "user not found"
            })
        }

        // console.log(user)

        const password = bcrypt.compareSync(req.body.password, user.password)

        if (!password) {
            return res.send({ message: "Invalid Password" })
        }

        const token = jwt.sign({ username: user },
            process.env.securedKey, {
            expiresIn: '24h'
        }
        );

        // console.log(token)
    
        const { last_name, first_name, user_id } = user;
        const userlog = await db.dbuserlogs.create({
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            activity: `${first_name} ${last_name} login to the system`,
            date: new Date(),
            time: new Date()
        });

        // console.log(userlog);

        res.status(201).send({
            message: "Login successfully!",
            token,
            password,
        })

    } catch (error) {
        console.log({error})
        res.status(500).send({
            error
        })
    }
}