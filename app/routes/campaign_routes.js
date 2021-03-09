// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for campaigns
const Campaign = require('../models/campaign')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { campaign: { title: '', text: 'foo' } } -> { campaign: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /campaigns
router.get('/campaigns', requireToken, (req, res, next) => {
  Campaign.find({ owner: req.user._id })
    .then(campaigns => {
      // `campaigns` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return campaigns.map(campaign => campaign.toObject())
    })
    // respond with status 200 and JSON of the campaigns
    .then(campaigns => res.status(200).json({ campaigns: campaigns }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /campaigns/5a7db6c74d55bc51bdf39793
router.get('/campaigns/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Campaign.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "campaign" JSON
    .then(campaign => res.status(200).json({ campaign: campaign }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// Get latest Campaigns
router.get('/home', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Campaign.find({ owner: req.user._id }).sort({'updatedAt': -1}).limit(1)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "campaign" JSON
    .then(campaign => {
      console.log(campaign[0], "this is my campaign I should be sending")
      res.status(200).json({ campaign: campaign[0], sessions: campaign[0].sessions })
    })
    // if an error occurs, pass it to the handle
    .catch(next)
})

// CREATE
// POST /campaigns
router.post('/campaigns', requireToken, (req, res, next) => {
  // set owner of new campaign to be current user
  console.log(req.user, "should be coming from passing my token")
  console.log(req.body, "my req body campaign")
  req.body.campaign.owner = req.user.id
  Campaign.create(req.body.campaign)
    // respond to succesful `create` with status 201 and JSON of new "campaign"
    .then(campaign => {
      console.log(campaign, 'my created campaign response from db in campaign routes ')
      res.status(201).json({ campaign: campaign })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /campaigns/5a7db6c74d55bc51bdf39793
router.patch('/campaigns/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.campaign.owner

  Campaign.findById(req.params.id)
    .then(handle404)
    .then(campaign => {
      requireOwnership(req, campaign)
      // pass the result of Mongoose's `.update` to the next `.then`
      return Campaign.findOneAndUpdate({ _id: req.params.id }, { title: req.body.campaign.title, description: req.body.campaign.description }, { new: true })
    })
    // if that succeeded, return 204 and no JSON
    .then((campaign) => {
      console.log(campaign, "my db response from updating the camaign")
      res.status(201).json({ campaign: campaign })
    })
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /campaigns/5a7db6c74d55bc51bdf39793
router.delete('/campaigns/:id', requireToken, (req, res, next) => {
  Campaign.findById(req.params.id)
    .then(handle404)
    .then(campaign => {
      // throw an error if current user doesn't own `campaign`
      console.log(req.user,"my owner", campaign, "request and the campagin")
      requireOwnership(req, campaign)
      // delete the campaign ONLY IF the above didn't throw
      campaign.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
