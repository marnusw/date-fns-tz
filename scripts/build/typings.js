#!/usr/bin/env node

/**
 * @file
 * The script generates TypeScript typing files.
 *
 * It's a part of the build process.
 */

const path = require('path')
const jsDocs = require(path.resolve(process.cwd(), 'tmp/docs.json'))

const { generateTypeScriptTypings } = require('./_lib/typings/typeScript')

const fns = Object.keys(jsDocs)
  .map((category) => jsDocs[category])
  .reduce((previousValue, newValue) => [...previousValue, ...newValue], [])
  .filter((doc) => doc.kind === 'function')
  .sort((a, b) => a.title.localeCompare(b.title, 'en-US'))

const aliases = jsDocs['Types']

generateTypeScriptTypings(fns, aliases, [])
