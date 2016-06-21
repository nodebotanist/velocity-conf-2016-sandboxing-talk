'use npm'
'use strict'

const request = require('request')

module.exports = function(cb){
	request.get('http://google.com', function(err, resp){
		cb(err, resp)
	})
}