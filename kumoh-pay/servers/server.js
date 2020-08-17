const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const data = fs.readFileSync('./database.json')
const conf = JSON.parse(data)
const mysql = require('mysql')


const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

app.get('/api/customers', (req, res) => {
    connection.query(
        'SELECT * FROM CUSTOMER WHERE isDeleted = 0',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.post('/api/customers', (req, res) => {
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

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.listen(port, () => console.log(`Listening on port ${port}`))