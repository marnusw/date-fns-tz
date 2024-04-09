const fs = require('fs')
const path = require('path')
const prettier = require('../prettier')

const { getParams, getType, getFPFnType } = require('./common')

const { addSeparator, formatBlock, formatTypeScriptFile } = require('./formatBlock')

/**
 * Return curried function interfaces for a specific FP function arity.
 * @param {Number} [arity=4]
 * @returns {String[arity]} an array of code blocks
 */
const getTypeScriptFPInterfaces = (arity = 4) =>
  [
    formatBlock`
    interface CurriedFn1<A, R> {
      <A>(a: A): R
    }
  `,

    formatBlock`
    interface CurriedFn2<A, B, R> {
      <A>(a: A): CurriedFn1<B, R>
      <A, B>(a: A, b: B): R
    }
  `,

    formatBlock`
    interface CurriedFn3<A, B, C, R> {
      <A>(a: A): CurriedFn2<B, C, R>
      <A,B>(a: A, b: B): CurriedFn1<C, R>
      <A,B,C>(a: A, b: B, c: C): R
    }
  `,

    formatBlock`
    interface CurriedFn4<A, B, C, D, R> {
      <A>(a: A): CurriedFn3<B, C, D, R>
      <A,B>(a: A, b: B): CurriedFn2<C, D, R>
      <A,B,C>(a: A, b: B, c: C): CurriedFn1<D, R>
      <A,B,C,D>(a: A, b: B, c: C, d: D): R
    }
  `,
  ].slice(0, arity)

function getTypeScriptTypeAlias(type) {
  const { title, properties } = type

  return formatBlock`
    export type ${title} = ${getParams(properties)}
  `
}

// function getExportedTypeScriptTypeAlias(type) {
//   const { title } = type
//
//   return formatBlock`
//     export type ${title} = ${title}Aliased
//   `
// }

// function getExportedTypeScriptTypeAliases(aliases) {
//   return formatBlock`
//     declare module 'date-fns-tz' {
//       ${addSeparator(aliases.map(getExportedTypeScriptTypeAlias), '\n')}
//     }
//   `
// }

function getTypeScriptDateFnsModuleDefinition(submodule, fns) {
  const moduleName = `date-fns-tz${submodule}`

  const definition = formatBlock`
    declare module '${moduleName}' {
      import { OptionsWithTZ } from "date-fns-tz"

      ${addSeparator(fns.map(getTypeScriptFnDefinition), '\n')}
    }
  `

  return {
    name: moduleName,
    definition,
  }
}

function getTypeScriptDateFnsFPModuleDefinition(submodule, fns) {
  const moduleName = `date-fns-tz${submodule}/fp`

  const fnDefinitions = fns.map(getTypeScriptFPFnDefinition)

  const definition = formatBlock`
    declare module '${moduleName}' {
      import { OptionsWithTZ } from "date-fns-tz"

      ${addSeparator(fnDefinitions, '\n')}
    }
  `

  return {
    name: moduleName,
    definition,
  }
}

function getTypeScriptFnModuleDefinition(submodule, fnSuffix, isDefault, fn) {
  const name = fn.content.name
  const moduleName = `date-fns-tz${submodule}/${name}${fnSuffix}`

  const definition = formatBlock`
    declare module '${moduleName}' {
      export {${name}} from 'date-fns-tz${submodule}'
    }
  `

  return {
    name: moduleName,
    definition,
  }
}

function getTypeScriptFnDefinition(fn) {
  const { title, args, content } = fn

  const params = getParams(args, { leftBorder: '(', rightBorder: ')' })
  const returns = getType(content.returns[0].type.names)

  return formatBlock`
    function ${title} ${params}: ${returns}
    namespace ${title} {}
  `
}

function getTypeScriptFPFnDefinition(fn) {
  const { title, args, content } = fn

  const type = getFPFnType(args, content.returns[0].type.names)

  return formatBlock`
    const ${title}: ${type}
    namespace ${title} {}
  `
}

function getTypeScriptFPFnModuleDefinition(submodule, fnSuffix, isDefault, fn) {
  const { title } = fn
  const moduleName = `date-fns-tz${submodule}/fp/${title}${fnSuffix}`

  const definition = formatBlock`
    declare module '${moduleName}' {
      export {${title}} from 'date-fns-tz${submodule}/fp'
    }
  `

  return {
    name: moduleName,
    definition,
  }
}

function generateTypescriptFnTyping(fn) {
  const typingFile = formatTypeScriptFile`
    export {${fn.title}} from 'date-fns-tz'
  `
  writeFile(`./src/${fn.title}/index.d.ts`, typingFile)
}

function generateTypescriptFPFnTyping(fn) {
  const typingFile = formatTypeScriptFile`
    export {${fn.title}} from 'date-fns-tz/fp'
  `
  writeFile(`./src/fp/${fn.title}/index.d.ts`, typingFile)
}

function generateTypescriptLocaleTyping(locale) {
  const typingFile = formatTypeScriptFile`
    export {${locale.name}} from 'date-fns-tz/locale'
  `
  writeFile(`src/locale/${locale.code}/index.d.ts`, typingFile)
}

function generateTypeScriptTypings(fns, aliases, locales) {
  const nonFPFns = fns.filter((fn) => !fn.isFPFn)
  const fpFns = fns.filter((fn) => fn.isFPFn)

  const moduleDefinitions = [getTypeScriptDateFnsModuleDefinition('', nonFPFns)]
    .concat(nonFPFns.map(getTypeScriptFnModuleDefinition.bind(null, '', '', false)))
    .concat(nonFPFns.map(getTypeScriptFnModuleDefinition.bind(null, '', '/index', false)))
    .concat(nonFPFns.map(getTypeScriptFnModuleDefinition.bind(null, '', '/index.js', false)))
    .map((module) => module.definition)

  const fpModuleDefinitions = [getTypeScriptDateFnsFPModuleDefinition('', fpFns)]
    .concat(fpFns.map(getTypeScriptFPFnModuleDefinition.bind(null, '', '', false)))
    .concat(fpFns.map(getTypeScriptFPFnModuleDefinition.bind(null, '', '/index', false)))
    .concat(fpFns.map(getTypeScriptFPFnModuleDefinition.bind(null, '', '/index.js', false)))
    .map((module) => module.definition)

  const esmModuleDefinitions = [getTypeScriptDateFnsModuleDefinition('/esm', nonFPFns)]
    .concat(nonFPFns.map(getTypeScriptFnModuleDefinition.bind(null, '/esm', '', false)))
    .concat(nonFPFns.map(getTypeScriptFnModuleDefinition.bind(null, '/esm', '/index', false)))
    .concat(nonFPFns.map(getTypeScriptFnModuleDefinition.bind(null, '/esm', '/index.js', false)))
    .map((module) => module.definition)

  const esmFPModuleDefinitions = [getTypeScriptDateFnsFPModuleDefinition('/esm', fpFns)]
    .concat(fpFns.map(getTypeScriptFPFnModuleDefinition.bind(null, '/esm', '', false)))
    .concat(fpFns.map(getTypeScriptFPFnModuleDefinition.bind(null, '/esm', '/index', false)))
    .concat(fpFns.map(getTypeScriptFPFnModuleDefinition.bind(null, '/esm', '/index.js', false)))
    .map((module) => module.definition)

  const aliasDefinitions = aliases.map(getTypeScriptTypeAlias)

  const typingFile = formatTypeScriptFile`
    // FP Interfaces

    ${addSeparator(getTypeScriptFPInterfaces(), '\n')}

    declare module 'date-fns-tz' {
      import type { Day, FirstWeekContainsDate, Locale, LocaleUnit, RoundingMethod } from "date-fns"

      ${addSeparator(aliasDefinitions, '\n')}
    }

    // Regular Functions

    ${addSeparator(moduleDefinitions, '\n')}

    // FP Functions

    ${addSeparator(fpModuleDefinitions, '\n')}

    // ECMAScript Module Functions

    ${addSeparator(esmModuleDefinitions, '\n')}

    // ECMAScript Module FP Functions

    ${addSeparator(esmFPModuleDefinitions, '\n')}
  `

  writeFile('typings.d.ts', typingFile)

  fns.forEach((fn) => {
    if (fn.isFPFn) {
      generateTypescriptFPFnTyping(fn)
    } else {
      generateTypescriptFnTyping(fn)
    }
  })

  locales.forEach((locale) => {
    generateTypescriptLocaleTyping(locale)
  })
}

function writeFile(relativePath, content) {
  return fs.writeFileSync(
    path.resolve(process.cwd(), relativePath),
    prettier(content, 'typescript')
  )
}

module.exports = {
  generateTypeScriptTypings,
}
