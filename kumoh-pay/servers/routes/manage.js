const express = require('express');
const router = express.Router();
const connection = require('../dbconnection');
const controller = require('./managerController')
const { verifyToken } = require('./app/auth/middlewares/authorization');

router.post('/login',controller.createToken)

router.get('/users/all/id/:id',verifyToken ,(req, res) => {
    let sql = "SELECT id, name, userGroup, permit, charge, recentUseDate FROM USER WHERE id LIKE '%"
                + req.params.id 
                +"%' AND isDeleted=0" 
    connection.query(sql, 
        (err, rows, fields) => {
            console.log(sql)
            res.send(rows)
        }
    )
});

router.get('/users/all/name/:id',verifyToken, (req, res) => {
    let sql = "SELECT id, name, userGroup, permit, charge, recentUseDate FROM USER WHERE name LIKE '%"
                + req.params.id 
                +"%' AND isDeleted=0"
    connection.query(sql, 
        (err, rows, fields) => {
            console.log(sql)
            res.send(rows)
        }
    )
});

router.get('/users/seller/id/:id',verifyToken, (req, res) => {
    let sql = "SELECT id, name, userGroup, permit, charge, recentUseDate FROM USER WHERE id LIKE '%"
                + req.params.id 
                +"%' AND isDeleted=0 AND userGroup='판매자'" 
    connection.query(sql, 
        (err, rows, fields) => {
            console.log(sql)
            res.send(rows)
        }
    )
});

router.get('/users/seller/name/:id',verifyToken, (req, res) => {
    let sql = "SELECT id, name, userGroup, permit, charge, recentUseDate FROM USER WHERE name LIKE '%"
                + req.params.id 
                +"%' AND isDeleted=0 AND userGroup='판매자'"
    connection.query(sql, 
        (err, rows, fields) => {
            console.log(sql)
            res.send(rows)
        }
    )
});

router.get('/users/user/id/:id',verifyToken, (req, res) => {
    let sql = "SELECT id, name, userGroup, permit, charge, recentUseDate FROM USER WHERE id LIKE '%"
                + req.params.id 
                +"%' AND isDeleted=0 AND userGroup='학생'" 
    connection.query(sql, 
        (err, rows, fields) => {
            console.log(sql)
            res.send(rows)
        }
    )
});

router.get('/users/user/name/:id',verifyToken, (req, res) => {
    let sql = "SELECT id, name, userGroup, permit, charge, recentUseDate FROM USER WHERE name LIKE '%"
                + req.params.id 
                +"%' AND isDeleted=0 AND userGroup='학생'"
    connection.query(sql, 
        (err, rows, fields) => {
            console.log(sql)
            res.send(rows)
        }
    )
});

router.get('/users', verifyToken,(req, res) => {
    connection.query(
        'SELECT id, name, userGroup, permit, charge, recentUseDate FROM USER WHERE isDeleted = 0',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

router.post('/permit',verifyToken, (req, res) => {
    let sql = 'UPDATE USER SET permit=? WHERE id=?'
    let permit = req.body.permit
    let id = req.body.id
    let params = [permit, id]
    console.log(req.body)
    console.log(params)
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows)
        }
    )
})

router.post('/users',verifyToken, (req, res) => {
    let sql = 'INSERT INTO USER (id, name, userGroup, permit, charge, recentUseDate, createdDate, isDeleted) VALUES (?, ?, ?, 0, ?, now(), now(), 0)'
    let id = req.body.id
    let name = req.body.name
    let userGroup = req.body.userGroup
    let charge = req.body.charge
    let params = [id, name, userGroup, charge]
    console.log(req.body)
    console.log(params)
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows)
        }
    )
})

router.delete('/users/:id',verifyToken, (req, res) => {
    let sql = 'UPDATE USER SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

module.exports = router;