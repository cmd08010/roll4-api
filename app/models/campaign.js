const mongoose = require('mongoose')
const sessionSchema = require('./session')

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  sessions: [sessionSchema],
  members: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
  // findAndModify: {
  //   // remove `hashedPassword` field when we call `.toObject`
  //   transform: (_doc, user) => {
  //     delete user.hashedPassword
  //     return user
  //   }
  // }
})

module.exports = mongoose.model('Campaign', campaignSchema)
