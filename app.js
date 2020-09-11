/* Express setup */
var express = require("express");
const fetch = require("node-fetch");
var app = express();
require("dotenv").config();

var Projects = require("./src/Projects.js");
var Users = require("./src/Users.js");
var Tags = require("./src/Tags.js");
const { json } = require("express");
var getProject = Projects.getProject;
var getPage = Projects.getPageGen();
var getUser = Users.getUserGen();
var findTag = Tags.findTagGen();

const port = 3000;
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.set("views", "./views");
app.set("view engine", "ejs");

const consoleLog = (text) => {
  var date = new Date();
  console.log(
    `[SERVER @ ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] --> ${text}`
  );
};

app.get("/", async (req, res) => {
  const pg = req.query.page === undefined ? 1 : parseInt(req.query.page);

  consoleLog("Serving Projects List");
  var page = await getPage(fetch, pg);

  consoleLog("Received List");
  page = await Promise.all(
    page.map(async (prj) => {
      var author = await getUser(fetch, prj.owner_id);
      return {
        ...prj,
        owner: author,
      };
    })
  );
  consoleLog("Sending List + Meta");
  page = JSON.stringify(page);

  res.render("index", {
    title: "Hackaday Projects",
    prjs: page,
    currPage: pg,
  });
});

app.get("/projects-api/:pg", async (req, res) => {
  const pg = parseInt(req.params.pg);
  consoleLog(`Client Pagination Request ${pg}`);

  var page = await getPage(fetch, pg);

  consoleLog("Retrieved projects for client", page);
  page = await Promise.all(
    page.map(async (prj) => {
      var author = await getUser(fetch, prj.owner_id);
      return {
        ...prj,
        owner: author,
      };
    })
  );
  consoleLog("Sending projects to client");

  res.render("list", {
    prjs: JSON.stringify(page),
    currPage: pg,
  });
});

app.get("/projects/:id", async (req, res) => {
  const id = req.params.id;
  consoleLog("Serving Project Details");
  const prj = await getProject(fetch, id);
  const tagMap = {};

  consoleLog("Finding recommended projects");
  await Promise.all(
    prj.tags.map(async (tag) => {
      tagMap[tag] = await findTag(fetch, tag);
    })
  );

  consoleLog("Sending Project Details");
  res.render("project", {
    prj: JSON.stringify(prj),
    tags: JSON.stringify(tagMap),
  });
});

app.listen(port, () => {
  consoleLog(`Listening on port ${port}...`);
});
