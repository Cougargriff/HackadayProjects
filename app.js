/* Express setup */
var express = require("express");
const fetch = require("node-fetch");
var app = express();
require('dotenv').config()

var Projects = require('./src/Projects.js')
var Users = require('./src/Users.js')
var getPage = Projects.getPageGen()
var getUser = Users.getUserGen()

const port = 3000;
app.use(express.static("public"));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.set('views', './views')
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  var page = await getPage(fetch, 1)
  
  console.log('Received Page')

  page = await Promise.all(page.map(async (prj) => {
    var ownerName = await getUser(fetch, prj.owner_id)
    return {
      ...prj,
      owner: ownerName
    }
  }))
  console.log('Finished Getting Meta Data')

  page = JSON.stringify(page)
  res.render("index", {
    title: "Hackaday Projects",
    prjs: page,
    currPage: 1
  });
});

app.get('/:page', async (req, res) => {
  const pg = req.params.page
  var page = await getPage(fetch, pg)
  console.log('Received Page')

  page = await Promise.all(page.map( async (prj) => {
    var ownerName = await getUser(fetch, prj.owner_id)
    return {
      ...prj,
      owner: ownerName
    }
  }))
  console.log('Finished Getting Meta Data')

  page = JSON.stringify(page)
  res.render("index", {
    title: "Hackaday Projects",
    prjs: page,
    currPage: parseInt(pg)
  });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});