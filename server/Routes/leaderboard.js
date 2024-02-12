const express = require('express')

const router = express.Router()

const isAuth = require('../Middleware/isAuth')

const leaderboardController = require('../Controller/leaderboard')

router.get('/leaderboard',isAuth,leaderboardController.getLeaderboard)

module.exports = router