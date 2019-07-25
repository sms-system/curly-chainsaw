const path = require('path')
const fs = require('fs')
const { PNG } = require('pngjs')
const pixelmatch = require('pixelmatch')

module.exports = async function (pageName, screenshotName) {
  // !! Danger fast dirty code
  const targetScreenshotPath = path.join(__dirname, `./fixtures/screenshots/${screenshotName}.png`)
  const testPagePath = path.join(__dirname, `./fixtures/pages/${pageName}.html`)
  const testScreenshotPath = path.join(__dirname, `./.tmp/${screenshotName}.png`)
  const diffScreenshotPath = path.join(__dirname, `./diff/${screenshotName}.png`)

  const targetScreenshot = PNG.sync.read(fs.readFileSync(targetScreenshotPath))
  const { width, height } = targetScreenshot
  await page.setViewport({ width, height })

  await page.goto(`file://${testPagePath}`)
  await page.screenshot({path: testScreenshotPath})
  const testScreenshot = PNG.sync.read(fs.readFileSync(testScreenshotPath))
  const diff = new PNG({ width, height })
  const numDiffPixels = pixelmatch(
    targetScreenshot.data,
    testScreenshot.data,
    diff.data,
    width,
    height,
    { threshold: 0.15 }
  )
  fs.writeFileSync(diffScreenshotPath, PNG.sync.write(diff))
  return numDiffPixels
}
