'use strict'

const express = require('express')

const app = express()

app.listen('8888', function(err){
	console.log('loop listening!')
})