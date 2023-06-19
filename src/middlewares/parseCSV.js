const fs = require('fs');
const { parse } = require('csv-parse');

exports.parseCSV = async (req, res, next) => {
    const results = [];
    function parseCSV() {
        return new Promise((resolve, reject) => {
            fs.createReadStream(req.file.path)
                .pipe(parse())
                .on('data', (row) => {

                    const [batch, first_name, middle_name, last_name, email, username, password ] = row;

                    if (batch != "batch") {
                        results.push({
                            batch,
                            first_name,
                            middle_name,
                            last_name,
                            username,
                            password,
                            email
                        })
                    }

                })
                .on('error', (error) => {
                    reject(error);
                    throw new Error('Fail to process CSV file');
                })
                .on('end', () => {

                    resolve();// ends the promise when CSV Parse send 'end' flag
                });
        });
    }

    await parseCSV()

    req.body.users = results;

    next()
}