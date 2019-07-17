import templater from './build/template-engine.js'

const tpl = templater(jsyaml.load(`
- block: payment
  mix:
  - block: form
    mods:
      border: all
  content:
  - elem: header
    mix:
    - block: form
      elem: item
      elemMods:
        space-v: l
        space-h: xl
        border: bottom
    content:
    - block: text
      mods:
        view: primary
        size: xxl
      content:
      - elem: word
        elemMods:
          width: l
  - elem: content
    mix:
    - block: form
      elem: item
      elemMods:
        space-v: xxxl
        space-h: xl
        border: bottom
    content:
    - block: form
      elem: item
      elemMods:
        indent-b: xl
        distribute: between
        vertical-align: center
      content: &payment-form-row
      - elem: label
        elemMods:
          width: default
        content:
        - block: text
          mods:
            view: primary
            size: l
          content:
            elem: word
            elemMods:
              width: l
      - elem: control
        content:
        - block: input
          mods:
            size: l
    - block: form
      elem: item
      elemMods:
        distribute: between
        vertical-align: center
      content: *payment-form-row
  - elem: footer
    mix:
    - block: form
      elem: item
      elemMods:
        distribute: between
        border: bottom
        vertical-align: center
        space-v: l
        space-h: xl
    content:
    - block: text
      mods:
        view: primary
        size: l
      content:
        elem: word
        elemMods:
          width: l
    - block: button
      mods:
        size: l
- block: warning
  mix:
  - block: informer
    mods:
      view: default
      border: all
  - block: theme
    mods:
      color: project-warning
  content:
  - elem: content
    mix:
    - block: informer
      elem: content
      elemMods:
        distribute: center
        space-a: xxl
    content:
    - block: placeholder
      mods:
        view: primary
        size: m
    - block: text
      mods:
        view: primary
        size: xl
      content:
      - elem: word
        elemMods:
          width: s
      - elem: word
        elemMods:
          width: l
      - elem: word
        elemMods:
          width: m
      - elem: word
        elemMods:
          width: m
      - elem: word
        elemMods:
          width: s
      - elem: word
        elemMods:
          width: m
      - elem: word
        elemMods:
          width: l
      - elem: word
        elemMods:
          width: s
      - elem: word
        elemMods:
          width: m
  - elem: button-wrapper
    mix:
    - block: informer
      elem: action
      elemMods:
        distribute: center
        space-a: xl
    content:
    - block: button
      mods:
        size: l
`))

document.getElementById('app').innerHTML = tpl