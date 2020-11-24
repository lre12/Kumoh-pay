const router = require('express').Router()
const connection = require('../../dbconnection');
router.use('/auth', require('./auth/index'))
router.use('/info', require('./info/infoRouter'))


module.exports = router