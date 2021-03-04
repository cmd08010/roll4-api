const express = require('express')
const passport = require('passport')

const Campaign = require('../models/campaign')
const Entry = require("../models/entry")

const { handle404, requireOwnership } = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// Get

router.get('/campaign/:id/entries', requireToken, (req, res, next) => {
  const campaignId = req.params.id
  Campaign.findById(campaignId)
    .then(handle404)
    .then(campaign => {
// How can I store my campaign id?
      res.json({ entries: campaign.entries })
    })
    .catch(next)
})

// POST
router.post('/entries/:id', requireToken, (req, res, next) => {

})

// Patch

// DELETE

module.exports = router
