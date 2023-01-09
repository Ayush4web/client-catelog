const express = require('express')
const router = express.Router()

const {postQuote, getQuote} = require('../controllers/quoteController')

router.post('/', postQuote)
router.get('/', getQuote)

module.exports = router;