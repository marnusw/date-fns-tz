var fs = require('fs-extra')

var countFilename = './tmp/tests_count.txt'

function countReporter() {
  this.onRunComplete = async function (_, result) {
    let prevCount = 0
    try {
      const data = await fs.readFile(countFilename, { encoding: 'utf-8', flag: 'a+' })
      prevCount = parseInt(data, 10) || 0
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err
      }
    }

    const totalCount = prevCount + result.success
    await fs.outputFile(countFilename, totalCount.toString(), 'utf-8')
  }
}

module.exports = countReporter
