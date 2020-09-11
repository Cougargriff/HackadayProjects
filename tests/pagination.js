module.exports = {
  "Pagination Test": (browser) => {
    browser
      .url("http://localhost:3000")
      .waitForElementVisible("body", 30000)
      .assert.visible("#ListTitle")
      .assert.visible("body > div.ProjectsContainer > a:nth-child(1)")
      .assert.containsText("#currPage", "1")
      .click("#nextB")
      .pause(25000)
      .assert.containsText("#currPage", "2")
      .click("#nextB")
      .pause(25000)
      .assert.containsText("#currPage", "3")
      .click("#nextB")
      .pause(25000)
      .assert.containsText("#currPage", "4")
      .click("#prevB")
      .pause(1000)
      .assert.containsText("#currPage", "3")
      .click("#prevB")
      .pause(1000)
      .assert.containsText("#currPage", "2")
      .click("#prevB")
      .pause(1000)
      .assert.containsText("#currPage", "1")
      .end();
  },
};
