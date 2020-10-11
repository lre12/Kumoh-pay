

const jwt = require('jsonwebtoken');
const connection = require('../../../dbconnection');

const nodeMailer = require('nodemailer');
const title = "금오페이 인증번호"
let ranNum = 0;

const mailPoster = nodeMailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'swj951105@gmail.com',
    pass: 'awio0117@@'
  }
});

const mailOpt = (email, title, contents) => {
    const mailOptions = {
      from: 'swj951105@gmail.com',
      to: email,
      subject: title,
      text: contents
      //인증번호
    };
  
    return mailOptions;
}

const sendMail = (mailOption) => {
    mailPoster.sendMail(mailOption, function(error, info){
      if (error) {
        console.log('에러 ' + error);
      }
      else {
        console.log('전송 완료 ' + info.response);
      }
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

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
        let num = req.body.ranNum
        if(ranNum===num){
            const secret = req.app.get('jwt-secret')
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
                        }, secret, {
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
        }else{
            res.send({result:'fail'})
        }
        
    }catch (err) {
        console.error(err);
        next(err);
        }
}

exports.email = function(req,res,next){
    try{
        const mailid = req.body.mail;
        mail = mailid.concat("@naver.com")
        //금오웹메일로 바꾸기
        console.log(mail)
        ranNum = String(getRandomInt(1000,9999))
        const mailOption = mailOpt(mail, title,ranNum);
        sendMail(mailOption)
        res.send({result:'ok'})
    }catch (err) {
        console.error(err);
        next(err);
    }
}