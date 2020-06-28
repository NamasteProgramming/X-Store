require('../index') // Imports our express server
const puppeteer = require('puppeteer-core')
const config = require('../utils/config')

/**
 * Base url, may change if you want to test live system
 */
const baseUrl = `http://localhost:${config.port}`
const sleepTime = 3000
const slowMoTime = 1

/**
 * A utility to emulate sleep in program
 * @param {*} ms - Sleep time in ms
 */
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const test = async (viewPort) => {
  /**
   * Set browser options and launch it
   */
  const browser = await puppeteer.launch({
    headless: false, // Opens a chrome in UI
    slowMo: slowMoTime, // Runs tests in slow motion
    executablePath: '/usr/bin/google-chrome', // Chrome location in your system,
    args: [`--window-size=${viewPort.width},${viewPort.height}`]
  })
  const page = await browser.newPage() // New Tab
  page.setViewport(viewPort)

  /**
   * Goto to homepage and wait until all network requests are complete
   */
  await page.goto(baseUrl, {
    waitUntil: 'networkidle2'
  })
  await sleep(sleepTime)

  /**
   * Go to register page
   * Register new user
   */
  const user = {
    name: 'John Doe',
    email: `john${new Date().getTime()}@example.com`,
    password: 'john@example.com'
  }

  await page.goto(`${baseUrl}/register`, {
    waitUntil: 'networkidle2'
  })

  Promise.all([
    await page.type('#name', user.name),
    await page.type('#email', user.email),
    await page.type('#password', user.password),
    await page.type('#repeat_password', user.password)
  ])
  await page.click('#submit')
  await sleep(sleepTime)

  /**
   * Try registration again with same user
   */
  await page.goto(`${baseUrl}/register`, {
    waitUntil: 'networkidle2'
  })
  Promise.all([
    await page.type('#name', user.name),
    await page.type('#email', user.email),
    await page.type('#password', user.password),
    await page.type('#repeat_password', user.password)
  ])
  await page.click('#submit')
  await sleep(sleepTime)

  /**
   * Go to login page
   */
  await page.goto(`${baseUrl}/login`, {
    waitUntil: 'networkidle2'
  })

  /**
   * Type in form fields
   */
  Promise.all([
    await page.type('#email', user.email),
    await page.type('#password', user.password)
  ])
  await page.click('#submit')
  await sleep(sleepTime)

  /**
   * Logout
   */
  await page.goto(`${baseUrl}/logout`, {
    waitUntil: 'networkidle2'
  })

  /**
   * Close browser
   */
  await browser.close()
}

/**
 * Screen width bootstrap breakpoints
 * 576- Extra small
 * 576+: Small
 * 768+: Medium
 * 992+: Large
 * 1200+: Extra Large
 */
const testInAllScreenSizes = async () => {
  const viewPorts = [{
    width: 500,
    height: 800
  }, {
    width: 576,
    height: 800
  }, {
    width: 768,
    height: 800
  }, {
    width: 992,
    height: 800
  }, {
    width: 1200,
    height: 800
  }]

  for (let i = 0; i < viewPorts.length; i++) {
    await test(viewPorts[i])
  }
  process.exit(0)
}

testInAllScreenSizes()
