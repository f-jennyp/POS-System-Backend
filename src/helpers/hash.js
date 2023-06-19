const bcrypt = require("bcrypt");
saltrounds = 10;

exports.bcrypthashed = async(password) => {

    const hashed = bcrypt.hash(password, saltrounds)
    return hashed;
}