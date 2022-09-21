#!/usr/bin/env node

/**
 * @file
 * The script generates package.json files that points to correct ESM modules
 * and TypeScript typings.
 *
 * It's a part of the build process.
 */

const { writeFile, readFile, readdir } = require('mz/fs')
const path = require('path')
const listFns = require('../_lib/listFns')
const listFPFns = require('../_lib/listFPFns')
const rootPath = process.env.PACKAGE_OUTPUT_PATH || path.resolve(process.cwd(), 'tmp/package')

const extraModules = [{ fullPath: './src/fp/index.js' }]

const initialPackages = getInitialPackages()

updateESMImports().then(() => {
  Promise.all([listAll().map((module) => writePackage(module.fullPath))]).then(
    'package.json files are generated'
  )
})

function updateESMImports() {
  // fixes https://github.com/marnusw/date-fns-tz/issues/200
  return findIndices(path.resolve(rootPath, 'esm'))
    .then((indices) => {
      return Promise.all(
        indices.map((path) => {
          return readFile(path, { encoding: 'utf8' }).then((text) => ({ path, text }))
        })
      )
    })
    .then((pairs) => {
      return Promise.all(
        pairs.map(({ path, text }) => {
          const publicRe = /import (\w+) from 'date-fns\/(\w+)\/index.js'/
          const privateRe = /date-fns(\/fp)?\/_lib\//g

          if (publicRe.test(text) || privateRe.test(text)) {
            text = text.replace(publicRe, "import { $2 as $1 } from 'date-fns'")
            text = text.replace(privateRe, 'date-fns/esm$1/_lib/')
            return writeFile(path, text)
          }
        })
      )
    })
}

function findIndices(dir) {
  return readdir(dir, { withFileTypes: true }).then((dirents) => {
    const indices = dirents
      .filter((dirent) => dirent.isFile() && dirent.name === 'index.js')
      .map((dirent) => path.resolve(dir, dirent.name))

    const promises = dirents
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => findIndices(path.resolve(dir, dirent.name)))

    return Promise.all(promises).then((children) => [...indices, ...children.flat()])
  })
}

function writePackage(fullPath) {
  const dirPath = path.dirname(fullPath)
  const typingsRelativePath = path.relative(dirPath, `./src/typings.d.ts`)
  const packagePath = path.resolve(rootPath, `${dirPath.replace('./src/', './')}/package.json`)
  const isESM = packagePath.includes('esm')

  return writeFile(
    packagePath,
    JSON.stringify(
      Object.assign(
        {
          sideEffects: false,
          type: isESM ? 'module' : 'commonjs',
        },
        initialPackages[fullPath] || {},
        {
          typings: typingsRelativePath,
        }
      ),
      null,
      2
    )
  )
}

function getInitialPackages() {
  return listFns()
    .concat(listFPFns())
    .concat(extraModules)
    .reduce((acc, module) => {
      acc[module.fullPath] = getModulePackage(module.fullPath)
      return acc
    }, {})
}

function getModulePackage(fullPath) {
  const dirPath = path.dirname(fullPath)
  const subPath = dirPath.match(/^\.\/src\/(.+)$/)[1]
  const esmRelativePath = path.relative(dirPath, `./src/esm/${subPath}/index.js`)
  return { module: esmRelativePath }
}

function listAll() {
  return listFns()
    .concat(listFPFns())
    .concat(extraModules)
    .reduce((acc, module) => {
      const esmModule = Object.assign({}, module, {
        fullPath: module.fullPath.replace('./src/', './src/esm/'),
      })
      return acc.concat([module, esmModule])
    }, [])
    .concat([])
}
