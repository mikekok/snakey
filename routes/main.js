// Dependencies
const router = require('express').Router()
const randomstring = require('randomstring')
const URL = require('../models/url')
const dotenv = require('dotenv').config()

// Home
router.get('/', (req, res) => {
  res.render('home', {
    title: 'Snakey - A Modern URL Shortener'
  })
})

router.post('/api/shorten', (req, res) => {
  let link = req.body.url
  URL.findOne({original_url: link}, (err, result) => {
    if (err) throw err
    if (result) {
      res.send({'short_url': process.env.HOST + result.token})
    } else {
      let newURL = URL({
        original_url: link
      })
      newURL.save((err, generatedURL) => {
        if (err) throw err
        res.send({'short_url': process.env.HOST + generatedURL.token})
      })
    }
  })
})

// Short Links
router.get('/:token', (req, res) => {
  URL.findOne({token: req.params.token}, function(err, result) {
    if (err) throw err
    if (result) {
      res.redirect(result.original_url)
    } else {
      res.redirect('/')
    }
  })
})

// Export
module.exports = router