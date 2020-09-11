module.exports = {
  'Project List Loading Test ' : function(browser) {
    browser
      .url('https://localhost:3000/')
      .waitForElementVisible('body')
      .assert.visible('#ListTitle')
      .assert.containsText('.mainline-results', 'Nightwatch.js')
      .end();
  }
};