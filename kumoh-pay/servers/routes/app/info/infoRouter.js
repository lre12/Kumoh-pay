const router = require('express').Router()
const { verifyToken } = require('../auth/middlewares/authorization');
const infoController = require('./infoController');
router.get('/', verifyToken, infoController.getAll);

module.exports = router