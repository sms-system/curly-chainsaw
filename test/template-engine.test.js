import templateEngine from '../build/template-engine'

test('Empty HTML on empty JSON', () => {
  expect(templateEngine({})).toBe('')
})

test('Null content', () => {
  expect(templateEngine({ content: null })).toBe('')
})

test('Content without root block', () => {
  expect(templateEngine({ content: { block: 'foo' } })).toBe('')
})

test('Simple block', () => {
  expect(templateEngine({
    block: 'foo',
  })).toBe(
    '<div class="foo"></div>'
  )
})

test('Simple block, empty content object', () => {
  expect(templateEngine({
    block: 'foo', content: {}
  })).toBe(
    '<div class="foo"></div>'
  )
})

test('Simple block, useless content object', () => {
  expect(templateEngine({
    block: 'foo', content: { elemMods: [], mix: [ { block: 'bar' } ] }
  })).toBe(
    '<div class="foo"></div>'
  )
})

test('Simple block with elem', () => {
  expect(templateEngine({
    block: 'foo', elem: 'bar'
  })).toBe(
    '<div class="foo__bar"></div>'
  )
})

test('Simple block with mods', () => {
  expect(templateEngine({
    block: 'foo', mods: { bar: 'baz', fuzz: true, fizz: false }
  })).toBe(
    '<div class="foo foo_bar_baz foo_fuzz"></div>'
  )
})

test('Block mixes', () => {
  expect(templateEngine({
    block: 'my-block',
    mix: [
        {block: 'other-block', mods: {'mod-name': 'mod-value'}},
        {block: 'other-block', elem: 'second-elem', elemMods: {'elem-mod-name': 'elem-mod-value'}}
    ]
  })).toBe(
    '<div class="my-block other-block other-block_mod-name_mod-value other-block__second-elem other-block__second-elem_elem-mod-name_elem-mod-value"></div>'
  )
})

test('Complex example', () => {
  expect(templateEngine({
    "block": "form",
    "content": [
      {
        "block": "form",
        "elem": "label",
        "content": {
          "block": "text",
          "mods": { "size": "xl" }
        }
      },
      {
        "block": "input",
        "mods": { "size": "xxl" }
      }
    ]
})).toBe(
    '<div class="form"><div class="form__label"><div class="text text_size_xl"></div></div><div class="input input_size_xxl"></div></div>'
  )
})

test('Int value in mods', () => {
  expect(templateEngine({
    block: 'foo', mods: { bar: 1 }
  })).toBe(
    '<div class="foo foo_bar_1"></div>'
  )
})
