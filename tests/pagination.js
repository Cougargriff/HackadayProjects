module.exports = {
  "Pagination Test": (browser) => {
    browser
      .url("http://localhost:3000")
      .waitForElementVisible("body", 30000)
      .assert.visible("#ListTitle")
      .assert.visible("body > div.ProjectsContainer > a:nth-child(1)");
  },
};
