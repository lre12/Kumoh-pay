

const jwt = require('jsonwebtoken');
const connection = require('../../../dbconnection');

const nodeMailer = require('nodemailer');
const title = "금오페이 인증번호"
let ranNum = 0;

const crypto = require('crypto');



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
    mailPoster.sendMail(mailOption, function (error, info) {
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
        let inputpwd = req.body.pwd;
        const secret = req.app.get('jwt-secret')
        var DBuserExist = "SELECT EXISTS (SELECT * FROM USER WHERE id =" + '"' + id + '"' + ") AS SUCCESS";
        var DBuserCheck = "SELECT * FROM USER WHERE id =" + '"' + id + '"';
        connection.query(DBuserExist, function (err, data) {
            if (data[0].SUCCESS == 1) {
                connection.query(DBuserCheck, function (err, data) {
                    if (err) {
                        res.send(err);
                        console.log('user query data: dataSTR', +data + " ; req string " + req.body + "; id string " + id);
                    }
                    else {
                        console.log(data);
                        let hashPassword = crypto.createHash("sha512").update(inputpwd + data[0].salt).digest("hex");
                        console.log(hashPassword);
                        console.log(data[0].password);
                        if (hashPassword === data[0].password) {
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


exports.createNewUser = function (req, res, next) {
    try {
        let num = req.body.ranNum
        if (ranNum === num) {
            const secret = req.app.get('jwt-secret')
            const id = req.body.id
            const inputpwd = req.body.pwd
            const name = req.body.name
            crypto.randomBytes(64, (err, buf) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                const salt = buf.toString('hex');
                let hashPassword = crypto.createHash("sha512").update(inputpwd + salt).digest("hex");
                console.log(hashPassword);
                console.log(salt);

                let sql = 'INSERT INTO USER (id, password, name, salt, userGroup, permit, charge, recentUseDate, createdDate, isDeleted) VALUES (' + id + ', ' + '"' + hashPassword + '"' + ', ' + '"' + name + '"' + ',' + '"' + salt + '"' + ',' + "'학생'" + ', 1, 0, now(), now(), 0)'
                console.log(sql);
                connection.query(sql,
                    (err, rows, fields) => {
                        if (err) {
                            console.log(err)
                            throw err;
                        }
                        const token = jwt.sign({
                            user_id: id
                        }, secret, {
                            expiresIn: '1h'
                        });
                        res.cookie('user', token, {
                            maxAge: 60 * 60 * 1000,
                            httpOnly: true,
                            secure: true
                        }
                        );
                        res.send({
                            result: 'ok',
                            token
                        });
                        console.log(rows)
                    }
                )

            });



        } else {
            res.send({ result: 'fail' })
        }

    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.email = function (req, res, next) {
    try {
        const mailid = req.body.mail;
        mail = mailid.concat("@naver.com")
        //금오웹메일로 바꾸기
        console.log(mail)
        ranNum = String(getRandomInt(1000, 9999))
        const mailOption = mailOpt(mail, title, ranNum);
        sendMail(mailOption)
        res.send({ result: 'ok' })
    } catch (err) {
        console.error(err);
        next(err);
    }
}