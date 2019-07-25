const templateEngine = require('../build/template-engine')
const fs = require('fs')
const path = require('path')

function wrapPage (tpl) {
  return `<!DOCTYPE html><html><head><link rel="stylesheet" href="../../../build/style.css"><style>body{margin:0}</style></head><body><script src="../../../build/script.js"></script>${tpl}</body></html>`
}

describe('Template engine tests', () => {
  test('Empty HTML on empty JSON', () => {
    expect(templateEngine({})).toEqual('')
  })

  test('Null content', () => {
    expect(templateEngine({ content: null })).toEqual('')
  })

  test('Content without root block', () => {
    expect(templateEngine({ content: { block: 'foo' } })).toEqual('')
  })

  test('Simple block', () => {
    expect(templateEngine({
      block: 'foo',
    })).toEqual(
      '<div class="foo"></div>'
    )
  })

  test('Simple block, empty content object', () => {
    expect(templateEngine({
      block: 'foo', content: {}
    })).toEqual(
      '<div class="foo"></div>'
    )
  })

  test('Simple block, useless content object', () => {
    expect(templateEngine({
      block: 'foo', content: { elemMods: [], mix: [ { block: 'bar' } ] }
    })).toEqual(
      '<div class="foo"></div>'
    )
  })

  test('Simple block with elem', () => {
    expect(templateEngine({
      block: 'foo', elem: 'bar'
    })).toEqual(
      '<div class="foo__bar"></div>'
    )
  })

  test('Simple block with mods', () => {
    expect(templateEngine({
      block: 'foo', mods: { bar: 'baz', fuzz: true, fizz: false }
    })).toEqual(
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
    })).toEqual(
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
  })).toEqual(
      '<div class="form"><div class="form__label"><div class="text text_size_xl"></div></div><div class="input input_size_xxl"></div></div>'
    )
  })

  test('Int value in mods', () => {
    expect(templateEngine({
      block: 'foo', mods: { bar: 1 }
    })).toEqual(
      '<div class="foo foo_bar_1"></div>'
    )
  })

  describe('Pages', () => {
    test('Index', () => {
      const json = require('./fixtures/bemjsons/index_desktop.json')
      const page = fs.readFileSync(path.resolve(__dirname, './fixtures/pages/index.html'), 'utf8')
      expect(wrapPage(templateEngine(json))).toEqual(page)
    })
    test('Collect', () => {
      const json = require('./fixtures/bemjsons/collect_desktop.json')
      const page = fs.readFileSync(path.resolve(__dirname, './fixtures/pages/collect.html'), 'utf8')
      expect(wrapPage(templateEngine(json))).toEqual(page)
    })
    test('Product', () => {
      const json = require('./fixtures/bemjsons/product_desktop.json')
      const page = fs.readFileSync(path.resolve(__dirname, './fixtures/pages/product.html'), 'utf8')
      expect(wrapPage(templateEngine(json))).toEqual(page)
    })
    test('Content', () => {
      const json = require('./fixtures/bemjsons/content_desktop.json')
      const page = fs.readFileSync(path.resolve(__dirname, './fixtures/pages/content.html'), 'utf8')
      expect(wrapPage(templateEngine(json))).toEqual(page)
    })
  })
})
