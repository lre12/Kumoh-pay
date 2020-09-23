

const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    try {
        const secret = req.app.get('jwt-secret')
       
        const clientToken = req.cookies.user;
        const decoded = jwt.verify(clientToken, secret);
        if (decoded) {
            res.locals.userId = decoded.user_id;
            next();
        } else {
            res.status(401).json({ error: 'unauthorized' });
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'token expired' });
    }
};
exports.verifyToken = verifyToken;
