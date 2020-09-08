const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    res.send("Hii, Hjwasim Chat APp")
})

module.exports = router