'use strict'

const npm = require('npm')
const async = require('async')

module.exports = function(specs, cb){
  let missing = []

  specs.forEach(function(spec){
    // Skip over absolute and relative paths
    if (spec[0] === '.' || spec[0] === '/') return;
            
    try {
      require(spec);
    } catch (__) {
      missing.push(spec);
    }
  })
  
  console.log('Installing missing packages...' + missing);
  
  async.waterfall([
    function(next) {
        var npmConfig = {
            'bin-links': false,
            'cache': false,
            'optional': false,
            'production': true
        };
    
        npm.load(npmConfig, next);
    },
    function (npm, next) {
        npm.commands.install('./', missing, next);
    },
    function(err){
      if(err){
        cb(err)
      } else {
        cb(null)
      }
    }
  ])
}