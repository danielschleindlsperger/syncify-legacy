const error = require('koa-json-error')
const { lensProp, over, split, defaultTo, pipe, map, trim } = require('ramda')

const stackLens = lensProp('stack')
const splitStackLines = pipe(defaultTo(''), split(' at '), map(trim))
const postFormat = (err, res) => over(stackLens, splitStackLines, res)

// TODO: omit stack and error message in production
module.exports = error({ postFormat })
