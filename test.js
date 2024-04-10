// Mock process global with polyfill, required mainly for karma
global.process = { env: {} }

var testsContext = require.context('./src/', true, /\/test\.js$/)
testsContext.keys().forEach(testsContext)
