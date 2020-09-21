const express = require('express');
const router = express.Router();
const connection = require('../dbconnection');

router.get('/calc', (req, res) => {
    connection.query(
        'SELECT * FROM USER WHERE isDeleted = 0',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

router.get('/users', (req, res) => {
    connection.query(
        'SELECT * FROM USER WHERE isDeleted = 0',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

router.post('/users', (req, res) => {
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

router.delete('/users/:id', (req, res) => {
    let sql = 'UPDATE USER SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

router.get('/customers', (req, res) => {
    connection.query(
        'SELECT * FROM CUSTOMER WHERE isDeleted = 0',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

router.post('/customers', (req, res) => {
    let sql = 'INSERT INTO CUSTOMER (id, name, major, gender, charge, createdDate, isDeleted) VALUES (?, ?, ?, ?, ?, now(), 0)'
    let id = req.body.id
    let name = req.body.name
    let major = req.body.major
    let gender = req.body.gender
    let charge = req.body.charge
    let params = [id, name, major, gender, charge]
    console.log(req.body)
    console.log(params)
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows)
        }
    )
})

router.delete('/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

router.get('/sellers', (req, res) => {
    connection.query(
        'SELECT * FROM SELLER WHERE isDeleted = 0',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

router.post('/sellers', (req, res) => {
    let sql = 'INSERT INTO SELLER (id, name, owner, phone, charge, createdDate, isDeleted) VALUES (?, ?, ?, ?, ?, now(), 0)'
    let id = req.body.id
    let name = req.body.name
    let owner = req.body.owner
    let phone = req.body.phone
    let charge = req.body.charge
    let params = [id, name, owner, phone, charge]
    console.log(req.body)
    console.log(params)
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows)
        }
    )
})

router.delete('/sellers/:id', (req, res) => {
    let sql = 'UPDATE SELLER SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

module.exports = router;