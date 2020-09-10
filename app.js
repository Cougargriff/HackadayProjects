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

app.get("/", async (req, res) => {
  const pg = req.query.page === undefined ? 1 : parseInt(req.query.page)  
  var page = await getPage(fetch, pg) 

  console.log("Received Page");
  page = await Promise.all(
    page.map(async (prj) => {
      var author = await getUser(fetch, prj.owner_id);
      return {
        ...prj,
        owner: author,
      };
    })
  );
  console.log("Finished Getting Meta Data");
  page = JSON.stringify(page);

  res.render("index", {
    title: "Hackaday Projects",
    prjs: page,
    currPage: pg
  });
});

app.get("/projects/:id", async (req, res) => {
  const id = req.params.id
  const prj = await getProject(fetch, id)
  const tagMap = {}
  await Promise.all(prj.tags.map( async tag => {
    tagMap[tag] = await findTag(fetch, tag)
  }))

  res.render("project", {
    prj: JSON.stringify(prj),
    tags: JSON.stringify(tagMap)
  });
})


app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
