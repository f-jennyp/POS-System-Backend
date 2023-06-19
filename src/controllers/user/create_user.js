const { bcrypthashed } = require("../../helpers/hash");
const db = require("../../config/config")

exports.createUser = async (req, res) => {
    try {
        
        req.body.batch = req.body.batch.charAt(0).toUpperCase() + req.body.batch.slice(1).toLowerCase();
        req.body.first_name = req.body.first_name.charAt(0).toUpperCase() + req.body.first_name.slice(1).toLowerCase();
        req.body.middle_name = req.body.middle_name.charAt(0).toUpperCase() + req.body.middle_name.slice(1).toLowerCase();
        req.body.last_name = req.body.last_name.charAt(0).toUpperCase() + req.body.last_name.slice(1).toLowerCase();

        req.body.password = await bcrypthashed(req.body.password)

        console.log(req.file)

        const result = await db.dbuser.create(req.body);

        const { last_name, first_name, user_id } = req.user;
        const userlog = await db.dbuserlogs.create({
            user_id,
            first_name,
            last_name,
            activity: `${first_name} ${last_name} added a new member: ${req.body.first_name} ${req.body.last_name}`,
            date: new Date(),
            time: new Date()
        });
        console.log(userlog);

        res.status(201).send({
            message: "User successfully created!",
            result
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            error
        })
    }
}
