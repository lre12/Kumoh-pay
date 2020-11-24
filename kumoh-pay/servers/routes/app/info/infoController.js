const connection = require('../../../dbconnection');


const crypto = require('crypto');
exports.getAll = async function(req,res,next){
    id = res.locals.userId;
    var sql = "SELECT * FROM USER WHERE id =" + '"' + id + '"';
    try{
        await connection.query(sql,
            (err, rows, fields) => {
                console.log(rows);
                res.send(rows);
            }
        )
    }catch(err){
        next(err)
    }
}
exports.delete = async function(req,res,next){
    id = res.locals.userId;
    let sql = 'UPDATE USER SET isDeleted = 1 WHERE id = ?';
    let params = id;
    console.log("delete");
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log(rows);
        }
    )
}


exports.update = async function(req,res,next){
    id = res.locals.userId;
    pwd = req.body.pwd;
    var DBuserExist = "SELECT EXISTS (SELECT * FROM USER WHERE id =" + '"' + id + '"' + ") AS SUCCESS";
    var DBuserCheck = "SELECT * FROM USER WHERE id =" + '"' + id + '"';
    connection.query(DBuserExist, function (err, data) {
        if (data[0].SUCCESS == 1) {
            connection.query(DBuserCheck, function (err, data) {
                const hashPwd = crypto.createHash("sha512").update(pwd + data[0].salt).digest("hex");
                var sql = "UPDATE USER SET password ="+'"'+hashPwd+'"'+" WHERE id =" + '"' + id + '"';
                try{
                    connection.query(sql,
                        (err, rows, fields) => {
                            res.send({
                                result : 'ok'
                            });
                        }
                    )
                }catch(err){
                    next(err)
                }
            })
        }else {
            res.send({
                result: 'fail'
            })
        }
    })
}