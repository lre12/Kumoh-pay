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