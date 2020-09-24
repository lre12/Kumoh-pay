

const jwt = require('jsonwebtoken');
const connection = require('../../../dbconnection');


exports.createToken = function (req, res, next) {
    try {
        let id = req.body.id;
        let pwd = req.body.pwd;
        const secret = req.app.get('jwt-secret')
        var DBuserCheck = "SELECT * FROM USER WHERE id =" + '"' + id + '"';
        connection.query(DBuserCheck, function (err, data) {
            if (err) {
                res.send(err);
                console.log('user query data: dataSTR', +data + " ; req string " + req.body + "; id string " + id);
            }
            else {
                if(data[0].password==pwd){
                    const token = jwt.sign({
                        user_id: id
                        }, secret, {
                        expiresIn: '1h'
                        });
                        res.cookie('user', token);
                        res.send({
                        result: 'ok',
                        token
                        });
                }else{
                    res.send({
                        result: 'fail'
                    })
                }
                
            }
        });
    }
    catch(ex) {
        console.log('Message from Catch is ----->>>> ' + ex);
    }   
}


exports.createNewUser = function (req, res, next) {
    try{
        
        let id = req.body.id
        let password = req.body.pwd
        let name = req.body.name
        let params = [id, password, name]
        let sql = 'INSERT INTO USER (id, password, name, userGroup, permit, charge, recentUseDate, createdDate, isDeleted) VALUES ('+id+', '+password+', '+'"' + name + '"' +','+ "'학생'" +', 1, 0, now(), now(), 0)'
        console.log(params);
        connection.query(sql,
            (err, rows, fields) => {
                const token = jwt.sign({
                    user_id: id
                    }, YOUR_SECRET_KEY, {
                    expiresIn: '1h'
                    });
                    res.cookie('user', token);
                    res.send({
                    result: 'ok',
                    token
                    });
                console.log(rows)
            }
        )
    }catch (err) {
        console.error(err);
        next(err);
        }
}