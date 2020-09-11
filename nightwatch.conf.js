module.exports = {
  src_folders: ["tests"],

  test_settings: {
    default: {
      launch_url: 'https://nightwatchjs.org'
    },

    selenium: {
      // Selenium Server is running locally and is managed by Nightwatch
      selenium: {
        start_process: true,
        port: 4444,
        server_path: require('selenium-server').path,
        cli_args: {
          'webdriver.gecko.driver': require('geckodriver').path,
          'webdriver.chrome.driver': require('chromedriver').path || 'node_modules/.bin/chromedriver',
          'webdriver.ie.driver': process.platform === 'win32' ? require('iedriver').path : ''
        }
      },
      webdriver: {
        start_process: false
      }
    },

    'selenium.chrome': {
      extends: 'selenium',
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions : {
          w3c: false
        }
      }
    },

    'selenium.firefox': {
      extends: 'selenium',
      desiredCapabilities: {
        browserName: 'firefox'
      }
    },

    'selenium.ie': {
      extends: 'selenium',
      desiredCapabilities: {
        browserName: 'internet explorer'
      }
    }
  }
}