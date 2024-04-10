var fs = require('fs-extra')

var benchmarkResultFilename = './tmp/benchmark.json'

function benchmarkJSONReporter() {
  var benchmarkResult = {}

  this.onSpecComplete = function (_, result) {
    var fnName = result.benchmark.suite
    var libraryName = result.benchmark.name
    var operationsPerSecond = Math.floor(result.benchmark.hz)

    if (!benchmarkResult[fnName]) {
      benchmarkResult[fnName] = {}
    }

    benchmarkResult[fnName][libraryName] = operationsPerSecond
  }

  this.onRunComplete = async function () {
    var benchmarkResultArray = []
    for (var fnName in benchmarkResult) {
      // eslint-disable-next-line no-prototype-builtins
      if (benchmarkResult.hasOwnProperty(fnName)) {
        var element = { fn: fnName }

        if (benchmarkResult[fnName]['date-fns']) {
          element.dateFns = benchmarkResult[fnName]['date-fns']
        }

        if (benchmarkResult[fnName]['Moment.js']) {
          element.moment = benchmarkResult[fnName]['Moment.js']
        }

        benchmarkResultArray.push(element)
      }
    }

    await fs.outputFile(benchmarkResultFilename, JSON.stringify(benchmarkResultArray), 'utf-8')
    console.log('See results at ' + benchmarkResultFilename)
  }
}

module.exports = benchmarkJSONReporter
