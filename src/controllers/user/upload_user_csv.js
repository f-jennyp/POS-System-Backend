const db = require("../../config/config");
const fs = require('fs');
const { bcrypthashed } = require("../../helpers/hash");

exports.uploadUserCSV = async (req, res) => {
    try {

        const users = req.body.users;

        // Check for duplicate email addresses
        const duplicateEmails = users.filter((user, index, self) =>
            index !== self.findIndex(u => u.email === user.email)
        ).map(user => user.email);

        if (duplicateEmails.length > 0) {
            return res.status(400).send({
                error: `The following email addresses already exist: ${duplicateEmails.join(', ')}`
            });
        }

        for (let i = 0; i < users.length; i++) {
            users[i].batch = users[i].batch.charAt(0).toUpperCase() + users[i].batch.slice(1);
            users[i].first_name = users[i].first_name.charAt(0).toUpperCase() + users[i].first_name.slice(1);
            users[i].middle_name = users[i].middle_name.charAt(0).toUpperCase() + users[i].middle_name.slice(1);
            users[i].last_name = users[i].last_name.charAt(0).toUpperCase() + users[i].last_name.slice(1);

            const hash = await bcrypthashed(users[i].password);
            users[i].password = hash;
        }

        console.log(req.body.users)

        db.dbuser.bulkCreate(req.body.users)
            .then(() => {
                fs.unlinkSync(req.file.path); // delete the uploaded file
                res.send('File uploaded successfully!');
            })
            .catch((error) => {
                console.error(error);
            });
            
        const { last_name, first_name, user_id } = req.user;
        const userlog = await db.dbuserlogs.create({
            user_id,
            first_name,
            last_name,
            activity: `${first_name} ${last_name} added new members`,
            date: new Date(),
            time: new Date()
        });
        console.log(userlog);

    } catch (error) {
        console.log(error)
        res.status(500).send({
            error
        })
    }
}
