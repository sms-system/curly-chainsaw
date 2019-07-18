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
    block: 'foo', mods: { bar: 'baz', fuzz: true }
  })).toBe(
    '<div class="foo foo_bar_baz foo_fuzz"></div>'
  )
})
