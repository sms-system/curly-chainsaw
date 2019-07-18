const indentStep = 2
const closingTag = '</div>'

function getTagString(item, mixClasses) {
  const [blockName, classes, wordsData] = item.trim().split('(').map((a, i) => i? a.replace(/\)?\(?\s?$/g, '') : a.trim())
  let str = `<div class="${blockName} ${classes || ''} ${mixClasses}">`
  if (wordsData) {
    str += wordsData.split('+').map(size => `<div class="${blockName}__word ${blockName}__word_width_${size}"></div>`)
  }
  return str
}

module.exports = (tpl, mixClasses='') => {
  let prevIndentCount = -1
  return [...tpl.trim().split('\n'), ''].reduce((html, item) => {
    const indentCount = item.match(/^\s*/)[0].length
    const prefix = closingTag.repeat(indentCount > prevIndentCount ? 0 : (prevIndentCount-indentCount)/indentStep+1)
    const chunk = item && getTagString(item, mixClasses)
    prevIndentCount = indentCount
    return html + prefix + chunk
  }, '')
}
