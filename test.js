global.process = require('process/browser')

var testsContext = require.context('./src/', true, /\/test\.js$/)
testsContext.keys().forEach(testsContext)
