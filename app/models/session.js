const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  }
}, {
  timestamps: true
})

module.exports = sessionSchema
