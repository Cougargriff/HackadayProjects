/* Express setup */
var express = require("express");
const fetch = require("node-fetch");
var app = express();
require('dotenv').config()

var Projects = require('./src/Projects.js')
var getPage = Projects.getPageGen()


const port = 3000;
app.use(express.static("public"));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.set('views', './views')
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  var page = await getPage(fetch, 1)
  res.render("index", { title: "Hackaday Projects", prjs: page });
});

app.get('/:page', async (req, res) => {
  const pg = req.params.page
  var page = []
  getPage(fetch, pg).then(projs => res.render("index", { title: "Hackaday Projects", prjs: projs }))
  res.render("index", { title: "Hackaday Projects", prjs: page });
})



app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
