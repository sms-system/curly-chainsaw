const parseBEMJSONContent = (BEMJSONContent, ctxBlock) => {
  if (typeof BEMJSONContent === 'string') return BEMJSONContent
  if (typeof BEMJSONContent !== 'object') return ''
  if (Array.isArray(BEMJSONContent)) return BEMJSONContent.map(
    (node) => parseBEMJSONContent(node, ctxBlock)
  ).join('')

  let { block, content } = BEMJSONContent
  if (!block) { block = ctxBlock }

  const innerTpl = parseBEMJSONContent(content, block)
  const classes = getClassesFromBEMJSON({ ...BEMJSONContent, block })
  const classesChunk = classes.length? ` class="${classes.join(' ')}"` : ''
  return `<div${classesChunk}>${innerTpl}</div>`
}

function getClassesFromBEMJSON ({ mix = [], ...props }) {
  const classes = [props, ...mix].reduce((classes, { block, elem, mods, elemMods }) => {
    let baseClass = block
    if (!block) return
    if (elem) {
      mods = {}
      baseClass += '__' + elem
    } else {
      elemMods = {}
    }
    classes.push(baseClass)

    const postfixes = { ...mods, ...elemMods }
    for(mod in postfixes) {
      const value = postfixes[mod]
      if (!value) continue
      classes.push(`${baseClass}--${mod}` + (typeof value === 'string'? '--' + value : ''))
    }
    return classes
  }, [])
  return classes
}

export default parseBEMJSONContent