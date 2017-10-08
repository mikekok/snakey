// Dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const randomstring = require('randomstring')

// URL Schema
let urlSchema = new Schema({
  token: {
    type: String,
    unique: true,
    default: randomstring.generate(5)
  },
  original_url: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

//  Model
let URL = mongoose.model('url', urlSchema)

// Export
module.exports = URL