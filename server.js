'use strict'

const fs = require('fs')
const path = require('path')
const express = require('express')
const tripwire = require('tripwire')
const webtask = require('webtask-runtime')
const dotenv = require('dotenv').load()
const expressJWT = require('express-jwt')

const installModules = require('./installModules')

const app = express()

app.use(expressJWT({ 
  secret: process.env.CLIENT_SECRET,
  issuer: 'nodebotanist'
}))

let existing = []

//this route runs a piece of code that's already on the server
app.get('/task', function (req, res) {
  let name = req.query.name
  const code = fs.readFileSync(path.join(__dirname, 'scripts', name + '.js'), 'utf8');
  webtask.compile(code, {installModules}, function(err, webtaskFunction){
    if(err){
      res.status(400)
      res.send(err)
    } else {
      simulateTask(webtaskFunction, res)
    }
  })
})

app.post('/task', function(req, res){

})

app.put('/task', function(req, res){

})

app.delete('/task', function(req, res){

})

function simulateTask(webtaskFunction, res){
  webtask.simulate(webtaskFunction, {}, function(result){
    if(result.error){
      console.log(result)
      res.status(400)
      res.send(result)
    } else {
      res.set(result.headers)
      res.send(result.payload)
    }
  })
}

app.listen(1337, function () {
  console.log('appliance listening on port 1337!');
})