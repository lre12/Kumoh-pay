const connection = require('../dbconnection');
const jwt = require('jsonwebtoken');

exports.createToken = function (req, res, next) {
    try {
        let id = req.body.id;
        let inputpwd = req.body.pwd;
        const secret = req.app.get('jwt-secret')
        var DBuserExist = "SELECT EXISTS (SELECT * FROM ADMIN WHERE id =" + '"' + id + '"' + ") AS SUCCESS";
        var DBuserCheck = "SELECT * FROM ADMIN WHERE id =" + '"' + id + '"';
        connection.query(DBuserExist, function (err, data) {
            if (data[0].SUCCESS == 1) {
                connection.query(DBuserCheck, function (err, data) {
                    if (err) {
                        res.send(err);
                        console.log('user query data: dataSTR', +data + " ; req string " + req.body + "; id string " + id);
                    }
                    else {
                        if (inputpwd === data[0].password) {
                            const token = jwt.sign({
                                user_id: id
                            }, secret);
                            res.cookie('user', token);
                            res.send({
                                result: 'ok',
                                token
                            });
                        } else {
                            res.send({
                                result: 'fail'
                            })
                        }
                    }
                });
            }
            else {
                res.send({
                    result: 'fail'
                })
            }
        })
        
        
    }
    catch (ex) {
        console.log('Message from Catch is ----->>>> ' + ex);
    }
}