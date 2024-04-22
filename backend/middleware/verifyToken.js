const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ error: "Token not provided" })
    }

    jwt.verify(token.split(' ')[1], process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid Token" })
        }
        req.user = decoded
        next()
    })
}

module.exports = verifyToken