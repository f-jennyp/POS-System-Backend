const jwt = require('jsonwebtoken');

function VerifyToken (req, res, next){
    const token = req.headers['auth'];

    if(token == null) 
    return res.status(401).send({message: "Invalid Token"})

        jwt.verify(token, process.env.securedKey,(err, decode) => {
            if(err) return res.status(403).send({message: "Invalid Token!"})
            req.user = decode.username;
            next()
        })
    }

module.exports = { VerifyToken }