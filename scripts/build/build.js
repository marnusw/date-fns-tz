const { execSync } = require('child_process')

execSync('node ./scripts/build/docs.js')
execSync('node ./scripts/build/fp.js')
execSync('node ./scripts/build/indices.js')
