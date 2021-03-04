const express = require('express')
const passport = require('passport')

const Campaign = require('../models/campaign')
const Session = require('../models/session')

const { handle404, requireOwnership } = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// Get

router.get('/campaigns/:id/sessions', requireToken, (req, res, next) => {
  const campaignId = req.params.id
  Campaign.findById(campaignId)
    .then(handle404)
    .then(campaign => {
      res.json({ sessions: campaign.sessions })
    })
    .catch(next)
})

// POST
router.post('/campaigns/:id/sessions', requireToken, (req, res, next) => {
  const campaignId = req.params.id
  const sessionData = req.body.session
  Campaign.findById(campaignId)
    .then(handle404)
    .then(campaign => {
      console.log("test")
      campaign.sessions.push(sessionData)
      return campaign.save()
    })
    .then(campaign => res.json({ campaign: campaign }))
    .catch(next)
})

// Patch

// DELETE

module.exports = router
