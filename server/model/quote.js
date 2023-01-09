const mongoose = require('mongoose')

const quoteSchema = mongoose.Schema({
  name: String,
  location: String,
  c_size: Number,
  p_size: Number,
  desc: String,
  dod: String,
  sector: String,
})

 module.exports =  mongoose.model('Quote', quoteSchema)