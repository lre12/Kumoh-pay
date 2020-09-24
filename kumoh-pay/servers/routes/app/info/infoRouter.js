const router = require('express').Router()
const { verifyToken } = require('../auth/middlewares/authorization');
const infoController = require('./infoController');
router.get('/', verifyToken, infoController.getAll);
router.post('/update',verifyToken, infoController.update);

module.exports = router