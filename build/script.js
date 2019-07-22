document.addEventListener('DOMContentLoaded', () => {

  // Theme switch logic
  function switchTheme () {
    const themeAlternates = {
      'theme_color_project-inverse': 'theme_color_project-default',
      'theme_color_project-default': 'theme_color_project-inverse'
    }
    let themedBlocks = {}
    Object.keys(themeAlternates).forEach((className) => {
      themedBlocks[className] = Array.from(document.getElementsByClassName(className))
    })
    Object.keys(themeAlternates).forEach((className) => {
      themedBlocks[className].forEach((block) => {
        block.classList.remove(className)
        block.classList.add(themeAlternates[className])
      })
    })
  }

  const onoffswitch = document.getElementsByClassName('onoffswitch')[0]
  if (onoffswitch) {
    const onoffswitchCheckedClassName = 'onoffswitch_checked'
    let onoffswitchIsChecked = false
    if (Array.from(onoffswitch.classList).includes(onoffswitchCheckedClassName)) {
      onoffswitchIsChecked = true
    }
    onoffswitch.addEventListener('click', () => {
      onoffswitchIsChecked = !onoffswitchIsChecked
      if (onoffswitchIsChecked) { onoffswitch.classList.add(onoffswitchCheckedClassName) }
      else { onoffswitch.classList.remove(onoffswitchCheckedClassName) }
      switchTheme()
    })
  }

  // Accordion unfold classes toggle on click
  Array.from(document.getElementsByClassName('e-accordion')).forEach((block) => {
    block.addEventListener('click', (e) => {
      const block = e.path.find((el) => Array.from(el.classList).includes('e-accordion'))
      block.classList.toggle('is-unfolded')
    })
  })
})
