'use strict'

const fs = require('fs')
const path = require('path')
const express = require('express')
const tripwire = require('tripwire')
const webtask = require('webtask-runtime')
const installModules = require('./installModules')

const app = express();

app.use('express-jwt', { secret: process.env.CLIENT_SECRET });

//this route runs a piece of code that's already on the server
app.get('/run/:name', function (req, res) {
  console.log(req.params.name)
  const code = fs.readFileSync(path.join(__dirname, 'scripts', req.params.name + '.js'), 'utf8');
  webtask.compile(code, {installModules}, function(err, webtaskFunction){
    if(err){
      res.status(400)
      res.send(err)
    } else {
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
  })
});

app.listen(1337, function () {
  console.log('Example app listening on port 8080!');
});