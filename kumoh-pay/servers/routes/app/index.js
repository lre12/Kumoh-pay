const router = require('express').Router()

router.use('/auth', require('./auth/index'))
router.use('/info', require('./info/infoRouter'))

module.exports = router