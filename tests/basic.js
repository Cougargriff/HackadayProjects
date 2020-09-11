module.exports = {
  "Project List SSR": (browser) => {
    browser
      .url("http://localhost:3000")
      .waitForElementVisible("body", 30000)
      .assert.visible("#ListTitle")
      .assert.visible("body > div.ProjectsContainer > a:nth-child(1)");
  },
  "Project List Page 2 SSR": (browser) => {
    browser
      .url("http://localhost:3000?page=4")
      .waitForElementVisible("body", 30000)
      .assert.visible("#ListTitle")
      .assert.visible("body > div.ProjectsContainer > a:nth-child(1)")
  },
"Project List Page 3 SSR": (browser) => {
    browser
      .url("http://localhost:3000?page=1")
      .waitForElementVisible("body", 1000)
      .assert.visible("#ListTitle")
      .assert.visible("body > div.ProjectsContainer > a:nth-child(1)")
      .end();
  },
};
