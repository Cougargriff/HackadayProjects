module.exports = {
  "Project Details and Recommended": (browser) => {
    browser
      .url("http://localhost:3000")
      .waitForElementVisible("body", 30000)
      .assert.visible("#ListTitle")
      .click("body > div.ProjectsContainer > a:nth-child(1)")
      .pause(10000)
      .assert.visible(".recContainer")
      .end();
  },
};
