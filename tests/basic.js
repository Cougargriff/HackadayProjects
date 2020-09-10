module.exports = {
  "Project List Loading Test ": function (browser) {
    browser
      .url("http://localhost:3000/")
      .waitForElementVisible("body", 30000)
      .assert.visible("#ListTitle")
      .end();
  },
};
