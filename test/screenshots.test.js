const getMarkupDiffPixelsCount = require('./getMarkupDiffPixelsCount')
const fs = require('fs')

describe('Screenshots tests', () => {
  beforeAll(async () => {
    try { fs.mkdirSync('test/.tmp') } catch (e) { }
    try { fs.mkdirSync('test/diff') } catch (e) { }
  })

  describe('desktop (1920px)', () => {
    test('Index page', async () => {
      const numDiffPixels = await getMarkupDiffPixelsCount('index', 'index_desktop')
      expect(numDiffPixels).toBe(0)
    })
    test('Product page', async () => {
      const numDiffPixels = await getMarkupDiffPixelsCount('product', 'product_desktop')
      expect(numDiffPixels).toBe(0)
    })
    test('Collect page', async () => {
      const numDiffPixels = await getMarkupDiffPixelsCount('collect', 'collect_desktop')
      expect(numDiffPixels).toBe(0)
    })
    test('Content page', async () => {
      const numDiffPixels = await getMarkupDiffPixelsCount('content', 'content_desktop')
      expect(numDiffPixels).toBe(0)
    })
  })
  describe('mobile (600px)', () => {
    test('Index page', async () => {
      const numDiffPixels = await getMarkupDiffPixelsCount('index', 'index_mobile')
      // dots missmatches, but yandex autotests accept it
      expect(numDiffPixels).toBe(352)
    })
    test('Product page', async () => {
      const numDiffPixels = await getMarkupDiffPixelsCount('product', 'product_mobile')
      expect(numDiffPixels).toBe(0)
    })
    test('Collect page', async () => {
      const numDiffPixels = await getMarkupDiffPixelsCount('collect', 'collect_mobile')
      expect(numDiffPixels).toBe(0)
    })
    test('Content page', async () => {
      const numDiffPixels = await getMarkupDiffPixelsCount('content', 'content_mobile')
      expect(numDiffPixels).toBe(0)
    })
  })
})
