// WARNING!! Not for production use !!
// Has not XSS prevention, not optimized

const config = {
  "BEM_SEPARATORS": {
    "ELEM": "__",
    "MOD": "_"
  }
}

const ELEM_SEPARATOR = config.BEM_SEPARATORS.ELEM
const MOD_SEPARATOR = config.BEM_SEPARATORS.MOD

const parseBEMJSONContent = (BEMJSONContent, ctxBlock) => {
  if (typeof BEMJSONContent === 'string') return BEMJSONContent
  if (typeof BEMJSONContent !== 'object') return ''
  if (Array.isArray(BEMJSONContent)) return BEMJSONContent.map(
    (node) => parseBEMJSONContent(node, ctxBlock)
  ).join('')
  if (!BEMJSONContent || !BEMJSONContent.block && !ctxBlock) return ''
  let { block, elem, mods, elemMods, content } = BEMJSONContent
  if (elem) { mods = {} } else { elemMods = {} }
  if (!block && !elem && (!mods || Object.keys(mods).length === 0)) return ''
  if (!block) { block = ctxBlock }

  const innerTpl = parseBEMJSONContent(content, block)
  const classes = getClassesFromBEMJSON({ ...BEMJSONContent, mods, elemMods, block })
  const classesChunk = classes.length? ` class="${classes.join(' ')}"` : ''
  return `<div${classesChunk}>${innerTpl}</div>`
}

function getClassesFromBEMJSON ({ mix = [], ...props }) {
  const classes = [props, ...mix].reduce((classes, { block, elem, mods, elemMods }) => {
    let baseClass = block
    if (!block) return
    if (elem) {
      baseClass += ELEM_SEPARATOR + elem
    }
    classes.push(baseClass)

    const postfixes = { ...mods, ...elemMods }
    for(let mod in postfixes) {
      const value = postfixes[mod]
      if (!value) continue
      classes.push(baseClass + MOD_SEPARATOR + mod + (typeof value === 'string'? MOD_SEPARATOR + value : ''))
    }
    return classes
  }, [])
  return classes
}

export default function (obj) {
  return parseBEMJSONContent(obj)
}
