const router = require('express').Router()
const controller = require('./auth.controller')

router.post('/login', controller.createToken);
router.post('/new', controller.createNewUser);

module.exports = router