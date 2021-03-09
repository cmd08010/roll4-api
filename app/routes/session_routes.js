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
  sessionData.owner = campaignId
  Campaign.findById(campaignId)
    .then(handle404)
    .then(campaign => {
      campaign.sessions.push(sessionData)
      return campaign.save()
    })
    .then(campaign => {
      const session = campaign.sessions[campaign.sessions.length - 1]
      res.json({ campaign: campaign, session: session })
    })
    .catch(next)
})

router.get('/campaigns/:id/sessions/:sessionid', requireToken, (req, res, next) => {
  const campaignId = req.params.id
  Campaign.findById(campaignId)
    .then(handle404)
    .then(campaign => {
      requireOwnership(req, campaign)
      const session = campaign.sessions.id(req.params.sessionid)
      res.json({ session: session })
    })
    .catch(next)
})

// Patch

router.patch('/campaigns/:id/sessions/:sessionid', requireToken, (req, res, next) => {
  delete req.body.session.owner
  const sessionData = req.body.session
  Campaign.findById(req.params.id)
    .then(handle404)
    .then(campaign => {
      requireOwnership(req, campaign)
      const session = campaign.sessions.id(req.params.sessionid)
      console.log(campaign.sessions, "my sesson", req.params.sessionid, "my session id")
      session.set(sessionData)
      return campaign.save()
    })
    .then(response => {
      res.sendStatus(204)
    })
    .catch(next)
})

// DELETE

router.delete('/campaigns/:id/sessions/:sessionid', requireToken, (req, res, next) => {
  const sessionId = req.params.sessionid
  Campaign.findById(req.params.id)
    .then(handle404)
    .then(campaign => {
      campaign.sessions.id(sessionId).remove()
      return campaign.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
