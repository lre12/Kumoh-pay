const connection = require('../../../dbconnection');

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

exports.update = async function(req,res,next){
    id = res.locals.userId;
    pwd = req.body.pwd;
    var sql = "UPDATE USER SET password ="+'"'+pwd+'"'+" WHERE id =" + '"' + id + '"';
    try{
        await connection.query(sql,
            (err, rows, fields) => {
                res.send({
                    result : 'ok'
                });
            }
        )
    }catch(err){
        next(err)
    }
}