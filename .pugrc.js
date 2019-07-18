const tplToHtml = require('./lib/tpl-to-html')

module.exports = {
  filters: {
    tpl (txt, opts) {
      const classesToMix = Object.keys(opts).filter(a => a !== 'filename')
      return tplToHtml(txt, classesToMix.join(' '))
    }
  }
}
