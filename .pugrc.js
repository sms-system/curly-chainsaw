const tplToHtml = require('./lib/tpl-to-html')
const templateEngine = require('./build/template-engine')

module.exports = {
  filters: {
    tpl (txt, opts) {
      const classesToMix = Object.keys(opts).filter(a => a !== 'filename')
      return tplToHtml(txt, classesToMix.join(' '))
    },
    bemjson: (txt) => templateEngine(JSON.parse(txt))
  }
}
